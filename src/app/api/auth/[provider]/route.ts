/**
 * @module app/api/auth/[provider]/route
 * @description API route for OAuth provider authentication
 */

import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { logError } from '@/lib/utils/logger'

export async function GET(request: Request) {
  try {
    const supabase = await createServerClient()

    // Get provider from URL
    const url = new URL(request.url)
    const provider = url.pathname.split('/').pop()

    if (!provider) {
      return NextResponse.json(
        { error: 'Provider not specified' },
        { status: 400 }
      )
    }

    // Sign in with provider
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as 'github',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    logError('Failed to authenticate', { context: 'api:auth:provider', error })
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
} 