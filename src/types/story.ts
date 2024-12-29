/**
 * @module types/story
 * @description Type definitions for story generation and narrative features.
 * These types define the core structures for generating and managing commit history narratives.
 * 
 * @example
 * ```ts
 * import type { Story, StorySettings, StoryStyle } from '@/types'
 * 
 * // Configure story settings
 * const settings: StorySettings = {
 *   style: 'epic',
 *   includeTimeContext: true,
 *   includeLanguageContext: true,
 *   includeLineChanges: false,
 *   tone: 'enthusiastic',
 *   length: 'standard'
 * }
 * ```
 */

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
 * 
 * @example
 * ```ts
 * const pattern: CommitPattern = {
 *   type: 'feature',
 *   commits: ['abc123', 'def456'],
 *   startDate: '2024-01-01T00:00:00Z',
 *   endDate: '2024-01-02T00:00:00Z',
 *   significance: 0.8,
 *   description: 'Implemented user authentication'
 * }
 * ```
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
 * 
 * @example
 * ```ts
 * const commit: Commit = {
 *   sha: 'abc123',
 *   message: 'feat: add user authentication',
 *   author: {
 *     name: 'John Doe',
 *     email: 'john@example.com',
 *     date: '2024-01-01T00:00:00Z'
 *   },
 *   stats: {
 *     total: 100,
 *     additions: 80,
 *     deletions: 20
 *   }
 * }
 * ```
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
 * Determines the overall tone and structure of the generated story.
 */
export type StoryStyle = 'epic' | 'technical' | 'casual'

/**
 * Available tones for story narration.
 * Affects the language and presentation style of the story.
 */
export type StoryTone = 'professional' | 'casual' | 'enthusiastic' | 'mysterious' | 'educational'

/**
 * Available story length options.
 * Determines the level of detail and overall length of the generated story.
 */
export type StoryLength = 'brief' | 'standard' | 'detailed' | 'extended'

/**
 * Configuration options for story generation.
 * Controls how the story is generated and what elements are included.
 * 
 * @example
 * ```ts
 * const settings: StorySettings = {
 *   style: 'epic',
 *   includeTimeContext: true,
 *   includeLanguageContext: true,
 *   includeLineChanges: false,
 *   tone: 'enthusiastic',
 *   length: 'standard'
 * }
 * ```
 */
export interface StorySettings {
  style: StoryStyle
  includeTimeContext: boolean
  includeLanguageContext: boolean
  includeLineChanges: boolean
  tone?: StoryTone
  length?: StoryLength
}

/**
 * A segment of a story, representing a specific period or theme.
 * Contains the narrative content and metadata for that segment.
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
 * An event in the repository history that contributes to the story.
 * Typically represents a commit or group of commits.
 */
export interface StoryEvent {
  type: string
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
 * The main story structure containing all narrative elements and metadata.
 * This is the final output of the story generation process.
 * 
 * @example
 * ```ts
 * const story: Story = {
 *   id: 'story-123',
 *   title: 'The Epic of User Authentication',
 *   description: 'A tale of securing our application...',
 *   content: '...',
 *   repository: {
 *     name: 'my-app',
 *     owner: 'john-doe',
 *     url: 'https://github.com/john-doe/my-app',
 *     description: 'A secure web application',
 *     html_url: 'https://github.com/john-doe/my-app'
 *   },
 *   metadata: {
 *     style: 'epic',
 *     includeTimeContext: true,
 *     includeLanguageContext: true,
 *     includeLineChanges: false,
 *     generatedAt: '2024-01-01T00:00:00Z',
 *     settings: { ... },
 *     totalCommits: 50,
 *     timespan: {
 *       start: '2024-01-01T00:00:00Z',
 *       end: '2024-01-31T00:00:00Z'
 *     }
 *   },
 *   characters: ['John Doe', 'Jane Smith'],
 *   events: [...],
 *   segments: [...]
 * }
 * ```
 */
export interface Story {
  id: string
  title: string
  description: string
  content: string
  repository: {
    name: string
    owner: string
    url: string
    description: string
    html_url: string
  }
  metadata: {
    style: StoryStyle
    includeTimeContext: boolean
    includeLanguageContext: boolean
    includeLineChanges: boolean
    generatedAt: string
    settings: StorySettings
    totalCommits: number
    timespan: {
      start: string
      end: string
    }
  }
  characters: string[]
  events: StoryEvent[]
  segments?: Array<{
    id: string
    title: string
    content: string
    timestamp: string
    metadata: {
      style: StoryStyle
      tone: StoryTone
      length: StoryLength
      characters: string[]
      themes: string[]
      mood: string
    }
  }>
}

/**
 * Configuration for the story generator.
 * Controls the high-level aspects of story generation.
 */
export interface StoryGeneratorConfig {
  style: StoryStyle
  persona: string
  tone: string
  length: 'short' | 'medium' | 'long'
}

/**
 * Interface for story generator implementations.
 * Defines the contract for generating stories from repository events.
 */
export interface StoryGenerator {
  generateStory(events: StoryEvent[], settings: StorySettings): Promise<Story>
}

/**
 * Represents a developer persona used in story narration.
 * Helps personalize and contextualize the narrative.
 * 
 * @example
 * ```ts
 * const persona: StoryPersona = {
 *   type: 'architect',
 *   confidence: 0.9,
 *   traits: ['innovative', 'detail-oriented', 'systematic']
 * }
 * ```
 */
export interface StoryPersona {
  type: 'architect' | 'problem-solver' | 'innovator' | 'maintainer' | 'collaborator'
  confidence: number
  traits: string[]
}

/**
 * Represents a developer's characteristics and traits.
 * Used for personalizing story narratives.
 */
export interface DeveloperPersona {
  type: 'architect' | 'problem-solver' | 'innovator' | 'maintainer' | 'collaborator'
  confidence: number
  traits: string[]
} 