/**
 * @module lib/story/generator
 * @description Story generator implementation for creating narratives from commit data
 */

import { type Repository, type Commit } from '@/types/vcs'
import { type StoryStyle } from '@/types/story'
import { type Story } from '@/types/stories'

interface GenerateStoryOptions {
  repository: Repository
  commits: Commit[]
  style?: StoryStyle
  includeTimeContext?: boolean
  includeLanguageContext?: boolean
  _includeLineChanges?: boolean
}

export async function generateStory({
  repository,
  commits,
  style = 'epic',
  includeTimeContext = true,
  includeLanguageContext = true,
  _includeLineChanges = true
}: GenerateStoryOptions): Promise<Story> {
  // Get time context if enabled
  const timeContext = includeTimeContext ? {
    firstCommit: commits[0]?.author?.date || new Date().toISOString(),
    lastCommit: commits[commits.length - 1]?.author?.date || new Date().toISOString()
  } : null

  // Get language context if enabled
  const languageContext = includeLanguageContext ? {
    languages: repository.languages
  } : null

  // Generate title based on style
  const title = style === 'epic' 
    ? `The Epic Tale of ${repository.name}`
    : style === 'technical'
      ? `Technical Journey: ${repository.name}`
      : `The Story of ${repository.name}`

  // Generate content using all available context
  const content = [
    `${title}\n\n`,
    `A ${style} story about ${repository.name}, a ${repository.private ? 'private' : 'public'} repository.\n\n`,
    timeContext ? `From ${new Date(timeContext.firstCommit).toLocaleDateString()} to ${new Date(timeContext.lastCommit).toLocaleDateString()}, ` : '',
    `brave developers made ${commits.length} contributions to this codebase.\n\n`,
    languageContext ? `The project primarily uses ${Object.keys(languageContext.languages).join(', ')}.\n\n` : '',
    `This is just the beginning of the story...`
  ].join('')

  return {
    id: crypto.randomUUID(),
    user_id: '', // This will be set by the API route
    title,
    content,
    repository_url: repository.url,
    commit_hash: commits[commits.length - 1]?.sha || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
} 