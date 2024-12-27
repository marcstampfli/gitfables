/**
 * @module lib/auth/actions
 * @description Server actions for authentication
 */

'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Sign in with OAuth provider
 * 
 * @param {string} provider - OAuth provider name
 * @returns {Promise<void>}
 */
export async function signInWithOAuth(provider: 'github') {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
    }
  })

  if (error) {
    throw error
  }

  if (data.url) {
    redirect(data.url)
  }
}

/**
 * Sign out user
 * 
 * @returns {Promise<void>}
 */
export async function signOut() {
  const _cookieStore = cookies()
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }

  redirect('/login')
}

/**
 * Get current session
 * 
 * @returns {Promise<Session | null>}
 */
export async function getSession() {
  const _cookieStore = cookies()
  const supabase = createClient()

  const { data: { session }, error } = await supabase.auth.getSession()

  if (error) {
    throw error
  }

  return session
}

/**
 * Get current user
 * 
 * @returns {Promise<User | null>}
 */
export async function getUser() {
  const _cookieStore = cookies()
  const supabase = createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    throw error
  }

  return user
} 