/**
 * @module lib/actions/profile
 * @description Server actions for user profile management
 */

import { createServerClient } from '@/lib/supabase/server'
import { logError } from '@/lib/utils/logger'

export interface Profile {
  id: string
  email: string
  name: string
  bio: string | null
  location: string | null
  website: string | null
  avatar_url: string | null
}

/**
 * Get user profile
 */
export async function getProfile(): Promise<Profile | null> {
  const supabase = await createServerClient()

  try {
    // First get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError) throw authError

    if (!user) return null

    // Then get their profile data
    const { data, error } = await supabase
      .from('users')
      .select('id, email, name, bio, location, website, avatar_url')
      .eq('id', user.id)
      .single()

    if (error) throw error

    return data
  } catch (error) {
    logError('Failed to get profile', error, {
      context: 'profile',
      metadata: {
        action: 'get',
        timestamp: new Date().toISOString()
      }
    })
    return null
  }
}

/**
 * Update user profile
 */
export async function updateProfile(updates: Partial<Profile>): Promise<{ data?: Profile; error?: Error }> {
  const supabase = await createServerClient()

  try {
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError) throw authError
    if (!user) throw new Error('No authenticated user')

    // Update profile
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) throw error

    return { data }
  } catch (error) {
    logError('Failed to update profile', error, {
      context: 'profile',
      metadata: {
        action: 'update',
        timestamp: new Date().toISOString()
      }
    })
    return { error: error as Error }
  }
} 