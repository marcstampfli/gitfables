/**
 * @module hooks/use-theme
 * @description React hook for managing theme settings
 */

import { useCallback } from 'react'
import { useTheme } from 'next-themes'
import type { ThemeConfig } from '@/types'

interface ThemeHookResult {
  theme: string
  isDark: boolean
  setTheme: (theme: string) => void
  toggleTheme: () => void
  systemTheme: string | undefined
  config: ThemeConfig
}

const lightConfig: ThemeConfig = {
  primary: '#3B82F6',
  secondary: '#6B7280',
  accent: '#F59E0B',
  background: '#FFFFFF',
  text: '#1F2937',
  isDark: false,
}

const darkConfig: ThemeConfig = {
  primary: '#60A5FA',
  secondary: '#9CA3AF',
  accent: '#FBBF24',
  background: '#1F2937',
  text: '#F9FAFB',
  isDark: true,
}

/**
 * Hook for managing theme settings
 * 
 * @returns {ThemeHookResult} Hook result with theme operations
 * 
 * @example
 * ```tsx
 * const { 
 *   theme,
 *   isDark,
 *   setTheme,
 *   toggleTheme 
 * } = useAppTheme()
 * 
 * // Set theme
 * setTheme('dark')
 * 
 * // Toggle theme
 * toggleTheme()
 * ```
 */
export function useAppTheme(): ThemeHookResult {
  const { theme, setTheme: setNextTheme, systemTheme } = useTheme()

  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')

  const toggleTheme = useCallback(() => {
    setNextTheme(isDark ? 'light' : 'dark')
  }, [isDark, setNextTheme])

  return {
    theme: theme || 'system',
    isDark,
    setTheme: setNextTheme,
    toggleTheme,
    systemTheme,
    config: isDark ? darkConfig : lightConfig,
  }
} 