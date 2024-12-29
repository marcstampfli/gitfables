/**
 * @module app/(dashboard)/layout.client
 * @description Client component for dashboard layout
 */

'use client'

import { useState } from 'react'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'
import { CommandPalette } from '@/components/ui/command-palette'

interface DashboardLayoutClientProps {
  children: React.ReactNode
}

export function DashboardLayoutClient({ children }: DashboardLayoutClientProps) {
  const [showCommandPalette, setShowCommandPalette] = useState(false)

  const keyMaps = [
    {
      key: 'k',
      ctrl: true,
      description: 'Open command palette',
      action: () => setShowCommandPalette(true)
    },
    {
      key: 'Escape',
      description: 'Close command palette',
      action: () => setShowCommandPalette(false)
    }
  ]

  useKeyboardShortcuts(keyMaps)

  return (
    <div className="relative min-h-screen">
      <div className="flex-1">
        {children}
      </div>
      {showCommandPalette && (
        <CommandPalette onClose={() => setShowCommandPalette(false)} />
      )}
    </div>
  )
} 