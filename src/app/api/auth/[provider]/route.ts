/**
 * @module app/api/auth/[provider]/route
 * @description OAuth provider route handler for Supabase Auth
 */

import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { logError } from '@/lib/utils/logger'

interface RouteContext {
  params: {
    provider: string
  }
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const supabase = await createClient()
    const appUrl = process.env.NEXT_PUBLIC_APP_URL

    if (!appUrl) {
      throw new Error('NEXT_PUBLIC_APP_URL environment variable is not set')
    }

    // Validate provider
    if (params.provider !== 'github') {
      throw new Error(`Unsupported provider: ${params.provider}`)
    }

    // Initiate OAuth flow with Supabase
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${appUrl}/auth/callback`,
        scopes: 'repo read:user user:email',
        queryParams: {
          // Add additional parameters for GitHub OAuth
          allow_signup: 'true',
        },
      },
    })

    if (error) throw error
    if (!data.url) throw new Error('No OAuth URL returned')

    // Log successful OAuth initiation
    console.log('OAuth flow initiated', {
      provider: params.provider,
      redirectUrl: `${appUrl}/auth/callback`,
    })

    return NextResponse.redirect(data.url)
  } catch (error) {
    // Log detailed error information
    logError('Failed to initiate OAuth flow', { 
      metadata: { 
        error,
        provider: params.provider,
        url: request.url,
        appUrl: process.env.NEXT_PUBLIC_APP_URL,
        nodeEnv: process.env.NODE_ENV,
      }
    })

    const errorMessage = error instanceof Error ? error.message : 'Unexpected error occurred'
    const errorUrl = new URL('/auth/error', process.env.NEXT_PUBLIC_APP_URL)
    errorUrl.searchParams.set('error', errorMessage)
    errorUrl.searchParams.set('provider', params.provider)

    return NextResponse.redirect(errorUrl.toString())
  }
} 