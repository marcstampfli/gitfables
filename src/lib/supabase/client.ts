/**
 * @module lib/supabase/client
 * @description Client-side Supabase client
 */

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export function createClient() {
  if (typeof window === 'undefined') {
    throw new Error('Browser client cannot be used on the server side')
  }

  if (browserClient) return browserClient
  
  browserClient = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  return browserClient
} 