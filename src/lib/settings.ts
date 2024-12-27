/**
 * @module lib/settings
 * @description Types and utilities for managing user settings
 */

import type { Database } from '@/types/supabase'

export type Settings = Database['public']['Tables']['user_settings']['Row']
export type SettingsUpdate = Database['public']['Tables']['user_settings']['Update']

export { updateSettings, getSettings } from './settings/actions' 