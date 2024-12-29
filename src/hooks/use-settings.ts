/**
 * @module hooks/use-settings
 * @description Hook for managing user settings
 */

'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from '@/hooks/use-toast'
import { logError } from '@/lib/utils/logger'
import type { UserSettings } from '@/types/database'

const DEFAULT_SETTINGS: UserSettings = {
  theme: {
    mode: 'system',
    accent_color: 'default'
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
  }
}

interface UseSettingsReturn {
  settings: UserSettings
  updateSettings: (update: { settings: Partial<UserSettings> }) => Promise<void>
  resetSettings: () => Promise<void>
  isLoading: boolean
}

export function useSettings(): UseSettingsReturn {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    let isMounted = true
    let retryCount = 0
    const maxRetries = 3

    async function loadSettings() {
      try {
        setIsLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('No authenticated user')

        // First try to get existing settings
        const { data: existingSettings, error: _fetchError } = await supabase
          .from('user_settings')
          .select('settings')
          .eq('user_id', user.id)
          .single()

        if (existingSettings) {
          if (isMounted) {
            setSettings(existingSettings.settings)
            setIsLoading(false)
          }
          return
        }

        // If no settings exist, create them
        const { error: insertError } = await supabase
          .from('user_settings')
          .insert({
            user_id: user.id,
            settings: DEFAULT_SETTINGS
          })

        if (insertError) {
          // If insert fails due to race condition, try to get settings again
          const { data: retrySettings, error: retryError } = await supabase
            .from('user_settings')
            .select('settings')
            .eq('user_id', user.id)
            .single()

          if (retryError) {
            throw retryError
          }

          if (isMounted && retrySettings) {
            setSettings(retrySettings.settings)
          }
        } else if (isMounted) {
          setSettings(DEFAULT_SETTINGS)
        }
      } catch (error) {
        if (retryCount < maxRetries) {
          retryCount++
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount))
          await loadSettings()
          return
        }

        logError('Failed to load settings', error, {
          context: 'settings',
          metadata: {
            action: 'load',
            timestamp: new Date().toISOString(),
            retryCount,
            userId: (await supabase.auth.getUser()).data.user?.id
          }
        })
        if (isMounted) {
          toast({
            title: 'Error',
            description: 'Failed to load settings. Please try again.',
            variant: 'destructive'
          })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadSettings()
    return () => { isMounted = false }
  }, [supabase])

  const updateSettings = async (update: { settings: Partial<UserSettings> }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No authenticated user')

      const newSettings = {
        ...settings,
        ...update.settings
      }

      const { error } = await supabase
        .from('user_settings')
        .update({ settings: newSettings })
        .eq('user_id', user.id)

      if (error) throw error

      setSettings(newSettings)
    } catch (error) {
      logError('Failed to update settings', error, {
        context: 'settings',
        metadata: {
          action: 'update',
          updateData: update.settings,
          timestamp: new Date().toISOString()
        }
      })
      throw error
    }
  }

  const resetSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No authenticated user')

      const { error } = await supabase
        .from('user_settings')
        .update({ settings: DEFAULT_SETTINGS })
        .eq('user_id', user.id)

      if (error) throw error

      setSettings(DEFAULT_SETTINGS)
      toast({
        title: 'Settings Reset',
        description: 'Your settings have been reset to default values.'
      })
    } catch (error) {
      logError('Failed to reset settings', error, {
        context: 'settings',
        metadata: {
          action: 'reset',
          timestamp: new Date().toISOString()
        }
      })
      toast({
        title: 'Error',
        description: 'Failed to reset settings. Please try again.',
        variant: 'destructive'
      })
    }
  }

  return {
    settings,
    updateSettings,
    resetSettings,
    isLoading
  }
} 