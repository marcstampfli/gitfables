/**
 * @module types/settings
 * @description Type definitions for user settings and preferences
 */

export interface UserSettings {
  theme: {
    mode: 'light' | 'dark' | 'system'
    accent_color: string
  }
  notifications: {
    email: boolean
    web: boolean
    digest: 'daily' | 'weekly' | 'never'
  }
  privacy: {
    show_activity: boolean
    default_story_visibility: 'private' | 'team'
  }
  repository: {
    auto_sync: boolean
    sync_frequency: 'hourly' | 'daily' | 'weekly'
    default_branch: string
  }
}

export interface SettingsUpdate {
  path: string[]
  value: any
}

export type SettingsPath = keyof UserSettings | `${keyof UserSettings}.${string}` 