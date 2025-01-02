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
    root.classList.toggle('large-text', settings?.accessibility?.font_size === 'large')
    root.classList.toggle('high-contrast', settings?.accessibility?.high_contrast || false)
    root.classList.toggle('reduce-motion', settings?.accessibility?.reduce_animations || false)
  }, [
    settings?.accessibility?.font_size,
    settings?.accessibility?.high_contrast,
    settings?.accessibility?.reduce_animations
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
    fontSize: settings?.accessibility?.font_size === 'large',
    highContrast: settings?.accessibility?.high_contrast || false,
    reduceMotion: settings?.accessibility?.reduce_animations || false,
    setAccessibility
  }
} 