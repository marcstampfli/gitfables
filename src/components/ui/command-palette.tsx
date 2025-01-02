/**
 * @module components/ui/command-palette
 * @description Command palette component for keyboard-driven navigation
 */

'use client'

import * as React from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import {
  Search,
  LayoutDashboard,
  Settings,
  Book,
  GitFork,
  FileText,
  HelpCircle,
  Plus,
  Home,
  Keyboard,
  LogOut
} from 'lucide-react'

// OS detection
const isMac = typeof window !== 'undefined' && window.navigator.platform.toLowerCase().includes('mac')
const modifierKey = isMac ? '⌘' : 'Ctrl'
const altKey = isMac ? '⌥' : 'Alt'

// Helper function to format keyboard shortcuts
function formatShortcut(shortcut: string): string {
  if (!shortcut) return ''
  
  // Handle special cases
  if (shortcut === '?') return '?'
  
  // For shortcuts that use the modifier key (G D, G S, etc)
  if (shortcut.includes(' ')) {
    const [first, second] = shortcut.split(' ')
    return `${first} ${second}`
  }
  
  // For single key shortcuts (N, R)
  return shortcut
}

// Helper to render keyboard shortcut
function ShortcutKey({ shortcut }: { shortcut: string }) {
  const keys = shortcut.split(' ')
  
  return (
    <kbd className="flex items-center gap-1 ml-auto text-xs">
      {keys.map((key, index) => (
        <React.Fragment key={key}>
          <span className="px-1.5 py-0.5 rounded bg-muted font-mono">{key}</span>
          {index < keys.length - 1 && <span className="text-muted-foreground">+</span>}
        </React.Fragment>
      ))}
    </kbd>
  )
}

interface CommandPaletteProps {
  onClose: () => void
}

type CommandItem = {
  id: string
  icon: React.ReactNode
  label: string
  shortcut?: string
  onSelect: () => void
  keywords?: string[]
  section: string
  show?: (user: any) => boolean
}

export function CommandPalette({ onClose }: CommandPaletteProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [open, setOpen] = React.useState(true)
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const commands: CommandItem[] = [
    // Quick Actions
    {
      id: 'new-story',
      icon: <Plus className="h-4 w-4" />,
      label: 'Create New Story',
      shortcut: 'N',
      onSelect: () => router.push('/dashboard/stories/new'),
      keywords: ['create', 'new', 'story', 'write'],
      section: 'Quick Actions',
      show: (user) => !!user
    },
    {
      id: 'new-repo',
      icon: <GitFork className="h-4 w-4" />,
      label: 'Add Repository',
      shortcut: 'R',
      onSelect: () => router.push('/dashboard/repositories/new'),
      keywords: ['add', 'new', 'repository', 'git', 'repo'],
      section: 'Quick Actions',
      show: (user) => !!user
    },
    // Navigation
    {
      id: 'dashboard',
      icon: <LayoutDashboard className="h-4 w-4" />,
      label: 'Dashboard',
      shortcut: 'G D',
      onSelect: () => router.push('/dashboard'),
      keywords: ['home', 'dash', 'overview'],
      section: 'Navigation',
      show: (user) => !!user
    },
    {
      id: 'stories',
      icon: <Book className="h-4 w-4" />,
      label: 'My Stories',
      shortcut: 'G S',
      onSelect: () => router.push('/dashboard/stories'),
      keywords: ['stories', 'posts', 'content'],
      section: 'Navigation',
      show: (user) => !!user
    },
    {
      id: 'repositories',
      icon: <GitFork className="h-4 w-4" />,
      label: 'Repositories',
      shortcut: 'G R',
      onSelect: () => router.push('/dashboard/repositories'),
      keywords: ['repos', 'git', 'code'],
      section: 'Navigation',
      show: (user) => !!user
    },
    {
      id: 'settings',
      icon: <Settings className="h-4 w-4" />,
      label: 'Settings',
      shortcut: 'G T',
      onSelect: () => router.push('/dashboard/settings'),
      keywords: ['settings', 'preferences', 'config'],
      section: 'Navigation',
      show: (user) => !!user
    },
    // Public Navigation
    {
      id: 'home',
      icon: <Home className="h-4 w-4" />,
      label: 'Home',
      onSelect: () => router.push('/'),
      keywords: ['home', 'start', 'landing'],
      section: 'Navigation',
      show: (user) => !user
    },
    {
      id: 'features',
      icon: <Settings className="h-4 w-4" />,
      label: 'Features',
      onSelect: () => router.push('/features'),
      keywords: ['features', 'capabilities'],
      section: 'Navigation',
      show: (user) => !user
    },
    {
      id: 'pricing',
      icon: <Settings className="h-4 w-4" />,
      label: 'Pricing',
      onSelect: () => router.push('/pricing'),
      keywords: ['pricing', 'plans', 'subscription'],
      section: 'Navigation',
      show: (user) => !user
    },
    // Resources
    {
      id: 'docs',
      icon: <FileText className="h-4 w-4" />,
      label: 'Documentation',
      onSelect: () => router.push('/docs'),
      keywords: ['docs', 'help', 'documentation', 'guide'],
      section: 'Resources'
    },
    {
      id: 'support',
      icon: <HelpCircle className="h-4 w-4" />,
      label: 'Help & Support',
      onSelect: () => router.push('/support'),
      keywords: ['help', 'support', 'contact'],
      section: 'Resources'
    },
    {
      id: 'shortcuts',
      icon: <Keyboard className="h-4 w-4" />,
      label: 'Keyboard Shortcuts',
      shortcut: '?',
      onSelect: () => router.push('/keyboard-shortcuts'),
      keywords: ['keyboard', 'shortcuts', 'keys'],
      section: 'Resources'
    },
    // Account
    {
      id: 'logout',
      icon: <LogOut className="h-4 w-4" />,
      label: 'Sign Out',
      onSelect: () => router.push('/logout'),
      keywords: ['logout', 'sign out', 'exit'],
      section: 'Account',
      show: (user) => !!user
    }
  ]

  // Filter commands based on user state and search
  const filteredCommands = commands.filter(command => {
    // First filter by user state
    if (command.show && !command.show(user)) return false

    // Then filter by search
    if (!value) return true

    const searchValue = value.toLowerCase()
    return (
      command.label.toLowerCase().includes(searchValue) ||
      command.keywords?.some(keyword => keyword.toLowerCase().includes(searchValue))
    )
  })

  // Group commands by section
  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.section]) {
      acc[command.section] = []
    }
    acc[command.section].push(command)
    return acc
  }, {} as Record<string, CommandItem[]>)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (isMac ? e.metaKey : e.ctrlKey)) {
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
    <Dialog 
      open={open} 
      onOpenChange={(open) => {
        setOpen(open)
        if (!open) onClose()
      }}
    >
      <DialogContent
        className="p-0 shadow-2xl"
        onEscapeKeyDown={() => {
          setOpen(false)
          onClose()
        }}
        onPointerDownOutside={() => {
          setOpen(false)
          onClose()
        }}
      >
        <DialogTitle className="sr-only">Command Menu</DialogTitle>
        <DialogDescription className="sr-only">
          Command menu for quick navigation and actions. Use arrow keys to navigate, enter to select, and escape to close.
        </DialogDescription>
        <Command
          ref={inputRef}
          className={cn(
            'relative h-full max-h-[85vh] w-full overflow-hidden rounded-xl border bg-popover text-popover-foreground',
            'animate-in fade-in-0 slide-in-from-top-2'
          )}
          shouldFilter={false}
        >
          <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              ref={inputRef}
              value={value}
              onValueChange={setValue}
              placeholder="Type a command or search..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
              <span className="text-xs">{modifierKey}</span>K
            </kbd>
          </div>
          <Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm">
              No results found.
            </Command.Empty>

            {Object.entries(groupedCommands).map(([section, items]) => (
              <Command.Group key={section} heading={section} className="px-2">
                {items.map((item) => (
                  <Command.Item
                    key={item.id}
                    onSelect={() => runCommand(item.onSelect)}
                    className="flex items-center gap-2 px-2 py-2 aria-selected:bg-accent"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <ShortcutKey shortcut={formatShortcut(item.shortcut)} />
                    )}
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>

          <div className="border-t p-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex gap-2">
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
                <span>esc to close</span>
              </div>
              <div className="flex gap-2">
                <span>{modifierKey}K to open</span>
              </div>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  )
} 