/**
 * @module lib/story
 * @description Story generation module exports and factory
 */

import type { Repository, StorySettings } from '@/types'
import type { StoryGenerator, StoryEvent } from '@/types/story'
import { generateStory } from './generator'

export * from '@/types/story'
export * from './generator'

/**
 * Create a story generator instance
 * 
 * @returns {StoryGenerator} Story generator instance
 */
export function createStoryGenerator(): StoryGenerator {
  return {
    async generateStory(events: StoryEvent[], settings: StorySettings) {
      return generateStory({
        repository: events[0]?.data.repository as Repository,
        commits: events.map(event => ({
          sha: event.data.id,
          commit: {
            author: {
              name: event.data.author,
              email: '',
              date: event.timestamp
            },
            message: event.data.message
          },
          author: null
        })),
        style: settings.style,
        includeTimeContext: settings.includeTimeContext,
        includeLanguageContext: settings.includeLanguageContext,
        includeLineChanges: settings.includeLineChanges
      })
    }
  }
} 