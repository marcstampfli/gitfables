/**
 * @module hooks/use-profile
 * @description Hook for managing user profile data
 */

import { useEffect, useState } from 'react'
import { useUser } from './use-user'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/database.types'

// Get the singleton instance
const supabase = createClient()

export interface Profile {
  id: string
  name: string | null
  email: string | null
  created_at: string
  updated_at: string
}

export function useProfile() {
  const { user, isLoading: isUserLoading } = useUser()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true
    let retryCount = 0
    const maxRetries = 3

    async function createProfile() {
      if (!user?.id || !user?.email) {
        throw new Error('User data is missing')
      }

      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          name: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        })
        .select()
        .single()

      if (insertError) {
        console.error('Error creating/updating profile:', insertError)
        throw insertError
      }

      return newProfile
    }

    async function loadProfile() {
      if (!mounted) return
      
      try {
        setIsLoading(true)
        setError(null)

        // Wait for user to be loaded
        if (isUserLoading) {
          return
        }

        if (!user?.id) {
          console.log('No user ID found')
          setProfile(null)
          setIsLoading(false)
          return
        }

        console.log('Fetching profile for user:', user.id)

        // First try to get the existing profile
        const { data: existingProfile, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (fetchError) {
          if (fetchError.code === 'PGRST116') { // Not found error
            console.log('No existing profile found, creating new profile')
            try {
              const newProfile = await createProfile()
              if (mounted) {
                console.log('Created new profile:', newProfile)
                setProfile(newProfile)
                setIsLoading(false)
              }
            } catch (createError) {
              if (retryCount < maxRetries) {
                retryCount++
                console.log(`Retrying profile creation (attempt ${retryCount}/${maxRetries})`)
                await loadProfile()
                return
              }
              throw createError
            }
          } else {
            console.error('Error fetching profile:', fetchError)
            throw new Error('Failed to fetch profile. Please try again.')
          }
        } else {
          console.log('Found existing profile:', existingProfile)
          if (mounted) {
            setProfile(existingProfile)
            setIsLoading(false)
          }
        }
      } catch (err) {
        console.error('Error in loadProfile:', err)
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to load profile'))
          setProfile(null)
          setIsLoading(false)
        }
      }
    }

    loadProfile()

    return () => {
      mounted = false
    }
  }, [user?.id, user?.email, isUserLoading])

  const updateProfile = async (data: { name: string; email: string }) => {
    try {
      if (!user?.id) {
        throw new Error('No user found')
      }

      setIsLoading(true)
      console.log('Updating profile for user:', user.id, 'with data:', data)

      const { data: updatedProfile, error } = await supabase
        .from('profiles')
        .update({
          name: data.name,
          email: data.email,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating profile:', error)
        throw new Error('Failed to update profile. Please try again.')
      }

      console.log('Profile updated successfully:', updatedProfile)
      setProfile(updatedProfile)
      return { error: null }
    } catch (err) {
      console.error('Error in updateProfile:', err)
      return { error: err instanceof Error ? err : new Error('Failed to update profile') }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    profile,
    isLoading: isLoading || isUserLoading,
    error,
    updateProfile
  }
} 