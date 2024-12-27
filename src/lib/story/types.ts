/**
 * @module lib/story/types
 * @description Type definitions for story generation and management
 */

import type { Repository } from '@/lib/github-client'

/**
 * Story style options
 */
export type StoryStyle = 'epic' | 'narrative' | 'technical' | 'casual'

/**
 * Achievement interface
 */
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
}

/**
 * Developer persona interface
 */
export interface DeveloperPersona {
  type: 'night-owl' | 'early-bird' | 'steady-coder' | 'weekend-warrior'
  confidence: number // 0-1 indicating how confident we are in this persona
  traits: string[]
}

/**
 * Commit pattern type
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
 * Commit pattern interface
 */
export interface CommitPattern {
  type: string
  commits: string[]
  startDate: string
  endDate: string
  significance: number
  description: string
}

/**
 * Story segment interface
 */
export interface StorySegment {
  type: string
  content: string
  metadata?: Record<string, unknown>
}

/**
 * Story interface
 */
export interface Story {
  id: string
  title: string
  description: string
  content: string
  intro: string
  conclusion: string
  createdAt: string
  repository: Repository
  style: StoryStyle
  persona: StoryPersona
  stats: StoryStats
}

export interface StorySettings {
  style: StoryStyle
  includeTimeContext: boolean
  includeLanguageContext: boolean
  includeLineChanges: boolean
}

export interface StoryEvent {
  type: string
  timestamp: string
  data: Record<string, unknown>
}

export interface StoryGenerator {
  generateStory(events: StoryEvent[], settings: StorySettings): Promise<Story>
}

export interface StoryGeneratorConfig {
  style: StoryStyle
  persona: string
  tone: string
  length: 'short' | 'medium' | 'long'
}

export interface StoryPersona {
  type: 'developer' | 'architect' | 'manager' | 'contributor'
  traits: string[]
  style: string
}

export interface StoryStats {
  totalCommits: number
  periodStart: string
  periodEnd: string
  topLanguages: Array<{
    name: string
    percentage: number
  }>
}

export interface StoryChapter {
  id: string
  title: string
  content: string
  timestamp: string
  metadata: {
    style: StoryStyle
    tone: string
    length: string
    characters: string[]
    themes: string[]
    mood: string
  }
} 