/**
 * @module hooks/use-story
 * @description React hook for managing story generation
 */

import { useState } from 'react'
import { Story } from '@/lib/story'

export function useStory() {
  const [story, setStory] = useState<Story | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const generateStory = async (repositoryId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/story/generate?repositoryId=${repositoryId}`)
      if (!response.ok) {
        throw new Error('Failed to generate story')
      }
      const data = await response.json()
      setStory(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to generate story'))
    } finally {
      setIsLoading(false)
    }
  }

  return {
    story,
    isLoading,
    error,
    generateStory,
  }
} 