/**
 * @module types/database
 * @description Type definitions for database schema and Supabase integration.
 * These types define the structure of our database tables and provide type safety
 * for database operations.
 * 
 * @example
 * ```ts
 * import type { DbUser, DbStory, DbUserSettings } from '@/types'
 * 
 * // Fetch a user from the database
 * const user: DbUser = await supabase
 *   .from('users')
 *   .select('*')
 *   .single()
 * 
 * // Update user settings
 * const update: DbUserSettingsUpdate = {
 *   theme: 'dark',
 *   email_notifications: true
 * }
 * ```
 */

/**
 * Repository sync metadata interface
 */
export interface RepositorySyncMetadata {
  commit_count?: number;
  branch_count?: number;
  file_changes?: number;
  start_commit?: string;
  end_commit?: string;
  duration_ms?: number;
  error_details?: {
    message: string;
    code: string;
    stack?: string;
  };
}

/**
 * Complete database schema type definition.
 * Includes all tables, views, functions, and enums in the public schema.
 */
export interface Database {
  public: {
    Tables: {
      /**
       * Users table containing user profile information
       */
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          bio: string | null
          location: string | null
          website: string | null
          timezone: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          bio?: string | null
          location?: string | null
          website?: string | null
          timezone?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          bio?: string | null
          location?: string | null
          website?: string | null
          timezone?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      repositories: {
        Row: {
          id: string
          user_id: string
          name: string
          full_name: string
          owner: string
          description: string | null
          url: string
          private: boolean
          default_branch: string
          languages: Record<string, number>
          stargazers_count: number
          forks_count: number
          watchers_count: number
          size: number
          story_count: number
          commit_count: number
          last_synced_at: string | null
          created_at: string
          updated_at: string
          provider: RepositoryProvider
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          full_name: string
          owner: string
          description?: string | null
          url: string
          private?: boolean
          default_branch?: string
          languages?: Record<string, number>
          stargazers_count?: number
          forks_count?: number
          watchers_count?: number
          size?: number
          story_count?: number
          commit_count?: number
          last_synced_at?: string | null
          created_at?: string
          updated_at?: string
          provider?: RepositoryProvider
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          full_name?: string
          owner?: string
          description?: string | null
          url?: string
          private?: boolean
          default_branch?: string
          languages?: Record<string, number>
          stargazers_count?: number
          forks_count?: number
          watchers_count?: number
          size?: number
          story_count?: number
          commit_count?: number
          last_synced_at?: string | null
          created_at?: string
          updated_at?: string
          provider?: RepositoryProvider
        }
      }
      stories: {
        Row: {
          id: string
          user_id: string
          repository_id: string
          title: string
          content: string
          is_public: boolean
          view_count: number
          share_count: number
          metadata: {
            style: 'epic' | 'technical' | 'casual'
            includeTimeContext: boolean
            includeLanguageContext: boolean
            includeLineChanges: boolean
            generatedAt: string
            totalCommits: number
            timespan: {
              start: string
              end: string
            }
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          repository_id: string
          title: string
          content: string
          is_public?: boolean
          view_count?: number
          share_count?: number
          metadata: {
            style: 'epic' | 'technical' | 'casual'
            includeTimeContext: boolean
            includeLanguageContext: boolean
            includeLineChanges: boolean
            generatedAt: string
            totalCommits: number
            timespan: {
              start: string
              end: string
            }
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          repository_id?: string
          title?: string
          content?: string
          is_public?: boolean
          view_count?: number
          share_count?: number
          metadata?: {
            style: 'epic' | 'technical' | 'casual'
            includeTimeContext: boolean
            includeLanguageContext: boolean
            includeLineChanges: boolean
            generatedAt: string
            totalCommits: number
            timespan: {
              start: string
              end: string
            }
          }
          created_at?: string
          updated_at?: string
        }
      }
      story_views: {
        Row: {
          id: string
          story_id: string
          viewer_id: string | null
          viewed_at: string
        }
        Insert: {
          id?: string
          story_id: string
          viewer_id?: string | null
          viewed_at?: string
        }
        Update: {
          id?: string
          story_id?: string
          viewer_id?: string | null
          viewed_at?: string
        }
      }
      story_shares: {
        Row: {
          id: string
          story_id: string
          sharer_id: string
          platform: 'twitter' | 'linkedin' | 'facebook'
          shared_at: string
        }
        Insert: {
          id?: string
          story_id: string
          sharer_id: string
          platform: 'twitter' | 'linkedin' | 'facebook'
          shared_at?: string
        }
        Update: {
          id?: string
          story_id?: string
          sharer_id?: string
          platform?: 'twitter' | 'linkedin' | 'facebook'
          shared_at?: string
        }
      }
      repository_syncs: {
        Row: {
          id: string
          repository_id: string
          status: 'pending' | 'in_progress' | 'completed' | 'failed'
          started_at: string
          completed_at: string | null
          error: string | null
          metadata: RepositorySyncMetadata
        }
        Insert: {
          id?: string
          repository_id: string
          status: 'pending' | 'in_progress' | 'completed' | 'failed'
          started_at?: string
          completed_at?: string | null
          error?: string | null
          metadata?: RepositorySyncMetadata
        }
        Update: {
          id?: string
          repository_id?: string
          status?: 'pending' | 'in_progress' | 'completed' | 'failed'
          started_at?: string
          completed_at?: string | null
          error?: string | null
          metadata?: RepositorySyncMetadata
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          settings: {
            theme: {
              mode: 'light' | 'dark' | 'system'
              accent_color: string
            }
            notifications: {
              email: boolean
              web: boolean
              digest: 'daily' | 'weekly' | 'never'
            }
            privacy: {
              show_activity: boolean
              default_story_visibility: 'private' | 'team'
            }
            repository: {
              auto_sync: boolean
              sync_frequency: 'hourly' | 'daily' | 'weekly'
              default_branch: string
            }
            accessibility: {
              font_size: 'small' | 'medium' | 'large'
              reduce_animations: boolean
              high_contrast: boolean
              keyboard_shortcuts: boolean
            }
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          settings: {
            theme: {
              mode: 'light' | 'dark' | 'system'
              accent_color: string
            }
            notifications: {
              email: boolean
              web: boolean
              digest: 'daily' | 'weekly' | 'never'
            }
            privacy: {
              show_activity: boolean
              default_story_visibility: 'private' | 'team'
            }
            repository: {
              auto_sync: boolean
              sync_frequency: 'hourly' | 'daily' | 'weekly'
              default_branch: string
            }
            accessibility: {
              font_size: 'small' | 'medium' | 'large'
              reduce_animations: boolean
              high_contrast: boolean
              keyboard_shortcuts: boolean
            }
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          settings?: {
            theme?: {
              mode?: 'light' | 'dark' | 'system'
              accent_color?: string
            }
            notifications?: {
              email?: boolean
              web?: boolean
              digest?: 'daily' | 'weekly' | 'never'
            }
            privacy?: {
              show_activity?: boolean
              default_story_visibility?: 'private' | 'team'
            }
            repository?: {
              auto_sync?: boolean
              sync_frequency?: 'hourly' | 'daily' | 'weekly'
              default_branch?: string
            }
            accessibility?: {
              font_size?: 'small' | 'medium' | 'large'
              reduce_animations?: boolean
              high_contrast?: boolean
              keyboard_shortcuts?: boolean
            }
          }
          created_at?: string
          updated_at?: string
        }
      }
      api_keys: {
        Row: {
          id: string
          user_id: string
          name: string
          key_hash: string
          scopes: string[]
          last_used: string | null
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          key_hash: string
          scopes: string[]
          last_used?: string | null
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          key_hash?: string
          scopes?: string[]
          last_used?: string | null
          expires_at?: string
          created_at?: string
        }
      }
      api_key_usage: {
        Row: {
          id: string
          api_key_id: string
          endpoint: string
          method: string
          status_code: number
          response_time: number
          user_agent: string
          created_at: string
        }
        Insert: {
          id?: string
          api_key_id: string
          endpoint: string
          method: string
          status_code: number
          response_time: number
          user_agent: string
          created_at?: string
        }
        Update: {
          id?: string
          api_key_id?: string
          endpoint?: string
          method?: string
          status_code?: number
          response_time?: number
          user_agent?: string
          created_at?: string
        }
      }
      user_activity: {
        Row: {
          id: string
          user_id: string
          activity_type: ActivityType
          details: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_type: ActivityType
          details?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_type?: ActivityType
          details?: Json
          created_at?: string
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
      activity_type: ActivityType
      repository_provider: RepositoryProvider
    }
  }
}

/**
 * Type aliases for common database operations.
 * These provide convenient access to the most frequently used types.
 */

/** Complete user record type */
export type DbUser = Database['public']['Tables']['users']['Row']

/** Complete repository record type */
export type DbRepository = Database['public']['Tables']['repositories']['Row']

/** Complete story record type */
export type DbStory = Database['public']['Tables']['stories']['Row']

/** Complete story view record type */
export type DbStoryView = Database['public']['Tables']['story_views']['Row']

/** Complete story share record type */
export type DbStoryShare = Database['public']['Tables']['story_shares']['Row']

/** Complete repository sync record type */
export type DbRepositorySync = Database['public']['Tables']['repository_syncs']['Row']

/** Complete user settings record type */
export type DbUserSettings = Database['public']['Tables']['user_settings']['Row']

/** Type for inserting a new user */
export type DbUserInsert = Database['public']['Tables']['users']['Insert']

/** Type for updating a user */
export type DbUserUpdate = Database['public']['Tables']['users']['Update']

/** Type for inserting a new repository */
export type DbRepositoryInsert = Database['public']['Tables']['repositories']['Insert']

/** Type for updating a repository */
export type DbRepositoryUpdate = Database['public']['Tables']['repositories']['Update']

/** Type for inserting a new story */
export type DbStoryInsert = Database['public']['Tables']['stories']['Insert']

/** Type for updating a story */
export type DbStoryUpdate = Database['public']['Tables']['stories']['Update']

/** Type for inserting a new story view */
export type DbStoryViewInsert = Database['public']['Tables']['story_views']['Insert']

/** Type for updating a story view */
export type DbStoryViewUpdate = Database['public']['Tables']['story_views']['Update']

/** Type for inserting a new story share */
export type DbStoryShareInsert = Database['public']['Tables']['story_shares']['Insert']

/** Type for updating a story share */
export type DbStoryShareUpdate = Database['public']['Tables']['story_shares']['Update']

/** Type for inserting a new repository sync */
export type DbRepositorySyncInsert = Database['public']['Tables']['repository_syncs']['Insert']

/** Type for updating a repository sync */
export type DbRepositorySyncUpdate = Database['public']['Tables']['repository_syncs']['Update']

/** Type for inserting new user settings */
export type DbUserSettingsInsert = Database['public']['Tables']['user_settings']['Insert']

/** Type for updating user settings */
export type DbUserSettingsUpdate = Database['public']['Tables']['user_settings']['Update']

export interface UserSettings {
  theme: {
    mode: 'light' | 'dark' | 'system'
    accent_color: string
  }
  notifications: {
    email: boolean
    web: boolean
    digest: 'daily' | 'weekly' | 'never'
  }
  privacy: {
    show_activity: boolean
    default_story_visibility: 'private' | 'team'
  }
  repository: {
    auto_sync: boolean
    sync_frequency: 'hourly' | 'daily' | 'weekly'
    default_branch: string
  }
  accessibility: {
    font_size: 'small' | 'medium' | 'large'
    reduce_animations: boolean
    high_contrast: boolean
    keyboard_shortcuts: boolean
  }
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type RepositoryProvider = 'github' | 'gitlab' | 'bitbucket' 

export type ActivityType = 
  | 'story_created'
  | 'story_updated'
  | 'story_shared'
  | 'story_exported'
  | 'api_key_created'
  | 'api_key_deleted'
  | 'settings_updated'

export type DbUserActivity = Database['public']['Tables']['user_activity']['Row']
export type DbUserActivityInsert = Database['public']['Tables']['user_activity']['Insert']
export type DbUserActivityUpdate = Database['public']['Tables']['user_activity']['Update'] 