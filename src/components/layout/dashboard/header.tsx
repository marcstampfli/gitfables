/**
 * @module components/layout/dashboard/header
 * @description Header component for dashboard pages
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { Book, GitFork, Settings, LayoutDashboard, Search, Bell } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAuth } from '@/hooks/use-auth'
import { UserDropdown } from '@/components/ui/user-dropdown'
import { CommandPalette } from '@/components/ui/command-palette'

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />
  },
  {
    title: 'Stories',
    href: '/dashboard/stories',
    icon: <Book className="h-4 w-4" />
  },
  {
    title: 'Repositories',
    href: '/dashboard/repositories',
    icon: <GitFork className="h-4 w-4" />
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="h-4 w-4" />
  }
]

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  onCommandPalette?: () => void
}

export function DashboardHeader({
  heading,
  text,
  children,
  onCommandPalette,
}: DashboardHeaderProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  if (!user) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 transition-transform">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        <nav className="hidden md:flex items-center justify-center space-x-2 lg:space-x-4 w-full">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              size="sm"
              className={cn(
                "h-8 transition-colors",
                pathname === item.href ? "bg-secondary" : "hover:bg-secondary/80"
              )}
              asChild
            >
              <Link href={item.href}>
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Link>
            </Button>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onCommandPalette}
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Open command palette</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex items-center space-x-1">
                  <span>Command Palette</span>
                  <kbd className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 relative"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Notifications</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {children}
          <UserDropdown user={user} />
        </div>
      </div>
      {(heading || text) && (
        <div className="container py-4">
          <div className="grid gap-1">
            <h1 className="font-heading text-2xl md:text-3xl">{heading}</h1>
            {text && <p className="text-lg text-muted-foreground">{text}</p>}
          </div>
        </div>
      )}
    </header>
  )
} 