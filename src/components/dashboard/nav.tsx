/**
 * @module DashboardNav
 * @description A navigation component that provides a vertical menu of dashboard sections.
 * Highlights the current active section based on the URL path.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <DashboardNav />
 * ```
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  BookOpen, 
  GitFork, 
  Settings,
  History
} from 'lucide-react'

/**
 * Navigation item structure
 * @interface
 * @private
 */
interface NavItem {
  /** Display text for the navigation item */
  title: string
  /** URL path for the navigation item */
  href: string
  /** Icon component to display */
  icon: React.ComponentType<{ className?: string }>
}

/**
 * Array of navigation items with their details
 * @const
 * @private
 */
const items: NavItem[] = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Stories',
    href: '/dashboard/stories',
    icon: BookOpen,
  },
  {
    title: 'Repositories',
    href: '/dashboard/repositories',
    icon: GitFork,
  },
  {
    title: 'History',
    href: '/dashboard/history',
    icon: History,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

/**
 * DashboardNav Component
 * 
 * @component
 * @description Renders a vertical navigation menu for the dashboard.
 * Each item includes an icon and label, with the current section highlighted.
 * Uses Next.js routing for navigation and path-based highlighting.
 * 
 * @returns {JSX.Element} A nav element containing navigation buttons
 */
export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-2',
                pathname === item.href && 'bg-muted font-medium'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Button>
          </Link>
        )
      })}
    </nav>
  )
} 