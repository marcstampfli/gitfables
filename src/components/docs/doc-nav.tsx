'use client'

import { useState } from 'react'
import { NavLink } from '@/components/ui/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Github, MessageCircle, Book, Code2, Users, Settings, Sparkles, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const version = 'v1.0.0'

interface NavGroup {
  title: string
  icon: React.ComponentType<{ className?: string }>
  items: {
    href: string
    title: string
  }[]
}

const navGroups: NavGroup[] = [
  {
    title: 'Getting Started',
    icon: Book,
    items: [
      { href: '/docs/getting-started', title: 'Introduction' },
      { href: '/docs/story-formats', title: 'Story Formats' },
      { href: '/docs/templates', title: 'Custom Templates' },
      { href: '/docs/exports', title: 'Export Options' }
    ]
  },
  {
    title: 'Features',
    icon: Sparkles,
    items: [
      { href: '/docs/ai-config', title: 'AI Configuration' },
      { href: '/docs/shared-templates', title: 'Shared Templates' },
      { href: '/docs/analytics', title: 'Analytics' }
    ]
  },
  {
    title: 'API Reference',
    icon: Code2,
    items: [
      { href: '/docs/api', title: 'Overview' },
      { href: '/docs/api/auth', title: 'Authentication' },
      { href: '/docs/api/rest', title: 'REST API' },
      { href: '/docs/api/graphql', title: 'GraphQL API' },
      { href: '/docs/api/webhooks', title: 'Webhooks' }
    ]
  },
  {
    title: 'Team & Access',
    icon: Users,
    items: [
      { href: '/docs/teams', title: 'Team Features' },
      { href: '/docs/access-control', title: 'Access Control' },
      { href: '/docs/configuration', title: 'Configuration' }
    ]
  }
]

export function DocNav() {
  const [searchQuery, setSearchQuery] = useState('')
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

  const filteredGroups = navGroups.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.items.length > 0)

  const toggleGroup = (groupTitle: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupTitle]: !prev[groupTitle]
    }))
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search and Version */}
      <div className="sticky top-0 bg-background p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search docs..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Documentation {version}</span>
          <Button variant="ghost" size="sm" asChild>
            <a
              href="https://github.com/gitfables/gitfables"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {filteredGroups.map((group) => (
          <div key={group.title}>
            <button
              onClick={() => toggleGroup(group.title)}
              className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground w-full hover:text-foreground transition-colors group"
            >
              <ChevronRight 
                className={cn(
                  "h-4 w-4 transition-transform",
                  !collapsedGroups[group.title] && "rotate-90"
                )} 
              />
              <group.icon className="h-4 w-4" />
              {group.title}
            </button>
            <div className={cn(
              "space-y-1 ml-6 overflow-hidden transition-all",
              collapsedGroups[group.title] ? "h-0" : "h-auto"
            )}>
              {group.items.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.title}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Links */}
      <div className="sticky bottom-0 bg-background p-4 border-t">
        <div className="flex items-center justify-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <a
              href="/discord"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Community
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a
              href="/support"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Support
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
} 