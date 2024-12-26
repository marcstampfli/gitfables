/**
 * @module types/story
 * @description Type definitions for story generation and narrative features
 */

import type { CommitData } from './vcs'

/**
 * Story generation settings
 */
export interface StorySettings {
  includeTimeContext: boolean
  includeLanguageContext: boolean
  includeLineChanges: boolean
  style: StoryStyle
  tone: StoryTone
  length: StoryLength
}

/**
 * Story generation style
 */
export type StoryStyle = 
  | 'narrative' // Traditional storytelling
  | 'technical' // Technical documentation style
  | 'poetic'    // Poetic/artistic style
  | 'humorous'  // Light and funny
  | 'dramatic'  // Dramatic and intense

/**
 * Story tone settings
 */
export type StoryTone = 
  | 'professional'
  | 'casual'
  | 'enthusiastic'
  | 'mysterious'
  | 'educational'

/**
 * Story length preferences
 */
export type StoryLength = 
  | 'brief'     // 1-2 sentences
  | 'standard'  // 2-3 sentences
  | 'detailed'  // 4-5 sentences
  | 'extended'  // Full paragraph

/**
 * Generated story segment
 */
export interface StorySegment {
  id: string
  title: string
  content: string
  timestamp: string
  commitData: CommitData
  metadata: {
    style: StoryStyle
    tone: StoryTone
    length: StoryLength
    characters: string[]
    themes: string[]
    mood: string
  }
}

/**
 * Complete story with multiple segments
 */
export interface Story {
  id: string
  title: string
  segments: StorySegment[]
  repository: {
    name: string
    owner: string
    url: string
  }
  metadata: {
    generatedAt: string
    settings: StorySettings
    totalCommits: number
    timespan: {
      start: string
      end: string
    }
  }
}

/**
 * Story generation events
 */
export type StoryEvent = 
  | { type: 'start'; data: { settings: StorySettings } }
  | { type: 'segment'; data: StorySegment }
  | { type: 'complete'; data: Story }
  | { type: 'error'; error: Error } 