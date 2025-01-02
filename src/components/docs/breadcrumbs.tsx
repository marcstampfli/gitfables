'use client'

/**
 * @module components/docs/breadcrumbs
 * @description Client-side breadcrumb navigation component
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

interface Breadcrumb {
  label: string
  href: string
}

function generateBreadcrumbs(pathname: string): Breadcrumb[] {
  // Remove any trailing slash and split into segments
  const path = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
  const segments = path.split('/').filter(Boolean)

  // Don't show breadcrumbs on main docs page
  if (segments.length === 1 && segments[0] === 'docs') {
    return []
  }

  // Filter out duplicate 'docs' segments and generate breadcrumbs
  const filteredSegments = segments.filter((segment, index) => {
    if (segment === 'docs') {
      return index === 0
    }
    return true
  })

  return filteredSegments.map((segment, index) => {
    const href = `/${filteredSegments.slice(0, index + 1).join('/')}`
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return { label, href }
  })
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const breadcrumbs = generateBreadcrumbs(pathname)

  if (breadcrumbs.length === 0) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link 
        href="/docs"
        className="hover:text-foreground transition-colors"
        aria-label="Documentation home"
      >
        Docs
      </Link>
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" aria-hidden="true" />
          <Link
            href={breadcrumb.href}
            className="hover:text-foreground transition-colors"
            aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
          >
            {breadcrumb.label}
          </Link>
        </div>
      ))}
    </nav>
  )
} 