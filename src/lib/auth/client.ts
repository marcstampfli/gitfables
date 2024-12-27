/**
 * @module lib/auth/client
 * @description Client-side authentication utilities and hooks.
 * 
 * @example
 * ```ts
 * import { useAuth } from '@/lib/auth/client'
 * import { logDebug } from '@/lib/logger'
 * 
 * const { user } = useAuth()
 * if (user) {
 *   logDebug('User info', { 
 *     context: 'auth',
 *     metadata: { 
 *       email: user.email,
 *       username: user.username 
 *     }
 *   })
 * }
 * ```
 */

'use client'

import { createClient } from '@supabase/supabase-js'

/**
 * Supabase configuration from environment variables
 * @throws {Error} If environment variables are missing
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

/**
 * Supabase client instance for browser context
 */
const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Get the current user with their profile data
 * 
 * @async
 * @returns {Promise<(import('@supabase/supabase-js').User & Record<string, any>) | null>} User with profile or null
 * @throws {Error} If there's an error fetching user or profile
 * 
 * @example
 * ```ts
 * const user = await getUser()
 * if (user) {
 *   console.log('User:', user.email)
 *   console.log('Profile:', user.username)
 * }
 * ```
 */
export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return {
    ...user,
    ...profile,
  }
}

/**
 * Sign out the current user in browser context
 * 
 * @async
 * @returns {Promise<void>}
 * @throws {Error} If there's an error during sign out
 * 
 * @example
 * ```ts
 * async function handleSignOut() {
 *   await signOut()
 *   // Redirect or update UI
 * }
 * ```
 */
export async function signOut() {
  await supabase.auth.signOut()
} 