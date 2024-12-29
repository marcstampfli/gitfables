/**
 * @module app/(dashboard)/layout
 * @description Layout component for dashboard pages
 */

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'
import type { Database } from '@/types/database'
import type { CookieOptions } from '@supabase/ssr'
import { DashboardLayoutClient } from '@/app/(dashboard)/layout.client'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const cookieStore = cookies()

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookie = await cookieStore.get(name)
          return cookie?.value ?? ''
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            await cookieStore.set({
              name,
              value,
              ...options,
              sameSite: 'lax',
              secure: process.env.NODE_ENV === 'production',
              path: '/'
            })
          } catch (error) {
            console.error('Error setting cookie:', error)
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            await cookieStore.delete({
              name,
              ...options,
              sameSite: 'lax',
              secure: process.env.NODE_ENV === 'production',
              path: '/'
            })
          } catch (error) {
            console.error('Error removing cookie:', error)
          }
        }
      }
    }
  )

  try {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()

    if (error || !user) {
      redirect('/auth/signin')
    }

    return <DashboardLayoutClient>{children}</DashboardLayoutClient>
  } catch (error) {
    console.error('Error in dashboard layout:', error)
    redirect('/auth/signin')
  }
} 