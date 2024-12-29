/**
 * @module types/stories
 * @description Type definitions for stories
 */

export type ShareType = 'public' | 'private' | 'team'

export interface Story {
  id: string
  user_id: string
  title: string
  content: string
  repository_url: string
  commit_hash: string
  created_at: string
  updated_at: string
}

export interface SharedStory {
  id: string
  story_id: string
  user_id: string
  share_type: ShareType
  share_code: string
  expires_at?: string
  created_at: string
  updated_at: string
  views_count: number
  last_viewed_at?: string
  story?: Story
}

export interface CreateStoryRequest {
  title: string
  content: string
  repository_url: string
  commit_hash: string
}

export interface ShareStoryRequest {
  story_id: string
  share_type: ShareType
  expires_in_days?: number
}

export interface UpdateStoryRequest {
  title?: string
  content?: string
  repository_url?: string
  commit_hash?: string
}

export type StoryStyle = 'epic' | 'technical' | 'casual'

export interface CommitPattern {
  type: string
  description: string
  commits: Array<{
    sha: string
    message: string
    date: string
  }>
  significance: number
  startDate: string
  endDate: string
}

export interface DeveloperPersona {
  type: string
  confidence: number
  traits: string[]
}

export interface StoryTemplate {
  intro: (commitCount: number, persona: DeveloperPersona) => string
  pattern: (pattern: CommitPattern) => string
  achievement: (description: string) => string
  conclusion: (period: { start: string; end: string }, persona: DeveloperPersona) => string
} 