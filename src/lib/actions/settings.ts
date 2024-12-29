/**
 * @module lib/actions/settings
 * @description Server actions for settings management
 */

import { createClient } from '@/lib/supabase/server'
import { logError } from '@/lib/utils/logger'
import type { UserSettings } from '@/types/database'

export const DEFAULT_SETTINGS: UserSettings = {
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
  }
}

export async function getSettings(): Promise<UserSettings> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No authenticated user')

    // First try to get existing settings
    const { data: existingSettings, error: _fetchError } = await supabase
      .from('user_settings')
      .select('settings')
      .eq('user_id', user.id)
      .single()

    if (existingSettings) {
      return existingSettings.settings
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

      return retrySettings?.settings || DEFAULT_SETTINGS
    }

    return DEFAULT_SETTINGS
  } catch (error) {
    logError('Failed to load settings', error, {
      context: 'settings',
      metadata: {
        action: 'load',
        timestamp: new Date().toISOString()
      }
    })
    return DEFAULT_SETTINGS
  }
} 