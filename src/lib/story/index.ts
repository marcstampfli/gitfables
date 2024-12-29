/**
 * @module lib/story
 * @description Story generation module exports and factory
 */

import type { Repository } from '@/types/vcs'
import type { StoryGenerator, StoryEvent, StorySettings } from '@/types/story'
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
      const eventRepo = events[0]?.data.repository
      if (!eventRepo) {
        throw new Error('No repository data found in events')
      }

      // Create a Repository object with required fields
      const repository: Repository = {
        id: 0, // Default ID since we don't have it in the event
        name: eventRepo.name,
        full_name: `${eventRepo.owner}/${eventRepo.name}`,
        html_url: eventRepo.html_url,
        description: eventRepo.description,
        language: null,
        languages_url: `${eventRepo.url}/languages`,
        owner: eventRepo.owner,
        stargazers_count: 0,
        forks_count: 0,
        languages: null,
        default_branch: 'main',
        watchers_count: 0,
        size: 0
      }

      return generateStory({
        repository,
        commits: events.map(event => ({
          sha: event.data.id,
          message: event.data.message,
          author: {
            name: event.data.author,
            email: '',
            date: event.timestamp
          },
          date: event.timestamp,
          url: ''
        })),
        style: settings.style,
        includeTimeContext: settings.includeTimeContext,
        includeLanguageContext: settings.includeLanguageContext,
        includeLineChanges: settings.includeLineChanges
      })
    }
  }
} 