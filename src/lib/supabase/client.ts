/**
 * @module lib/supabase/client
 * @description Client-side Supabase client configuration.
 * Creates a type-safe Supabase client instance for browser context.
 * 
 * @example
 * ```ts
 * import { supabase } from '@/lib/supabase/client'
 * 
 * // Type-safe query
 * const { data: user } = await supabase
 *   .from('users')
 *   .select('*')
 *   .eq('id', userId)
 *   .single()
 * ```
 */

import { createClient as supabaseCreateClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

// Validate required environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

export const createClient = () => supabaseCreateClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const supabase = createClient() 