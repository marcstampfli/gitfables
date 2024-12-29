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

    // Initiate OAuth flow with Supabase
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: params.provider as 'github',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        scopes: 'repo read:user user:email',
      },
    })

    if (error) throw error
    if (!data.url) throw new Error('No OAuth URL returned')

    return NextResponse.redirect(data.url)
  } catch (error) {
    logError('Failed to initiate OAuth flow', { 
      metadata: { 
        error,
        provider: params.provider,
        url: request.url 
      }
    })
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error occurred'
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/login?error=${encodeURIComponent(errorMessage)}`
    )
  }
} 