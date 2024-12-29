/**
 * @module lib/supabase/server
 * @description Server-side Supabase client
 */

import { createServerClient } from '@supabase/ssr'
import { type SupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'
import type { CookieOptions } from '@supabase/ssr'

let supabaseClient: SupabaseClient<Database> | null = null

export async function createClient(): Promise<SupabaseClient<Database>> {
  if (supabaseClient) return supabaseClient

  const cookieStore = cookies()

  supabaseClient = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookie = await cookieStore.get(name)
          return cookie?.value
        },
        async set(name: string, value: string, options: CookieOptions) {
          await cookieStore.set(name, value, {
            ...options,
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
          })
        },
        async remove(name: string, options: CookieOptions) {
          await cookieStore.delete(name, {
            ...options,
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
          })
        }
      }
    }
  )

  return supabaseClient
} 