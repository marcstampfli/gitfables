/**
 * @module types/activity
 * @description Type definitions for activity tracking
 */

export type ActivityType = 
  | 'story_created'
  | 'story_updated'
  | 'story_deleted'
  | 'story_shared'
  | 'story_exported'
  | 'story_batch_exported'
  | 'api_key_created'
  | 'api_key_deleted'
  | 'settings_updated'
  | 'settings_reset'

export interface ActivityDetails {
  title?: string
  format?: string
  count?: number
  share_type?: string
  name?: string
  scopes?: string[]
  path?: string
  value?: string | number | boolean
  action?: string
} 