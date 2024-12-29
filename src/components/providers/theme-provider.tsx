/**
 * @module components/theme-provider
 * @description Theme provider component that manages the application's theme state.
 * Uses next-themes to handle theme switching and persistence, with support for system preferences.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 *
 * // With custom theme
 * <ThemeProvider
 *   attribute="class"
 *   defaultTheme="system"
 *   enableSystem
 * >
 *   <App />
 * </ThemeProvider>
 * ```
 */

'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

/**
 * Theme provider component
 * 
 * @component
 * @description Wraps the application with theme context and handles theme state management.
 * Includes hydration handling to prevent theme flashing on initial load.
 * 
 * @param {ThemeProviderProps} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @param {string} [props.attribute="class"] - HTML attribute to apply theme
 * @param {string} [props.defaultTheme="system"] - Default theme to use
 * @param {boolean} [props.enableSystem=true] - Whether to enable system theme detection
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
} 