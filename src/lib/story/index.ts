/**
 * @module lib/story/index
 * @description Story generator factory and implementation
 */

import type { Repository } from '@/types/vcs'
import type { Story, StoryEvent, StoryGenerator, StorySettings } from '@/types/stories'
import { generateStory } from './generator'

/**
 * Create a story generator instance
 * @returns {StoryGenerator} Story generator instance
 */
export function createStoryGenerator(): StoryGenerator {
  return {
    async generateStory(events: StoryEvent[], settings: StorySettings): Promise<Story> {
      const eventRepo = events[0]?.data.repository
      if (!eventRepo) {
        throw new Error('No repository data found in events')
      }

      // Create a Repository object with required fields
      const repository: Repository = {
        id: crypto.randomUUID(),
        name: eventRepo.name,
        full_name: `${eventRepo.owner}/${eventRepo.name}`,
        url: eventRepo.url,
        description: eventRepo.description || '',
        owner: eventRepo.owner,
        default_branch: 'main',
        languages: {},
        stargazers_count: 0,
        forks_count: 0,
        watchers_count: 0,
        size: 0,
        private: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
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
          url: `${eventRepo.url}/commit/${event.data.id}`
        })),
        style: settings.style,
        includeTimeContext: settings.includeTimeContext,
        includeLanguageContext: settings.includeLanguageContext,
        _includeLineChanges: settings.includeLineChanges
      })
    }
  }
} 