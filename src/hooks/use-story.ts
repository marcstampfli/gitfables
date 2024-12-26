/**
 * @module hooks/use-story
 * @description React hook for managing story generation
 */

import { useState, useCallback, useEffect } from 'react'
import type { 
  Story,
  StorySettings,
  StoryEvent,
  StorySegment
} from '@/types'
import { useVCS } from './use-vcs'

interface StoryState {
  story: Story | null
  isGenerating: boolean
  progress: number
  error: Error | null
}

interface StoryHookResult {
  story: Story | null
  isGenerating: boolean
  progress: number
  error: Error | null
  generate: (settings: StorySettings) => Promise<void>
  cancel: () => void
  reset: () => void
}

/**
 * Hook for managing story generation
 * 
 * @returns {StoryHookResult} Hook result with story operations
 * 
 * @example
 * ```tsx
 * const { 
 *   story,
 *   isGenerating,
 *   progress,
 *   generate 
 * } = useStory()
 * 
 * // Generate a story
 * await generate({
 *   includeTimeContext: true,
 *   includeLanguageContext: true,
 *   includeLineChanges: true,
 *   style: 'narrative',
 *   tone: 'professional',
 *   length: 'standard'
 * })
 * ```
 */
export function useStory(): StoryHookResult {
  const { fetchCommits } = useVCS()
  const [state, setState] = useState<StoryState>({
    story: null,
    isGenerating: false,
    progress: 0,
    error: null,
  })

  const generate = useCallback(async (settings: StorySettings) => {
    setState(prev => ({ 
      ...prev, 
      isGenerating: true, 
      progress: 0,
      error: null 
    }))

    try {
      // Fetch commits
      const commits = await fetchCommits({
        owner: 'owner',
        repo: 'repo',
      })

      // Generate story segments
      const segments: StorySegment[] = []
      for (const commit of commits) {
        // Generate story segment
        const segment: StorySegment = {
          id: commit.id,
          title: 'Story Title',
          content: 'Story content...',
          timestamp: commit.date,
          commitData: commit,
          metadata: {
            style: settings.style,
            tone: settings.tone,
            length: settings.length,
            characters: [],
            themes: [],
            mood: 'neutral'
          }
        }
        segments.push(segment)

        // Update progress
        setState(prev => ({
          ...prev,
          progress: (segments.length / commits.length) * 100
        }))
      }

      // Create story
      const story: Story = {
        id: 'story-id',
        title: 'Story Title',
        segments,
        repository: {
          name: 'repo',
          owner: 'owner',
          url: 'url'
        },
        metadata: {
          generatedAt: new Date().toISOString(),
          settings,
          totalCommits: commits.length,
          timespan: {
            start: commits[commits.length - 1].date,
            end: commits[0].date
          }
        }
      }

      setState(prev => ({
        ...prev,
        story,
        isGenerating: false,
        progress: 100,
        error: null
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isGenerating: false,
        progress: 0,
        error: error instanceof Error ? error : new Error('Unknown error')
      }))
    }
  }, [fetchCommits])

  const cancel = useCallback(() => {
    setState(prev => ({
      ...prev,
      isGenerating: false,
      progress: 0
    }))
  }, [])

  const reset = useCallback(() => {
    setState({
      story: null,
      isGenerating: false,
      progress: 0,
      error: null
    })
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancel()
    }
  }, [cancel])

  return {
    story: state.story,
    isGenerating: state.isGenerating,
    progress: state.progress,
    error: state.error,
    generate,
    cancel,
    reset
  }
} 