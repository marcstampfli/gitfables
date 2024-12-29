/**
 * @module components/dashboard/settings/types
 * @description Types for settings components
 */

import type { UserSettings } from '@/types/database'

export interface SettingsTabProps {
  settings: UserSettings
}

export interface SettingsContentProps {
  initialSettings: UserSettings
} 