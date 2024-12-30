/**
 * @module app/(dashboard)/dashboard/settings/page
 * @description User settings page
 */

import { getSettings } from '@/lib/actions/settings'
import { SettingsContent } from '@/components/dashboard/settings/settings-content'
import type { SettingsUpdate } from '@/types/settings'

export default async function SettingsPage() {
  const userSettings = await getSettings()
  
  // Convert UserSettings to SettingsUpdate format
  const initialSettings: SettingsUpdate = {
    theme: userSettings.theme.mode,
    notifications: {
      email: userSettings.notifications.email,
      push: userSettings.notifications.web,
      inApp: userSettings.notifications.web
    },
    privacy: {
      shareAnalytics: userSettings.privacy.show_activity,
      shareUsage: userSettings.privacy.show_activity
    },
    accessibility: {
      reduceMotion: userSettings.accessibility.reduce_animations,
      highContrast: userSettings.accessibility.high_contrast,
      largeText: userSettings.accessibility.font_size === 'large'
    },
    advanced: {
      experimentalFeatures: false,
      debugMode: false
    }
  }

  return <SettingsContent initialSettings={initialSettings} />
} 