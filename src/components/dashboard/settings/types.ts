/**
 * @module components/dashboard/settings/types
 * @description Types for settings components
 */

import type { SettingsUpdate } from '@/types/settings'

export interface SettingsTabProps {
  settings: SettingsUpdate
}

export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ja' | 'ko' | 'zh'
export type EmailFrequency = 'daily' | 'weekly' | 'never' 