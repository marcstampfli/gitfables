/**
 * @module lib/settings/actions
 * @description Server actions for managing user settings
 */

'use server'

import { createClient } from '@/lib/supabase/server'
import { logError } from '@/lib/utils/logger'
import type { SettingsUpdate } from '@/types'

export async function getSettings() {
  const supabase = await createClient()

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      logError('Error getting user:', { context: 'settings:getSettings', metadata: { error: userError } })
      return null
    }

    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error) {
      logError('Error getting settings:', { context: 'settings:getSettings', metadata: { error } })
      return null
    }

    return data
  } catch (error) {
    logError('Error in settings function:', { context: 'settings:getSettings', metadata: { error } })
    return null
  }
}

export async function updateSettings(settings: SettingsUpdate) {
  const supabase = await createClient()

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      logError('Error getting user:', { context: 'settings:updateSettings', metadata: { error: userError } })
      return { error: userError }
    }

    const { data, error } = await supabase
      .from('user_settings')
      .upsert({
        user_id: user.id,
        ...settings,
      })
      .select()
      .single()

    if (error) {
      logError('Error updating settings:', { context: 'settings:updateSettings', metadata: { error } })
      return { error }
    }

    return { data }
  } catch (error) {
    logError('Error in settings function:', { context: 'settings:updateSettings', metadata: { error } })
    return { error }
  }
} 