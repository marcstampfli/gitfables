/**
 * @module lib/actions/auth
 * @description Server actions for authentication
 */

'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logError } from '@/lib/utils/logger'
import { type User } from '@supabase/supabase-js'

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
 */
export async function getSession() {
  const supabase = await createClient()

  try {
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      logError('Error getting session:', { context: 'auth:getSession', metadata: { error } })
      redirect('/login')
    }

    if (!session) {
      redirect('/login')
    }

    return session
  } catch (error) {
    logError('Error in auth function:', { context: 'auth:getSession', metadata: { error } })
    redirect('/login')
  }
}

/**
 * Get current user
 * @description Redirects to login if no user is found
 * @returns The authenticated user
 */
export async function getUser(): Promise<User> {
  const supabase = await createClient()

  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      logError('Error getting user:', { context: 'auth:getUser', metadata: { error } })
      redirect('/login')
    }

    if (!user) {
      redirect('/login')
    }

    // After redirect, TypeScript knows this can't be null
    return user as NonNullable<typeof user>
  } catch (error) {
    logError('Error in auth function:', { context: 'auth:getUser', metadata: { error } })
    redirect('/login')
    // This line is never reached but needed for type safety
    return null as never
  }
} 