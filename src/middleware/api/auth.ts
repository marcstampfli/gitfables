/**
 * @module middleware/api-auth
 * @description Middleware for API key validation and authorization
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createHash } from 'crypto'
import type { ApiScope } from '@/types/api/api-keys'
import { rateLimiter } from '@/lib/utils/rate-limit'
import { logError } from '@/lib/utils/logger'

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
  supabase: ReturnType<typeof createClient>,
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
      response_time: Date.now() - startTime
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
      { status: 401 }
    )
  }

  // Create Supabase client
  const supabase = createClient()

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
      { status: 401 }
    )
  }

  // Check if key is expired
  if (new Date(keyData.expires_at) < new Date()) {
    await trackUsage(supabase, keyData.id, req, startTime, 401)
    return new NextResponse(
      JSON.stringify({
        error: 'API key has expired',
      }),
      { status: 401 }
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
      }),
      { status: 403 }
    )
  }

  // Check rate limit
  try {
    await rateLimiter.checkRateLimit('supabase')
  } catch (error) {
    await trackUsage(supabase, keyData.id, req, startTime, 429)
    const status = rateLimiter.getRateLimitStatus('supabase')
    return new NextResponse(
      JSON.stringify({
        error: 'Rate limit exceeded',
        limit: status.total,
        remaining: status.remaining,
        reset: status.resetsIn,
      }),
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': status.total.toString(),
          'X-RateLimit-Remaining': status.remaining.toString(),
          'X-RateLimit-Reset': status.resetsIn.toString(),
        },
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
  const status = rateLimiter.getRateLimitStatus('supabase')
  response.headers.set('X-RateLimit-Limit', status.total.toString())
  response.headers.set('X-RateLimit-Remaining', status.remaining.toString())
  response.headers.set('X-RateLimit-Reset', status.resetsIn.toString())

  // Track successful request
  await trackUsage(supabase, keyData.id, req, startTime, 200)

  return response
}

/**
 * Middleware configuration
 */
export const config = {
  matcher: '/api/:path*',
} 