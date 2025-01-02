'use client'

/**
 * @module components/docs/doc-layout
 * @description Layout component for documentation pages with sidebar navigation and breadcrumbs
 */

import { cn } from '@/lib/utils'
import { DocSidebar } from './doc-sidebar'
import { DocBreadcrumbs } from './doc-breadcrumbs'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface DocLayoutProps {
  children: React.ReactNode
  className?: string
  showNav?: boolean
  showFeedback?: boolean
  lastUpdated?: string
}

export function DocLayout({
  children,
  className,
  showNav = true,
  showFeedback = true,
  lastUpdated,
}: DocLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 container flex gap-6 py-6">
        {/* Sidebar - sticky until it hits footer */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-[5rem] overflow-y-auto max-h-[calc(100vh-8rem)]">
            <DocSidebar />
          </div>
        </aside>

        {/* Main content */}
        <main className={cn('flex-1 min-w-0', className)}>
          {showNav && (
            <div className="mb-6">
              <DocBreadcrumbs />
            </div>
          )}
          {children}
        </main>
      </div>

      <Footer />
    </div>
  )
} 