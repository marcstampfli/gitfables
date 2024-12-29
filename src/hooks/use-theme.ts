/**
 * @module hooks/use-theme
 * @description Hook for managing theme settings
 */

'use client'

import { useEffect } from 'react'
import { useSettings } from './use-settings'
import type { UserSettings } from '@/types/database'

type ThemeMode = UserSettings['theme']['mode']

export function useTheme() {
  const { settings, updateSettings } = useSettings()

  useEffect(() => {
    // Apply theme to document
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (settings.theme.mode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(settings.theme.mode)
    }
  }, [settings.theme.mode])

  const setTheme = async (mode: ThemeMode) => {
    await updateSettings({ 
      settings: { 
        theme: { 
          ...settings.theme, 
          mode 
        } 
      } 
    })
  }

  return { theme: settings.theme.mode, setTheme }
} 