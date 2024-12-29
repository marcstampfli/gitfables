/**
 * @module app/api/auth/[provider]/route
 * @description OAuth provider route handler for Supabase Auth
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { logError } from '@/lib/utils/logger'

export async function GET(request: Request, context: { params: { provider: string } }) {
  try {
    const supabase = await createClient()

    // Initiate OAuth flow with Supabase
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: context.params.provider as 'github',
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
        provider: context.params.provider,
        url: request.url 
      }
    })
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error occurred'
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/login?error=${encodeURIComponent(errorMessage)}`
    )
  }
} 