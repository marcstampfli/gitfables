/**
 * @module components/layout/dashboard/footer
 * @description Dashboard footer component
 */

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { MadeWithLove } from '@/components/ui/made-with-love'
import { Github, Twitter, Keyboard, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const links = {
  main: [
    { href: '/docs', label: 'Documentation' },
    { href: '/support', label: 'Support' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' }
  ],
  social: [
    {
      href: 'https://github.com/marcstampfli/gitfables',
      label: 'GitHub',
      icon: <Github className="h-4 w-4" />
    },
    {
      href: 'https://twitter.com/gitfables',
      label: 'Twitter',
      icon: <Twitter className="h-4 w-4" />
    }
  ]
}

interface DashboardFooterProps {
  onShowKeyboardShortcuts?: () => void
}

export function DashboardFooter({ onShowKeyboardShortcuts }: DashboardFooterProps) {
  return (
    <footer className="border-t py-6 md:py-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-4 md:px-0">
          <div className="flex items-center gap-2">
            <MadeWithLove />
            <div className="h-4 w-[1px] bg-border hidden md:block" />
            <span className="text-sm text-muted-foreground">v1.0.0</span>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1.5">
                    <Circle className="h-2 w-2 fill-green-400 text-green-400" />
                    <span className="text-sm text-muted-foreground">All systems operational</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <span>System Status</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <nav className="flex gap-4 text-sm text-muted-foreground">
            {links.main.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-foreground',
                  'text-sm font-medium'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={onShowKeyboardShortcuts}
            >
              <Keyboard className="mr-2 h-4 w-4" />
              Keyboard shortcuts
            </Button>
          </nav>
          <div className="h-4 w-[1px] bg-border hidden md:block" />
          <nav className="flex items-center gap-4">
            {links.social.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'transition-colors hover:text-foreground hover:scale-110',
                  'text-muted-foreground'
                )}
              >
                <span className="sr-only">{link.label}</span>
                {link.icon}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
} 