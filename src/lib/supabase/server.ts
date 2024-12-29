/**
 * @module lib/supabase/server
 * @description Server-side Supabase client
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
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
            // Handle cookies.set in route handlers
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
            // Handle cookies.delete in route handlers
          }
        }
      }
    }
  )
} 