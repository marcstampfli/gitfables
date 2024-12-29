/**
 * @module hooks/use-settings
 * @description Hook for managing user settings
 */

'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from '@/hooks/use-toast'
import { logError } from '@/lib/utils/logger'
import type { UserSettings } from '@/types/database'

interface UseSettingsReturn {
  settings: UserSettings
  updateSettings: (update: { settings: Partial<UserSettings> }) => Promise<void>
  resetSettings: () => Promise<void>
  isLoading: boolean
}

export function useSettings(initialSettings: UserSettings): UseSettingsReturn {
  const [settings, setSettings] = useState<UserSettings>(initialSettings)
  const [isLoading, setIsLoading] = useState(false)

  const updateSettings = async (update: { settings: Partial<UserSettings> }) => {
    try {
      setIsLoading(true)
      const supabase = await createClient()
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
    } finally {
      setIsLoading(false)
    }
  }

  const resetSettings = async () => {
    try {
      setIsLoading(true)
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No authenticated user')

      const { error } = await supabase
        .from('user_settings')
        .update({ settings: initialSettings })
        .eq('user_id', user.id)

      if (error) throw error

      setSettings(initialSettings)
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
    } finally {
      setIsLoading(false)
    }
  }

  return {
    settings,
    updateSettings,
    resetSettings,
    isLoading
  }
} 