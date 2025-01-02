/**
 * @module app/(marketing)/layout.client
 * @description Client component for marketing layout
 */

'use client'

import { useState } from 'react'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'
import { CommandPalette } from '@/components/ui/command-palette'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type User } from '@supabase/supabase-js'

interface MarketingLayoutClientProps {
  children: React.ReactNode
  user: User | null
}

export function MarketingLayoutClient({ children, user }: MarketingLayoutClientProps) {
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
    <div className="flex min-h-screen flex-col">
      <Header user={user} onCommandPalette={() => setShowCommandPalette(true)} />
      <main className="flex-1">{children}</main>
      <Footer />
      {showCommandPalette && (
        <CommandPalette onClose={() => setShowCommandPalette(false)} />
      )}
    </div>
  )
} 