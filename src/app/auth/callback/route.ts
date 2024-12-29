/**
 * @module app/auth/callback/route
 * @description OAuth callback route handler for Supabase Auth
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { logError } from '@/lib/utils/logger'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const error_description = requestUrl.searchParams.get('error_description')

  // Handle OAuth errors
  if (error || !code) {
    logError('OAuth authentication failed', { 
      metadata: { 
        error,
        error_description,
        url: request.url 
      }
    })
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/login?error=${encodeURIComponent(error_description || error || 'Unknown error')}`
    )
  }

  try {
    const supabase = await createClient()

    // Exchange code for session
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) throw exchangeError

    // Redirect to the dashboard on success
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`)
  } catch (error) {
    logError('Failed to exchange code for session', { 
      metadata: { 
        error,
        code,
        url: request.url 
      }
    })
    const errorMessage = error instanceof Error ? error.message : 'Failed to exchange code for session'
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/login?error=${encodeURIComponent(errorMessage)}`
    )
  }
} 