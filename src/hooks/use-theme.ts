/**
 * @module hooks/use-theme
 * @description Hook for managing theme settings
 */

'use client'

import { useEffect } from 'react'
import { useSettings } from '@/hooks/use-settings'
import type { SettingsUpdate } from '@/types/settings'

type Theme = 'light' | 'dark' | 'system'

interface UseThemeReturn {
  theme: Theme
  setTheme: (theme: Theme) => Promise<void>
}

export function useTheme(): UseThemeReturn {
  const { settings, updateSettings } = useSettings()

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')

    if (settings?.theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(settings?.theme || 'system')
    }
  }, [settings?.theme])

  const setTheme = async (theme: Theme) => {
    await updateSettings({
      theme
    })
  }

  return { theme: settings?.theme || 'system', setTheme }
} 