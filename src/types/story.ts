/**
 * @module types/story
 * @description Type definitions for story generation and narrative features.
 * These types define the core structures for generating and managing commit history narratives.
 */

import type { Story } from './stories'

// Re-export the Story type
export type { Story }

/**
 * Types of commit patterns that can be identified in a repository's history.
 * Used to categorize and group related commits for narrative generation.
 */
export type CommitPatternType = 
  | 'feature'    // New feature development
  | 'refactor'   // Code refactoring
  | 'bugfix'     // Bug fixes
  | 'docs'       // Documentation
  | 'test'       // Testing
  | 'chore'      // Maintenance
  | 'style'      // Code style
  | 'perf'       // Performance
  | 'revert'     // Reverts
  | 'merge'      // Merges
  | 'release'    // Releases

/**
 * A pattern identified in a repository's commit history.
 * Represents a group of related commits that form a narrative element.
 */
export interface CommitPattern {
  type: CommitPatternType
  commits: string[]
  startDate: string
  endDate: string
  significance: number
  description: string
}

/**
 * Represents a single commit in the repository history.
 * Contains the commit metadata and statistics.
 */
export interface Commit {
  sha: string
  message: string
  author: {
    name: string
    email: string
    date: string
  }
  stats?: {
    total: number
    additions: number
    deletions: number
  }
}

/**
 * Available narrative styles for story generation.
 */
export type StoryStyle = 'epic' | 'technical' | 'casual'

/**
 * Settings for story generation.
 */
export interface StorySettings {
  style: StoryStyle
  includeTimeContext: boolean
  includeLanguageContext: boolean
  includeLineChanges: boolean
  tone: 'enthusiastic' | 'professional' | 'casual'
  length: 'brief' | 'standard' | 'detailed'
}

/**
 * Story event data.
 */
export interface StoryEvent {
  type: 'commit'
  timestamp: string
  data: {
    id: string
    message: string
    author: string
    repository: {
      name: string
      owner: string
      url: string
      description: string
      html_url: string
    }
  }
}

/**
 * Story generator interface.
 */
export interface StoryGenerator {
  generateStory(events: StoryEvent[], settings: StorySettings): Promise<Story>
} 