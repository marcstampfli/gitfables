/**
 * @module components/docs/doc-sidebar
 * @description Sidebar navigation component for documentation pages
 */

'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Book, GitBranch, Settings, Terminal, Puzzle, Users, FileText, Code2 } from 'lucide-react'

interface DocSidebarProps {
  className?: string
}

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs/getting-started', icon: Book },
      { title: 'Quick Start', href: '/docs/getting-started/quick-start', icon: GitBranch },
      { title: 'Installation', href: '/docs/getting-started/installation', icon: Terminal },
      { title: 'Configuration', href: '/docs/getting-started/configuration', icon: Settings }
    ]
  },
  {
    title: 'Features',
    items: [
      { title: 'Story Generation', href: '/docs/features/story-generation', icon: FileText },
      { title: 'Repository Analysis', href: '/docs/features/repositories', icon: GitBranch },
      { title: 'Team Management', href: '/docs/features/teams', icon: Users },
      { title: 'Integrations', href: '/docs/features/integrations', icon: Puzzle }
    ]
  },
  {
    title: 'API Reference',
    items: [
      { title: 'REST API', href: '/docs/api/rest', icon: Code2 },
      { title: 'GraphQL API', href: '/docs/api/graphql', icon: Code2 },
      { title: 'Webhooks', href: '/docs/api/webhooks', icon: Code2 }
    ]
  }
]

export function DocSidebar({ className }: DocSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn('w-64 shrink-0 border-r bg-background', className)}>
      <nav className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-6 pr-4 pl-8">
        {navigation.map((section) => (
          <div key={section.title} className="mb-8">
            <h4 className="mb-4 text-sm font-semibold tracking-tight">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent',
                        isActive ? 'bg-accent' : 'transparent'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
} 