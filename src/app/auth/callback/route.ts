/**
 * @module app/auth/callback/route
 * @description OAuth callback route handler for Supabase Auth
 */

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/types/database'

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    // If no code, redirect to login
    if (!code) {
      console.error('No code in callback')
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Exchange code for session
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Error exchanging code for session:', error)
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('error', error.message)
      return NextResponse.redirect(loginUrl)
    }

    // Always redirect to dashboard after successful login
    return NextResponse.redirect(new URL('/dashboard', request.url))

  } catch (error) {
    console.error('Callback error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
} 