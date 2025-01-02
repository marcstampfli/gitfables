/**
 * @module middleware/api-auth
 * @description Middleware for API key validation and authorization
 */

import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createHash } from 'crypto'
import type { ApiScope } from '@/types/api/api-keys'
import { redisRateLimiter } from '@/lib/redis/client'
import { logError } from '@/lib/utils/logger'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

/**
 * Hash an API key using SHA-256
 */
function hashApiKey(key: string): string {
  return createHash('sha256').update(key).digest('hex')
}

/**
 * Track API key usage
 */
async function trackUsage(
  supabase: SupabaseClient<Database>,
  apiKeyId: string,
  req: NextRequest,
  startTime: number,
  statusCode: number
) {
  try {
    await supabase.from('api_key_usage').insert({
      api_key_id: apiKeyId,
      endpoint: req.nextUrl.pathname,
      method: req.method,
      status_code: statusCode,
      response_time: Date.now() - startTime,
      ip_address: req.headers.get('x-forwarded-for') || 'unknown',
      user_agent: req.headers.get('user-agent') || 'unknown'
    })
  } catch (error) {
    logError('Error tracking API usage', {
      metadata: {
        error,
        apiKeyId,
        endpoint: req.nextUrl.pathname,
        method: req.method
      }
    })
  }
}

/**
 * Validate API key and check required scopes
 */
export async function validateApiKey(
  req: NextRequest,
  requiredScopes: ApiScope[] = []
) {
  const startTime = Date.now()

  // Get API key from header
  const apiKey = req.headers.get('x-api-key')
  if (!apiKey) {
    return new NextResponse(
      JSON.stringify({
        error: 'API key is required',
      }),
      { 
        status: 401,
        headers: {
          'content-type': 'application/json'
        }
      }
    )
  }

  // Create Supabase client
  const supabase = await createServerClient()

  // Get API key from database
  const { data: keyData, error } = await supabase
    .from('api_keys')
    .select('*')
    .eq('key_hash', hashApiKey(apiKey))
    .single()

  if (error || !keyData) {
    return new NextResponse(
      JSON.stringify({
        error: 'Invalid API key',
      }),
      { 
        status: 401,
        headers: {
          'content-type': 'application/json'
        }
      }
    )
  }

  // Check if key is expired
  if (keyData.expires_at && new Date(keyData.expires_at) < new Date()) {
    await trackUsage(supabase, keyData.id, req, startTime, 401)
    return new NextResponse(
      JSON.stringify({
        error: 'API key has expired',
      }),
      { 
        status: 401,
        headers: {
          'content-type': 'application/json'
        }
      }
    )
  }

  // Check required scopes
  const hasRequiredScopes = requiredScopes.every((scope) =>
    keyData.scopes.includes(scope)
  )
  if (!hasRequiredScopes) {
    await trackUsage(supabase, keyData.id, req, startTime, 403)
    return new NextResponse(
      JSON.stringify({
        error: 'Insufficient permissions',
        required_scopes: requiredScopes,
        provided_scopes: keyData.scopes
      }),
      { 
        status: 403,
        headers: {
          'content-type': 'application/json'
        }
      }
    )
  }

  // Check rate limit
  try {
    const { success, limit, reset, remaining } = await redisRateLimiter.limit(keyData.id)
    
    if (!success) {
      await trackUsage(supabase, keyData.id, req, startTime, 429)
      return new NextResponse(
        JSON.stringify({
          error: 'Rate limit exceeded',
          limit,
          remaining: 0,
          reset,
        }),
        { 
          status: 429,
          headers: {
            'content-type': 'application/json',
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': reset.toString(),
            'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString()
          }
        }
      )
    }

    // Update last_used timestamp
    await supabase
      .from('api_keys')
      .update({ last_used: new Date().toISOString() })
      .eq('id', keyData.id)

    // Add user_id and rate limit info to response headers
    const response = NextResponse.next()
    response.headers.set('X-User-ID', keyData.user_id)
    response.headers.set('X-RateLimit-Limit', limit.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    response.headers.set('X-RateLimit-Reset', reset.toString())

    // Track successful request
    await trackUsage(supabase, keyData.id, req, startTime, 200)

    return response
  } catch (error) {
    logError('Rate limit error', {
      metadata: {
        error,
        apiKeyId: keyData.id,
        endpoint: req.nextUrl.pathname
      }
    })
    return new NextResponse(
      JSON.stringify({
        error: 'Internal server error',
      }),
      { 
        status: 500,
        headers: {
          'content-type': 'application/json'
        }
      }
    )
  }
}

/**
 * Middleware configuration
 */
export const config = {
  matcher: '/api/:path*',
} 