/**
 * @module lib/auth/actions
 * @description Server actions for authentication
 */

'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logError } from '@/lib/utils/logger'

export async function signIn() {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    if (error) {
      logError('Error signing in:', { context: 'auth:signIn', metadata: { error } })
      return { error }
    }

    return { data }
  } catch (error) {
    logError('Error in auth function:', { context: 'auth:signIn', metadata: { error } })
    return { error }
  }
}

export async function signOut() {
  const supabase = await createClient()

  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      logError('Error signing out:', { context: 'auth:signOut', metadata: { error } })
      return { error }
    }

    redirect('/login')
  } catch (error) {
    logError('Error in auth function:', { context: 'auth:signOut', metadata: { error } })
    return { error }
  }
}

/**
 * Get current session
 * 
 * @returns {Promise<Session | null>}
 */
export async function getSession() {
  const supabase = await createClient()

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
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    throw error
  }

  return user
} 