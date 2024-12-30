/**
 * @module ThemeToggle
 * @description A button component that toggles between light and dark themes using next-themes.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ThemeToggle />
 * ```
 */

'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { IconButton } from '@/components/ui/button'

/**
 * ThemeToggle Component
 * 
 * @component
 * @description A button that switches between light and dark themes with animated icons
 * @returns {JSX.Element} A button component with sun/moon icons that toggles the theme
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <IconButton
      variant="ghost"
      size="icon"
      label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      icon={
        <div className="relative">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute top-0 left-0 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </div>
      }
    />
  )
} 