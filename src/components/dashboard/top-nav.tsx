/**
 * @module TopNav
 * @description A navigation component for the dashboard that includes the app logo,
 * main navigation links, and a user menu.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <TopNav user={user} />
 * ```
 */

'use client'

import Link from 'next/link'
import { type User } from '@supabase/supabase-js'
import { signOut } from '@/lib/auth/actions'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserAvatar } from '@/components/user-avatar'
import { Icons } from '@/components/icons'

/**
 * Props for the TopNav component
 * @interface
 */
interface TopNavProps {
  /** The authenticated user object */
  user: User
}

/**
 * TopNav Component
 * 
 * @component
 * @description Renders the top navigation bar for the dashboard, including the app logo,
 * main navigation links, and a user menu dropdown with profile and logout options.
 * 
 * @param {Object} props - Component props
 * @param {User} props.user - The authenticated user object
 * @returns {JSX.Element} A header component containing navigation elements
 */
export function TopNav({ user }: TopNavProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="font-bold">GitFables</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/repositories">Repositories</Link>
            <Link href="/dashboard/stories">Stories</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <UserAvatar user={user} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  {user.email && (
                    <p className="font-medium">{user.email}</p>
                  )}
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={async (event) => {
                  event.preventDefault()
                  await signOut()
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
} 