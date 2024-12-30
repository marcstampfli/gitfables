/**
 * @module hooks/use-accessibility
 * @description Hook for managing accessibility settings
 */

'use client'

import { useEffect } from 'react'
import { useSettings } from '@/hooks/use-settings'
import type { SettingsUpdate } from '@/types/settings'

interface UseAccessibilityReturn {
  fontSize: boolean
  highContrast: boolean
  reduceMotion: boolean
  setAccessibility: (settings: Partial<SettingsUpdate['accessibility']>) => Promise<void>
}

export function useAccessibility(): UseAccessibilityReturn {
  const { settings, updateSettings } = useSettings()

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('large-text', settings?.accessibility?.largeText || false)
    root.classList.toggle('high-contrast', settings?.accessibility?.highContrast || false)
    root.classList.toggle('reduce-motion', settings?.accessibility?.reduceMotion || false)
  }, [
    settings?.accessibility?.largeText,
    settings?.accessibility?.highContrast,
    settings?.accessibility?.reduceMotion
  ])

  const setAccessibility = async (accessibilitySettings: Partial<SettingsUpdate['accessibility']>) => {
    await updateSettings({
      accessibility: {
        ...settings?.accessibility,
        ...accessibilitySettings
      }
    })
  }

  return {
    fontSize: settings?.accessibility?.largeText || false,
    highContrast: settings?.accessibility?.highContrast || false,
    reduceMotion: settings?.accessibility?.reduceMotion || false,
    setAccessibility
  }
} 