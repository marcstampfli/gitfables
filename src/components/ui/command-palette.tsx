/**
 * @module components/ui/command-palette
 * @description Command palette component for keyboard-driven navigation
 */

'use client'

import * as React from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { Dialog } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

interface CommandPaletteProps {
  onClose: () => void
}

export function CommandPalette({ onClose }: CommandPaletteProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(true)
  const [value, setValue] = React.useState('')

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <Dialog open={open} onOpenChange={(open) => {
      setOpen(open)
      if (!open) onClose()
    }}>
      <div className="fixed inset-0 z-50 bg-black/50" />
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
        <div className="relative w-full max-w-lg">
          <Command
            className={cn(
              'relative h-full max-h-[80vh] w-full overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-lg',
              'animate-in fade-in-0 slide-in-from-top-2'
            )}
          >
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Command.Input
                value={value}
                onValueChange={setValue}
                placeholder="Type a command or search..."
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
              <Command.Empty className="py-6 text-center text-sm">
                No results found.
              </Command.Empty>

              <Command.Group heading="Navigation">
                <Command.Item
                  onSelect={() => runCommand(() => router.push('/dashboard'))}
                >
                  Go to Dashboard
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push('/settings'))}
                >
                  Go to Settings
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Actions">
                <Command.Item
                  onSelect={() => runCommand(() => router.push('/new-story'))}
                >
                  Create New Story
                </Command.Item>
                <Command.Item
                  onSelect={() => runCommand(() => router.push('/repositories/new'))}
                >
                  Add Repository
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </div>
      </div>
    </Dialog>
  )
} 