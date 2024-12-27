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
import { Button } from '@/components/ui/button'

/**
 * ThemeToggle Component
 * 
 * @component
 * @description A button that switches between light and dark themes with animated icons
 * @returns {JSX.Element} A button component with sun/moon icons that toggles the theme
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 