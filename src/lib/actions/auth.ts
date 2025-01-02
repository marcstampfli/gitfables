/**
 * @module lib/actions/auth
 * @description Server actions for authentication
 */

'use server'

import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { logError } from '@/lib/utils/logger'
import { type User } from '@supabase/supabase-js'

export async function signIn() {
  const supabase = await createServerClient()

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
  const supabase = await createServerClient()

  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      logError('Error signing out:', { context: 'auth:signOut', metadata: { error } })
      return { error }
    }

    return { success: true }
  } catch (error) {
    logError('Error in auth function:', { context: 'auth:signOut', metadata: { error } })
    return { error }
  }
}

/**
 * Get current session
 */
export async function getSession() {
  const supabase = await createServerClient()

  try {
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      logError('Error getting session:', { context: 'auth:getSession', metadata: { error } })
      return null
    }

    return session
  } catch (error) {
    logError('Error in auth function:', { context: 'auth:getSession', metadata: { error } })
    return null
  }
}

/**
 * Get current user
 * @description Returns null if no user is found
 * @returns The authenticated user or null
 */
export async function getUser(): Promise<User | null> {
  const supabase = await createServerClient()

  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (err) {
    console.error('Error getting user:', err)
    return null
  }
} 