/**
 * @module components/layout/dashboard/shell
 * @description Shell component for dashboard layout
 */

'use client'

import { useState } from 'react'
import { cn } from "@/lib/utils"
import { DashboardHeader } from "./header"
import { DashboardFooter } from "./footer"
import { CommandPalette } from '@/components/ui/command-palette'

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string
  text?: string
}

export function DashboardShell({
  heading,
  text,
  children,
  className,
  ...props
}: DashboardShellProps) {
  const [showCommandPalette, setShowCommandPalette] = useState(false)

  return (
    <div className="relative min-h-screen flex flex-col">
      <DashboardHeader 
        heading={heading || ''} 
        text={text} 
        onCommandPalette={() => setShowCommandPalette(true)} 
      />
      <main className="flex-1">
        <div className="container py-6">
          <div className={cn("grid items-start gap-8", className)} {...props}>
            {children}
          </div>
        </div>
      </main>
      <DashboardFooter />
      {showCommandPalette && (
        <CommandPalette onClose={() => setShowCommandPalette(false)} />
      )}
    </div>
  )
} 