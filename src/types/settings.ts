/**
 * @module types/settings
 * @description Type definitions for user settings
 */

export type Theme = 'light' | 'dark' | 'system'
export type FontSize = 'small' | 'medium' | 'large'
export type StoryVisibility = 'public' | 'private' | 'unlisted'
export type SyncFrequency = 'hourly' | 'daily' | 'weekly' | 'manual'
export type NotificationDigest = 'daily' | 'weekly' | 'never'

export interface Settings {
  theme: {
    mode: Theme
    accent_color: string
    language: string
  }
  notifications: {
    email: boolean
    web: boolean
    digest: NotificationDigest
  }
  privacy: {
    show_activity: boolean
    default_story_visibility: StoryVisibility
  }
  repository: {
    auto_sync: boolean
    sync_frequency: SyncFrequency
    default_branch: string
  }
  accessibility: {
    font_size: FontSize
    reduce_animations: boolean
    high_contrast: boolean
    keyboard_shortcuts: boolean
  }
  debugMode?: boolean
  apiAccess?: boolean
  betaFeatures?: boolean
}

export type SettingsUpdate = Partial<Settings> 