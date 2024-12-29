/**
 * @module types/settings
 * @description Types for user settings and preferences
 */

export interface SettingsUpdate {
  theme?: 'light' | 'dark' | 'system'
  notifications?: {
    email?: boolean
    push?: boolean
    inApp?: boolean
  }
  privacy?: {
    shareAnalytics?: boolean
    shareUsage?: boolean
  }
  display?: {
    compactMode?: boolean
    showAvatars?: boolean
    showTimestamps?: boolean
  }
  accessibility?: {
    reduceMotion?: boolean
    highContrast?: boolean
    largeText?: boolean
  }
  advanced?: {
    experimentalFeatures?: boolean
    debugMode?: boolean
  }
} 