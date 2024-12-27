/**
 * @module types/supabase
 * @description Type definitions for Supabase database schema
 */

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
      repositories: {
        Row: {
          id: string
          owner: string
          name: string
          description: string | null
          url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner: string
          name: string
          description?: string | null
          url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner?: string
          name?: string
          description?: string | null
          url?: string
          created_at?: string
          updated_at?: string
        }
      }
      stories: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          created_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          theme: 'light' | 'dark' | 'system'
          default_story_style: string
          email_notifications: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          theme?: 'light' | 'dark' | 'system'
          default_story_style?: string
          email_notifications?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          theme?: 'light' | 'dark' | 'system'
          default_story_style?: string
          email_notifications?: boolean
          created_at?: string
          updated_at?: string
        }
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