/**
 * @module types/story
 * @description Type definitions for story generation and narrative features.
 * Includes types for story settings, segments, events, and metadata.
 * These types are used to generate and manage narrative content from commit history.
 * 
 * @example
 * ```ts
 * import type { Story, StorySettings } from '@/types/story'
 * 
 * const settings: StorySettings = {
 *   includeTimeContext: true,
 *   includeLanguageContext: true,
 *   includeLineChanges: true,
 *   style: 'narrative',
 *   tone: 'professional',
 *   length: 'standard'
 * }
 * ```
 */

import type { Commit } from '@/lib/github-client'

/**
 * Configuration settings for story generation
 * 
 * @interface StorySettings
 * @property {boolean} includeTimeContext - Include timestamps and time-based context
 * @property {boolean} includeLanguageContext - Include programming language context
 * @property {boolean} includeLineChanges - Include code changes statistics
 * @property {StoryStyle} style - Narrative style of the story
 * @property {StoryTone} tone - Tone of the narrative
 * @property {StoryLength} length - Length of story segments
 * 
 * @example
 * ```ts
 * const settings: StorySettings = {
 *   includeTimeContext: true,
 *   includeLanguageContext: true,
 *   includeLineChanges: true,
 *   style: 'technical',
 *   tone: 'professional',
 *   length: 'detailed'
 * }
 * ```
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
 * Narrative style options for story generation
 * 
 * @typedef {string} StoryStyle
 * @description Different writing styles for the generated story
 * 
 * @example
 * ```ts
 * const styles: StoryStyle[] = [
 *   'narrative',  // "Once upon a commit..."
 *   'technical',  // "The implementation introduces..."
 *   'poetic',     // "Through lines of code..."
 *   'humorous',   // "Another bug bites the dust..."
 *   'dramatic'    // "In a crucial moment..."
 * ]
 * ```
 */
export type StoryStyle = 
  | 'narrative' // Traditional storytelling
  | 'technical' // Technical documentation style
  | 'poetic'    // Poetic/artistic style
  | 'humorous'  // Light and funny
  | 'dramatic'  // Dramatic and intense

/**
 * Tone settings for story generation
 * 
 * @typedef {string} StoryTone
 * @description Different tones for the narrative voice
 * 
 * @example
 * ```ts
 * const tones: StoryTone[] = [
 *   'professional', // Formal and business-like
 *   'casual',      // Relaxed and informal
 *   'enthusiastic', // Excited and energetic
 *   'mysterious',   // Intriguing and cryptic
 *   'educational'   // Teaching and informative
 * ]
 * ```
 */
export type StoryTone = 
  | 'professional'
  | 'casual'
  | 'enthusiastic'
  | 'mysterious'
  | 'educational'

/**
 * Length preferences for story segments
 * 
 * @typedef {string} StoryLength
 * @description Different length options for story segments
 * 
 * @example
 * ```ts
 * const lengths: StoryLength[] = [
 *   'brief',     // Quick summary
 *   'standard',  // Normal length
 *   'detailed',  // In-depth coverage
 *   'extended'   // Comprehensive analysis
 * ]
 * ```
 */
export type StoryLength = 
  | 'brief'     // 1-2 sentences
  | 'standard'  // 2-3 sentences
  | 'detailed'  // 4-5 sentences
  | 'extended'  // Full paragraph

/**
 * Individual story segment generated from commit data
 * 
 * @interface StorySegment
 * @property {string} id - Unique identifier
 * @property {string} title - Segment title
 * @property {string} content - Generated narrative content
 * @property {string} timestamp - When the segment was generated
 * @property {Commit} commitData - Original commit data
 * @property {object} metadata - Additional segment metadata
 * @property {StoryStyle} metadata.style - Narrative style used
 * @property {StoryTone} metadata.tone - Narrative tone used
 * @property {StoryLength} metadata.length - Content length
 * @property {string[]} metadata.characters - Featured characters/contributors
 * @property {string[]} metadata.themes - Story themes
 * @property {string} metadata.mood - Overall mood
 * 
 * @example
 * ```ts
 * const segment: StorySegment = {
 *   id: 'seg-1',
 *   title: 'The Great Refactor',
 *   content: 'In a bold move, our hero refactored...',
 *   timestamp: '2024-01-01T12:00:00Z',
 *   commitData: { ... },
 *   metadata: {
 *     style: 'dramatic',
 *     tone: 'enthusiastic',
 *     length: 'standard',
 *     characters: ['Alice', 'Bob'],
 *     themes: ['optimization', 'teamwork'],
 *     mood: 'triumphant'
 *   }
 * }
 * ```
 */
export interface StorySegment {
  id: string
  title: string
  content: string
  timestamp: string
  commitData: Commit
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
 * Complete generated story with multiple segments
 * 
 * @interface Story
 * @property {string} id - Unique identifier
 * @property {string} title - Story title
 * @property {StorySegment[]} segments - Story segments
 * @property {object} repository - Repository information
 * @property {string} repository.name - Repository name
 * @property {string} repository.owner - Repository owner
 * @property {string} repository.url - Repository URL
 * @property {object} metadata - Story metadata
 * @property {string} metadata.generatedAt - Generation timestamp
 * @property {StorySettings} metadata.settings - Generation settings
 * @property {number} metadata.totalCommits - Total commits processed
 * @property {object} metadata.timespan - Story timeframe
 * @property {string} metadata.timespan.start - Start date
 * @property {string} metadata.timespan.end - End date
 * 
 * @example
 * ```ts
 * const story: Story = {
 *   id: 'story-1',
 *   title: 'The Evolution of Our Codebase',
 *   segments: [segment1, segment2],
 *   repository: {
 *     name: 'my-project',
 *     owner: 'octocat',
 *     url: 'https://github.com/octocat/my-project'
 *   },
 *   metadata: {
 *     generatedAt: '2024-01-01T12:00:00Z',
 *     settings: { ... },
 *     totalCommits: 42,
 *     timespan: {
 *       start: '2023-12-01',
 *       end: '2023-12-31'
 *     }
 *   }
 * }
 * ```
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
 * Events emitted during story generation
 * 
 * @typedef {object} StoryEvent
 * @description Union type of all possible story generation events
 * 
 * @example
 * ```ts
 * const events: StoryEvent[] = [
 *   { 
 *     type: 'start',
 *     data: { settings: { ... } }
 *   },
 *   {
 *     type: 'segment',
 *     data: { id: 'seg-1', ... }
 *   },
 *   {
 *     type: 'complete',
 *     data: { id: 'story-1', ... }
 *   }
 * ]
 * ```
 */
export type StoryEvent = 
  | { type: 'start'; data: { settings: StorySettings } }
  | { type: 'segment'; data: StorySegment }
  | { type: 'complete'; data: Story }
  | { type: 'error'; error: Error } 