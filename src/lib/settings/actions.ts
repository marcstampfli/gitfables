/**
 * @module lib/settings/actions
 * @description Server actions for managing user settings
 */

'use server'

import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/supabase'
import type { PostgrestSingleResponse } from '@supabase/supabase-js'

export type Settings = Database['public']['Tables']['user_settings']['Row']
type UpdateSettingsParams = Pick<Settings, 'theme' | 'default_story_style' | 'email_notifications'>
type SettingsUpdate = Database['public']['Tables']['user_settings']['Update']

/**
 * Update user settings
 * 
 * @param {Partial<UpdateSettingsParams>} settings - The settings to update
 * @returns {Promise<Settings>} The updated settings
 * @throws {Error} If there's an error updating settings
 */
export async function updateSettings(settings: Partial<UpdateSettingsParams>) {
  const supabase = createClient()

  const response: PostgrestSingleResponse<Settings> = await supabase
    .from('user_settings')
    .select()
    .single()

  if (response.error) {
    throw response.error
  }

  if (!response.data) {
    throw new Error('No settings found to update')
  }

  const currentSettings = response.data

  // Create a type-safe update object
  const updateFields = {
    ...(settings.theme !== undefined && { theme: settings.theme }),
    ...(settings.default_story_style !== undefined && { default_story_style: settings.default_story_style }),
    ...(settings.email_notifications !== undefined && { email_notifications: settings.email_notifications }),
    updated_at: new Date().toISOString()
  }

  // Supabase's TypeScript types for the update operation are overly strict
  // and don't properly handle conditional object spreading.
  // This is a known issue: https://github.com/supabase/supabase/issues/12794
  const updateResponse = await supabase
    .from('user_settings')
    .update(updateFields as SettingsUpdate)
    .eq('id', currentSettings.id)
    .select()
    .single()

  if (updateResponse.error) {
    throw updateResponse.error
  }

  if (!updateResponse.data) {
    throw new Error('Failed to update settings')
  }

  return updateResponse.data
}

/**
 * Get user settings
 * 
 * @returns {Promise<Settings | null>} The user settings or null if not found
 * @throws {Error} If there's an error fetching settings
 */
export async function getSettings() {
  const supabase = createClient()

  const response: PostgrestSingleResponse<Settings> = await supabase
    .from('user_settings')
    .select('*')
    .single()

  if (response.error) {
    throw response.error
  }

  return response.data
} 