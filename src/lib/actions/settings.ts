/**
 * @module lib/actions/settings
 * @description Server actions for settings management
 */

import { createServerClient } from '@/lib/supabase/server'
import { logError } from '@/lib/utils/logger'
import type { Settings, SettingsUpdate } from '@/types/settings'

export const DEFAULT_SETTINGS: Settings = {
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

/**
 * Deep merge two objects
 */
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  return {
    ...target,
    ...Object.fromEntries(
      Object.entries(source).map(([key, value]) => [
        key,
        isObject(value) && isObject(target[key])
          ? deepMerge(target[key], value)
          : value
      ])
    )
  } as T
}

function isObject(item: unknown): item is Record<string, any> {
  return item !== null && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Get user settings
 */
export async function getSettings(userId: string): Promise<Settings> {
  const supabase = await createServerClient()

  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('settings')
      .eq('user_id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Create default settings
        const { data: newSettings, error: createError } = await supabase
          .from('user_settings')
          .insert({
            user_id: userId,
            settings: DEFAULT_SETTINGS
          })
          .select('settings')
          .single()

        if (createError) {
          logError('Failed to create settings:', { context: 'settings:getSettings', metadata: { error: createError } })
          return DEFAULT_SETTINGS
        }

        return newSettings.settings as Settings
      }

      logError('Failed to fetch settings:', { context: 'settings:getSettings', metadata: { error } })
      return DEFAULT_SETTINGS
    }

    return data.settings as Settings
  } catch (error) {
    logError('Error in settings function:', { context: 'settings:getSettings', metadata: { error } })
    return DEFAULT_SETTINGS
  }
}

/**
 * Update user settings
 */
export async function updateSettings(userId: string, update: SettingsUpdate): Promise<Settings> {
  const supabase = await createServerClient()

  try {
    const currentSettings = await getSettings(userId)
    const newSettings = deepMerge(currentSettings, update)

    const { data, error } = await supabase
      .from('user_settings')
      .update({ settings: newSettings })
      .eq('user_id', userId)
      .select('settings')
      .single()

    if (error) {
      logError('Failed to update settings:', { context: 'settings:updateSettings', metadata: { error } })
      return currentSettings
    }

    return data.settings as Settings
  } catch (error) {
    logError('Error in settings function:', { context: 'settings:updateSettings', metadata: { error } })
    return await getSettings(userId)
  }
}

/**
 * Reset user settings to defaults
 */
export async function resetSettings(userId: string): Promise<Settings> {
  const supabase = await createServerClient()

  try {
    const { data, error } = await supabase
      .from('user_settings')
      .upsert({
        user_id: userId,
        settings: DEFAULT_SETTINGS
      })
      .select('settings')
      .single()

    if (error) {
      logError('Failed to reset settings:', { context: 'settings:resetSettings', metadata: { error } })
      return DEFAULT_SETTINGS
    }

    return data.settings as Settings
  } catch (error) {
    logError('Error in settings function:', { context: 'settings:resetSettings', metadata: { error } })
    return DEFAULT_SETTINGS
  }
} 