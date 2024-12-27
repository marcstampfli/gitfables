/**
 * @module lib/supabase/server
 * @description Server-side Supabase client configuration.
 * Creates a type-safe Supabase client instance for server components and API routes.
 * Uses Next.js cookie handling for authentication state.
 * 
 * @example
 * ```ts
 * import { createClient } from '@/lib/supabase/server'
 * 
 * // In a server component or API route
 * const supabase = createClient()
 * const { data: user } = await supabase.auth.getUser()
 * ```
 */

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'
import { CookieOptions } from '@supabase/ssr'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

// Validate required environment variables
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

/**
 * Create a type-safe Supabase client for server context
 * 
 * @returns {import('@supabase/supabase-js').SupabaseClient<Database>} Supabase client
 * @throws {Error} If required environment variables are missing
 * 
 * @example
 * ```ts
 * // In a server component
 * async function ServerComponent() {
 *   const supabase = createClient()
 *   const { data: settings } = await supabase
 *     .from('user_settings')
 *     .select('*')
 *     .single()
 *   
 *   return <div>Theme: {settings.theme}</div>
 * }
 * 
 * // In an API route
 * export async function GET() {
 *   const supabase = createClient()
 *   const { data: session } = await supabase.auth.getSession()
 *   
 *   if (!session) {
 *     return new Response('Unauthorized', { status: 401 })
 *   }
 *   // ...
 * }
 * ```
 */
export function createClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        // These are handled by Next.js middleware
        set(_name: string, _value: string, _options: CookieOptions) {},
        remove(_name: string, _options: CookieOptions) {},
      },
    }
  )
} 