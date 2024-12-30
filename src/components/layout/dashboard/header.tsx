/**
 * @module components/layout/dashboard/header
 * @description Dashboard header component with navigation and user controls
 */

'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button, IconButton } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Logo } from '@/components/ui/logo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, User } from 'lucide-react'
import Link from 'next/link'

export function DashboardHeader() {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/dashboard" className="mr-6">
          <Logo size="sm" />
        </Link>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground/80"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/stories"
              className="transition-colors hover:text-foreground/80"
            >
              Stories
            </Link>
            <Link
              href="/dashboard/repositories"
              className="transition-colors hover:text-foreground/80"
            >
              Repositories
            </Link>
            <Link
              href="/dashboard/settings"
              className="transition-colors hover:text-foreground/80"
            >
              Settings
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton
                  variant="ghost"
                  size="icon"
                  label="User menu"
                  icon={<User className="h-5 w-5" />}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={handleSignOut}
                >
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-destructive hover:text-destructive hover:bg-transparent"
                    icon={<LogOut className="h-4 w-4" />}
                  >
                    Sign out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
} 