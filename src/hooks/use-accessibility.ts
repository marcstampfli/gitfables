/**
 * @module hooks/use-accessibility
 * @description Hook for managing accessibility settings
 */

'use client'

import { useEffect } from 'react'
import { useSettings } from './use-settings'

export function useAccessibility() {
  const { settings } = useSettings()

  useEffect(() => {
    // Apply font size
    document.documentElement.setAttribute('data-font-size', settings.accessibility.font_size)

    // Apply high contrast mode
    document.documentElement.setAttribute(
      'data-high-contrast',
      settings.accessibility.high_contrast.toString()
    )

    // Apply reduced animations
    document.documentElement.setAttribute(
      'data-reduce-animations',
      settings.accessibility.reduce_animations.toString()
    )
  }, [
    settings.accessibility.font_size,
    settings.accessibility.high_contrast,
    settings.accessibility.reduce_animations
  ])

  // Return settings for components that need to check them
  return {
    fontSize: settings.accessibility.font_size,
    highContrast: settings.accessibility.high_contrast,
    reduceAnimations: settings.accessibility.reduce_animations,
    keyboardShortcuts: settings.accessibility.keyboard_shortcuts
  }
} 