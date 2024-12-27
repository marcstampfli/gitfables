/**
 * @module lib/supabase/types
 * @description Type definitions for Supabase database schema.
 * Includes types for users, stories, settings, and database operations.
 * These types are used to ensure type safety when interacting with Supabase.
 * 
 * @example
 * ```ts
 * import type { Database, DbUser, Story } from '@/lib/supabase/types'
 * 
 * // Type-safe database operations
 * const { data: user } = await supabase
 *   .from<DbUser>('users')
 *   .select('*')
 *   .single()
 * ```
 */

/**
 * Database user record type
 * 
 * @interface DbUser
 * @property {string} id - Unique user identifier
 * @property {number} github_id - GitHub user ID
 * @property {string} email - User's email address
 * @property {string} name - User's display name
 * @property {string} avatar_url - User's avatar URL
 * @property {string} github_token - GitHub access token
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Last update timestamp
 */
export type DbUser = {
  id: string
  github_id: number
  email: string
  name: string
  avatar_url: string
  github_token: string
  created_at: string
  updated_at: string
}

/**
 * Story record type
 * 
 * @interface Story
 * @property {string} id - Unique story identifier
 * @property {string} user_id - Owner's user ID
 * @property {number} repository_id - GitHub repository ID
 * @property {string} title - Story title
 * @property {string} content - Story content
 * @property {string} style - Story style identifier
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Last update timestamp
 * @property {boolean} is_public - Story visibility
 * @property {object} metadata - Story metadata
 * @property {number} metadata.commits - Number of commits
 * @property {object} metadata.date_range - Story timeframe
 * @property {string} metadata.date_range.start - Start date
 * @property {string} metadata.date_range.end - End date
 * @property {string[]} metadata.languages - Programming languages
 */
export type Story = {
  id: string
  user_id: string
  repository_id: number
  title: string
  content: string
  style: string
  created_at: string
  updated_at: string
  is_public: boolean
  metadata: {
    commits: number
    date_range: {
      start: string
      end: string
    }
    languages: string[]
  }
}

/**
 * User settings record type
 * 
 * @interface UserSettings
 * @property {string} id - Unique settings identifier
 * @property {string} user_id - User ID
 * @property {'light' | 'dark' | 'system'} theme - UI theme preference
 * @property {string} default_story_style - Default story style
 * @property {boolean} email_notifications - Email notifications enabled
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Last update timestamp
 */
export type UserSettings = {
  id: string
  user_id: string
  theme: 'light' | 'dark' | 'system'
  default_story_style: string
  email_notifications: boolean
  created_at: string
  updated_at: string
}

/**
 * Complete database schema type
 * Used for type-safe database operations with Supabase client
 * 
 * @interface Database
 * @property {object} public - Public schema
 * @property {object} public.Tables - Database tables
 * @property {object} public.Tables.users - Users table operations
 * @property {object} public.Tables.stories - Stories table operations
 * @property {object} public.Tables.user_settings - User settings table operations
 * 
 * @example
 * ```ts
 * import { createClient } from '@supabase/supabase-js'
 * import type { Database } from '@/lib/supabase/types'
 * 
 * const supabase = createClient<Database>(url, key)
 * 
 * // Type-safe query
 * const { data: settings } = await supabase
 *   .from('user_settings')
 *   .select('*')
 *   .eq('user_id', userId)
 *   .single()
 * ```
 */
export type Database = {
  public: {
    Tables: {
      users: {
        Row: DbUser
        Insert: Omit<DbUser, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<DbUser, 'id'>>
      }
      stories: {
        Row: Story
        Insert: Omit<Story, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Story, 'id'>>
      }
      user_settings: {
        Row: UserSettings
        Insert: Omit<UserSettings, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserSettings, 'id'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 