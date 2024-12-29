/**
 * @module components/dashboard/settings/keyboard-shortcuts-dialog
 * @description Dialog component for displaying keyboard shortcuts
 */

'use client'

import { forwardRef } from 'react'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Keyboard } from 'lucide-react'

const SHORTCUT_CATEGORIES = [
  {
    name: 'Navigation',
    shortcuts: [
      { keys: ['g', 'h'], description: 'Go to Home' },
      { keys: ['g', 's'], description: 'Go to Stories' },
      { keys: ['g', 'r'], description: 'Go to Repositories' },
      { keys: ['g', 'p'], description: 'Go to Profile' },
      { keys: ['g', 't'], description: 'Go to Settings' },
    ]
  },
  {
    name: 'Actions',
    shortcuts: [
      { keys: ['?'], description: 'Show Keyboard Shortcuts' },
      { keys: ['Escape'], description: 'Close Dialog' },
      { keys: ['⌃', 'k'], description: 'Open Command Palette' },
      { keys: ['⌃', '/'], description: 'Focus Search' },
    ]
  }
]

export const KeyboardShortcutsDialog = forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          ref={ref}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
        >
          <Keyboard className="h-4 w-4" />
          Keyboard Shortcuts
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Keyboard shortcuts to help you navigate GitFables more efficiently
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {SHORTCUT_CATEGORIES.map((category) => (
            <Card key={category.name} className="p-6">
              <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
              <div className="space-y-4">
                {category.shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.description}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-muted-foreground">
                      {shortcut.description}
                    </span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key, index) => (
                        <kbd
                          key={`${key}-${index}`}
                          className="px-2 py-1 text-xs rounded bg-muted"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
})

KeyboardShortcutsDialog.displayName = 'KeyboardShortcutsDialog' 