/**
 * @module hooks/use-keyboard-shortcuts
 * @description Hook for handling keyboard shortcuts
 */

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { logDebug, logError } from '@/lib/utils/logger'

interface KeyMap {
  key: string
  description: string
  action: () => void | Promise<void>
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
}

export function useKeyboardShortcuts(keyMaps: KeyMap[]) {
  const router = useRouter()

  useEffect(() => {
    async function handleKeyDown(event: KeyboardEvent) {
      try {
        // Check if we're in an input field
        const target = event.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          return
        }

        // Find matching key map
        const keyMap = keyMaps.find(
          (km) =>
            km.key.toLowerCase() === event.key.toLowerCase() &&
            !!km.ctrl === event.ctrlKey &&
            !!km.shift === event.shiftKey &&
            !!km.alt === event.altKey
        )

        if (!keyMap) {
          return
        }

        // Log the shortcut being executed
        logDebug('Executing keyboard shortcut', {
          context: 'keyboard_shortcuts',
          metadata: { description: keyMap.description }
        })

        // Execute the action
        try {
          await keyMap.action()
        } catch (error) {
          logError(
            'Failed to execute shortcut',
            error,
            {
              context: 'keyboard_shortcuts',
              metadata: { description: keyMap.description }
            }
          )
          toast({
            title: 'Error',
            description: 'Failed to execute keyboard shortcut',
            variant: 'destructive',
          })
        }
      } catch (error) {
        logError(
          'Error handling keyboard shortcut',
          error,
          { context: 'keyboard_shortcuts' }
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [keyMaps, router])
} 