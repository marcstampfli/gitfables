/**
 * @module app/(dashboard)/layout.client
 * @description Client component for dashboard layout
 */

'use client'

import { DashboardHeader } from '@/components/layout/dashboard/header'
import { DashboardFooter } from '@/components/layout/dashboard/footer'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'
import { KeySequenceToast } from '@/components/ui/key-sequence-toast'
import { useSettings } from '@/hooks/use-settings'

interface DashboardLayoutClientProps {
  children: React.ReactNode
}

export function DashboardLayoutClient({ children }: DashboardLayoutClientProps) {
  const { settings } = useSettings()
  // Initialize keyboard shortcuts
  const { currentSequence, isSequenceActive, resetSequence } = useKeyboardShortcuts()

  return (
    <div className="relative min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1">{children}</main>
      <DashboardFooter />
      {settings.accessibility.keyboard_shortcuts && (
        <KeySequenceToast
          sequence={currentSequence}
          isActive={isSequenceActive}
          onHide={resetSequence}
        />
      )}
    </div>
  )
} 