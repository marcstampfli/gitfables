/**
 * @module components/docs/doc-breadcrumbs
 * @description Breadcrumb navigation component for documentation pages
 */

'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function DocBreadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length <= 1) return null

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/docs"
        className="hover:text-foreground transition-colors"
      >
        Docs
      </Link>
      {segments.slice(1).map((segment: string, index: number) => (
        <span key={segment} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link
            href={`/docs/${segments.slice(1, index + 2).join('/')}`}
            className="capitalize hover:text-foreground transition-colors"
          >
            {segment.replace(/-/g, ' ')}
          </Link>
        </span>
      ))}
    </nav>
  )
} 