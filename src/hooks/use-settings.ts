/**
 * @module hooks/use-settings
 * @description Client-side hook for settings management
 */

'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/database.types'

// Get the singleton instance
const supabase = createClient()

export type NotificationDigest = 'daily' | 'weekly' | 'never'
export type ThemeMode = 'light' | 'dark' | 'system'
export type FontSize = 'small' | 'medium' | 'large'
export type SyncFrequency = 'hourly' | 'daily' | 'weekly'
export type Visibility = 'public' | 'private'

export interface Settings {
  theme: {
    mode: ThemeMode
    accent_color: string
    language: string
  }
  notifications: {
    email: boolean
    web: boolean
    digest: NotificationDigest
  }
  privacy: {
    show_activity: boolean
    default_story_visibility: Visibility
  }
  repository: {
    auto_sync: boolean
    sync_frequency: SyncFrequency
    default_branch: string
  }
  accessibility: {
    font_size: FontSize
    reduce_animations: boolean
    high_contrast: boolean
    keyboard_shortcuts: boolean
  }
  debugMode: boolean
  apiAccess: boolean
  betaFeatures: boolean
}

const defaultSettings: Settings = {
  theme: {
    mode: 'system',
    accent_color: 'default',
    language: 'en'
  },
  notifications: {
    email: true,
    web: true,
    digest: 'weekly'
  },
  privacy: {
    show_activity: true,
    default_story_visibility: 'private'
  },
  repository: {
    auto_sync: true,
    sync_frequency: 'daily',
    default_branch: 'main'
  },
  accessibility: {
    font_size: 'medium',
    reduce_animations: false,
    high_contrast: false,
    keyboard_shortcuts: true
  },
  debugMode: false,
  apiAccess: false,
  betaFeatures: false
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadSettings() {
      if (!mounted) return

      try {
        setIsLoading(true)
        setError(null)

        // Get user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError) {
          console.error('Error getting user:', userError)
          setIsLoading(false)
          return
        }

        if (!user) {
          setIsLoading(false)
          return
        }

        // Get settings
        const { data, error } = await supabase
          .from('user_settings')
          .select('settings')
          .eq('user_id', user.id)
          .single()

        if (error) {
          // If no settings exist yet, create default settings
          if (error.code === 'PGRST116') {
            const { data: newSettings, error: insertError } = await supabase
              .from('user_settings')
              .insert({
                user_id: user.id,
                settings: defaultSettings as unknown as Database['public']['Tables']['user_settings']['Insert']['settings']
              })
              .select('settings')
              .single()

            if (insertError) {
              console.error('Failed to create settings:', insertError)
              setError(new Error('Failed to create settings'))
              return
            }

            if (mounted) {
              setSettings(newSettings.settings as unknown as Settings)
            }
          } else {
            console.error('Failed to fetch settings:', error)
            setError(error)
          }
        } else if (mounted) {
          setSettings(data.settings as unknown as Settings)
        }
      } catch (err) {
        console.error('Failed to load settings:', err)
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to load settings'))
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    loadSettings()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          if (event === 'SIGNED_OUT') {
            setSettings(defaultSettings)
          } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            loadSettings()
          }
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      // Get user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        return { error: new Error('No authenticated user') }
      }

      const mergedSettings = {
        ...settings,
        ...newSettings
      }

      // Update settings
      const { data, error } = await supabase
        .from('user_settings')
        .update({
          settings: mergedSettings as unknown as Database['public']['Tables']['user_settings']['Update']['settings']
        })
        .eq('user_id', user.id)
        .select('settings')
        .single()

      if (error) {
        console.error('Failed to update settings:', error)
        return { error }
      }

      setSettings(data.settings as unknown as Settings)
      return { data: data.settings as unknown as Settings }
    } catch (error) {
      console.error('Failed to update settings:', error)
      return { error: error instanceof Error ? error : new Error('Failed to update settings') }
    }
  }

  return {
    settings,
    isLoading,
    error,
    updateSettings
  }
} 