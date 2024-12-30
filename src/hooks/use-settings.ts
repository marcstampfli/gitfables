/**
 * @module hooks/use-settings
 * @description Hook for managing user settings
 */

'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from '@/hooks/use-toast'
import { logError } from '@/lib/utils/logger'
import type { SettingsUpdate } from '@/types/settings'

interface UseSettingsReturn {
  settings: SettingsUpdate
  updateSettings: (update: Partial<SettingsUpdate>) => Promise<void>
  resetSettings: () => Promise<void>
  isLoading: boolean
}

const defaultSettings: SettingsUpdate = {
  theme: 'system',
  notifications: {
    email: true,
    push: true,
    inApp: true
  },
  privacy: {
    shareAnalytics: true,
    shareUsage: true
  },
  display: {
    compactMode: false,
    showAvatars: true,
    showTimestamps: true
  },
  accessibility: {
    reduceMotion: false,
    highContrast: false,
    largeText: false
  },
  advanced: {
    experimentalFeatures: false,
    debugMode: false
  }
}

export function useSettings(initialSettings?: SettingsUpdate): UseSettingsReturn {
  const [settings, setSettings] = useState<SettingsUpdate>(initialSettings || defaultSettings)
  const [isLoading, setIsLoading] = useState(false)

  const updateSettings = async (update: Partial<SettingsUpdate>) => {
    try {
      setIsLoading(true)
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No authenticated user')

      const newSettings = {
        ...settings,
        ...update
      }

      const { error } = await supabase
        .from('user_settings')
        .update({ settings: newSettings })
        .eq('user_id', user.id)

      if (error) throw error

      setSettings(newSettings)
      toast({
        title: 'Settings Updated',
        description: 'Your settings have been saved successfully.'
      })
    } catch (error) {
      logError('Failed to update settings', error, {
        context: 'settings',
        metadata: {
          action: 'update',
          updateData: update,
          timestamp: new Date().toISOString()
        }
      })
      toast({
        title: 'Error',
        description: 'Failed to update settings. Please try again.',
        variant: 'destructive'
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
        .update({ settings: defaultSettings })
        .eq('user_id', user.id)

      if (error) throw error

      setSettings(defaultSettings)
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