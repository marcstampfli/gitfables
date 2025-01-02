'use client'

/**
 * @module components/docs/feedback
 * @description Client-side feedback component for documentation pages
 */

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function Feedback() {
  const pathname = usePathname()

  // Only show feedback on docs pages
  if (!pathname.startsWith('/docs/') || pathname === '/docs') {
    return null
  }

  // Get the relative path for GitHub edit link
  const githubPath = pathname.replace('/docs', 'docs')

  return (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
      {/* Feedback */}
      <Card className="p-4">
        <div className="space-y-4" role="group" aria-label="Page feedback">
          <p className="text-sm text-muted-foreground">Was this page helpful?</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 text-sm",
                "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                "rounded-md shadow-sm transition-colors"
              )}
              onClick={() => {
                // TODO: Implement feedback tracking
                console.log('Positive feedback')
              }}
              aria-label="Yes, this page was helpful"
            >
              <ThumbsUp className="h-4 w-4" aria-hidden="true" />
              <span>Yes</span>
            </button>
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 text-sm",
                "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                "rounded-md shadow-sm transition-colors"
              )}
              onClick={() => {
                // TODO: Implement feedback tracking
                console.log('Negative feedback')
              }}
              aria-label="No, this page was not helpful"
            >
              <ThumbsDown className="h-4 w-4" aria-hidden="true" />
              <span>No</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Edit on GitHub */}
      <div className="text-sm">
        <Link
          href={`https://github.com/gitfables/gitfables/edit/main/${githubPath}/page.tsx`}
          className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Edit this page on GitHub (opens in new tab)"
        >
          Edit this page on GitHub
        </Link>
      </div>
    </div>
  )
} 