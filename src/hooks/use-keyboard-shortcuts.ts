/**
 * @module hooks/use-keyboard-shortcuts
 * @description Hook for handling keyboard shortcuts
 */

'use client'

import { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAccessibility } from './use-accessibility'
import { toast } from '@/components/ui/use-toast'

type KeySequence = string[]
type KeyHandler = () => void

interface KeyMap {
  sequence: KeySequence
  handler: KeyHandler
  description?: string
  category: 'navigation' | 'actions' | 'editor' | 'search'
}

interface KeyboardShortcutsConfig {
  sequenceTimeout?: number
  maxSequenceLength?: number
  enableLogging?: boolean
}

// Map special keys to their display names
const KEY_DISPLAY_MAP: Record<string, string> = {
  'Control': '⌃',
  'Meta': '⌘',
  'Alt': '⌥',
  'Shift': '⇧',
  'ArrowUp': '↑',
  'ArrowDown': '↓',
  'ArrowLeft': '←',
  'ArrowRight': '→',
  'Enter': '↵',
  'Escape': 'Esc',
  'Backspace': '⌫',
  'Delete': 'Del',
  'Tab': '⇥',
}

const DEFAULT_CONFIG: KeyboardShortcutsConfig = {
  sequenceTimeout: 1000,
  maxSequenceLength: 3,
  enableLogging: false
}

export function useKeyboardShortcuts(config: KeyboardShortcutsConfig = {}) {
  const router = useRouter()
  const { keyboardShortcuts } = useAccessibility()
  const [currentSequence, setCurrentSequence] = useState<KeySequence>([])
  const [isSequenceActive, setIsSequenceActive] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()
  
  // Merge config with defaults
  const finalConfig = useMemo(() => ({
    ...DEFAULT_CONFIG,
    ...config
  }), [config])

  // Define keyboard shortcuts
  const keyMaps = useMemo<KeyMap[]>(() => [
    // Navigation shortcuts
    { sequence: ['g', 'h'], handler: () => router.push('/dashboard'), description: 'Go to Home', category: 'navigation' },
    { sequence: ['g', 's'], handler: () => router.push('/dashboard/stories'), description: 'Go to Stories', category: 'navigation' },
    { sequence: ['g', 'r'], handler: () => router.push('/dashboard/repositories'), description: 'Go to Repositories', category: 'navigation' },
    { sequence: ['g', 'p'], handler: () => router.push('/dashboard/profile'), description: 'Go to Profile', category: 'navigation' },
    { sequence: ['g', 't'], handler: () => router.push('/dashboard/settings'), description: 'Go to Settings', category: 'navigation' },

    // Action shortcuts
    { sequence: ['?'], handler: () => document.querySelector<HTMLButtonElement>('[data-shortcut-dialog-trigger]')?.click(), description: 'Show Keyboard Shortcuts', category: 'actions' },
    { sequence: ['Escape'], handler: () => document.querySelector<HTMLButtonElement>('[data-dialog-close]')?.click(), description: 'Close Dialog', category: 'actions' },
    { sequence: ['Control', 'k'], handler: () => document.querySelector<HTMLButtonElement>('[data-command-palette-trigger]')?.click(), description: 'Open Command Palette', category: 'actions' },
    
    // Editor shortcuts
    { sequence: ['Control', 'z'], handler: () => document.execCommand('undo'), description: 'Undo', category: 'editor' },
    { sequence: ['Control', 'Shift', 'z'], handler: () => document.execCommand('redo'), description: 'Redo', category: 'editor' },
    { sequence: ['Control', 'a'], handler: () => document.execCommand('selectAll'), description: 'Select All', category: 'editor' },
    
    // Search shortcuts
    { sequence: ['Control', '/'], handler: () => document.querySelector<HTMLInputElement>('[data-search-input]')?.focus(), description: 'Focus Search', category: 'search' },
    { sequence: ['Control', 'f'], handler: () => document.querySelector<HTMLInputElement>('[data-page-search]')?.focus(), description: 'Find in Page', category: 'search' },
  ], [router])

  const resetSequence = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = undefined
    }
    setCurrentSequence([])
    setIsSequenceActive(false)
  }, [])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    try {
      // Check if shortcuts are enabled
      if (!keyboardShortcuts) return

      // Ignore input fields
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement || 
          (event.target as HTMLElement)?.isContentEditable) {
        return
      }

      // Get the display name for the key
      const key = KEY_DISPLAY_MAP[event.key] || event.key
      const newSequence = [...currentSequence, key]

      // Check if current sequence matches any shortcuts
      for (const keyMap of keyMaps) {
        if (arraysEqual(newSequence, keyMap.sequence)) {
          event.preventDefault()
          try {
            keyMap.handler()
            if (finalConfig.enableLogging) {
              console.debug(`Executed shortcut: ${keyMap.description}`)
            }
          } catch (error) {
            console.error(`Failed to execute shortcut: ${keyMap.description}`, error)
            toast({
              title: 'Shortcut Error',
              description: 'Failed to execute keyboard shortcut',
              variant: 'destructive'
            })
          }
          resetSequence()
          return
        }
      }

      // Reset if sequence is too long
      if (newSequence.length >= finalConfig.maxSequenceLength!) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          resetSequence()
        }, finalConfig.sequenceTimeout)
      }

      setCurrentSequence(newSequence)
      setIsSequenceActive(true)
    } catch (error) {
      console.error('Error handling keyboard shortcut:', error)
      resetSequence()
    }
  }, [keyboardShortcuts, keyMaps, resetSequence, finalConfig, currentSequence])

  // Cleanup on unmount or when shortcuts are disabled
  useEffect(() => {
    if (!keyboardShortcuts) {
      resetSequence()
      return
    }

    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = undefined
      }
    }
  }, [keyboardShortcuts, handleKeyDown, resetSequence])

  return {
    currentSequence,
    isSequenceActive,
    resetSequence,
    shortcuts: keyMaps
  }
}

// Helper function to compare arrays
function arraysEqual(a: any[], b: any[]): boolean {
  if (a.length !== b.length) return false
  return a.every((val, idx) => val === b[idx])
} 