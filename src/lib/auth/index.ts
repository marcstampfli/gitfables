/**
 * @module lib/auth
 * @description Authentication utilities and middleware
 */

import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { logError } from '@/lib/logger'
import type { Session } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

export type UserProfile = Database['public']['Tables']['users']['Row']

/**
 * Get the current session
 * 
 * @returns {Promise<Session | null>} The current session or null
 */
export async function getCurrentSession(): Promise<Session | null> {
  const _cookieStore = cookies()
  const supabase = createClient()

  try {
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      logError('Error getting session:', { context: 'auth', metadata: { error } })
      return null
    }

    return session
  } catch (error) {
    logError('Error in auth function:', { context: 'auth', metadata: { error } })
    return null
  }
}

/**
 * Get the current user ID
 * 
 * @returns {Promise<string | null>} The current user ID or null
 */
export async function getCurrentUserId(): Promise<string | null> {
  const _cookieStore = cookies()
  const supabase = createClient()

  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      logError('Error getting user ID:', { context: 'auth', metadata: { error } })
      return null
    }

    return user?.id || null
  } catch (error) {
    logError('Error in auth function:', { context: 'auth', metadata: { error } })
    return null
  }
}

/**
 * Get the current user email
 * 
 * @returns {Promise<string | null>} The current user email or null
 */
export async function getCurrentUserEmail(): Promise<string | null> {
  const _cookieStore = cookies()
  const supabase = createClient()

  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      logError('Error getting user email:', { context: 'auth', metadata: { error } })
      return null
    }

    return user?.email || null
  } catch (error) {
    logError('Error in auth function:', { context: 'auth', metadata: { error } })
    return null
  }
} 