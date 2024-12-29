/**
 * @module components/layout/dashboard/footer
 * @description Dashboard footer component
 */

import { MadeWithLove } from '@/components/ui/made-with-love'

export function DashboardFooter() {
  return (
    <footer className="border-t py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
        <MadeWithLove />
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <a
            href="https://github.com/marcstampfli/gitfables"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="/docs"
            className="transition-colors hover:text-foreground"
          >
            Documentation
          </a>
          <a
            href="/support"
            className="transition-colors hover:text-foreground"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  )
} 