/**
 * @module lib/story/types
 * @description Type definitions for story generation and management
 */

import type { CommitData } from '@/types'

/**
 * Story theme options
 */
export type StoryTheme = 
  | 'adventure'
  | 'mystery'
  | 'sci-fi'
  | 'fantasy'
  | 'horror'
  | 'comedy'

/**
 * Developer persona based on commit patterns
 */
export type DeveloperPersona = 
  | 'night-owl'    // 10 PM - 5 AM
  | 'early-bird'   // 5 AM - 12 PM
  | 'steady-coder' // 12 PM - 5 PM
  | 'evening-dev'  // 5 PM - 10 PM

/**
 * Story generation options
 */
export interface StoryOptions {
  theme: StoryTheme
  persona?: DeveloperPersona
  language?: string
  timeSpan?: {
    start: Date
    end: Date
  }
  includeStats?: boolean
  maxLength?: number
}

/**
 * Story fragment representing a single commit or group of commits
 */
export interface StoryFragment {
  id: string
  title: string
  content: string
  date: string
  commits: CommitData[]
  stats?: {
    additions: number
    deletions: number
    files: number
  }
  metadata?: {
    theme: StoryTheme
    persona: DeveloperPersona
    language?: string
    intensity: number // 0-10 based on commit frequency
  }
}

/**
 * Complete story with multiple fragments
 */
export interface Story {
  id: string
  title: string
  description: string
  author: string
  createdAt: string
  updatedAt: string
  fragments: StoryFragment[]
  theme: StoryTheme
  stats: {
    totalCommits: number
    totalAdditions: number
    totalDeletions: number
    totalFiles: number
    timeSpan: {
      start: string
      end: string
    }
  }
  metadata?: {
    repository: {
      name: string
      owner: string
      url?: string
    }
    persona: DeveloperPersona
    languages: string[]
    contributors?: string[]
  }
}

/**
 * Story generator configuration
 */
export interface StoryGeneratorConfig {
  maxFragmentsPerStory?: number
  minCommitsPerFragment?: number
  maxCommitsPerFragment?: number
  defaultTheme?: StoryTheme
  defaultPersona?: DeveloperPersona
  enableStats?: boolean
  enableMetadata?: boolean
}

/**
 * Story generator interface
 */
export interface StoryGenerator {
  /**
   * Generate a story from commit data
   */
  generateStory(
    commits: CommitData[],
    options: StoryOptions
  ): Promise<Story>

  /**
   * Generate a story fragment from commits
   */
  generateFragment(
    commits: CommitData[],
    options: StoryOptions
  ): Promise<StoryFragment>

  /**
   * Get the current configuration
   */
  getConfig(): StoryGeneratorConfig

  /**
   * Update the configuration
   */
  updateConfig(config: Partial<StoryGeneratorConfig>): void
} 