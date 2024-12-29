/**
 * @module components/story/story-generator
 * @description Story generator component for creating stories from repositories
 */

'use client'

import { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { type Repository } from '@/types/vcs'
import { type Story } from '@/types/stories'
import { logError } from '@/lib/utils/logger'
import { RepositorySelect } from './repository-select'

interface StoryGeneratorProps {
  /** Callback function called when a story is successfully generated */
  onStoryGenerated: (story: Story) => void
}

/**
 * StoryGenerator Component
 * 
 * @component
 * @description A component that allows users to select a GitHub repository and generate
 * a story from its commit history. Handles repository loading, selection, and story generation.
 */
export function StoryGenerator({ onStoryGenerated }: StoryGeneratorProps) {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function loadRepositories() {
      setIsLoading(true)
      try {
        const response = await fetch('/api/repositories')
        if (!response.ok) {
          if (response.status === 401) {
            setRepositories([])
            return
          }
          throw new Error(`Failed to fetch repositories: ${response.statusText}`)
        }
        const data = await response.json()
        setRepositories(data)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error loading repositories'
        logError(errorMessage, {
          context: 'StoryGenerator:loadRepositories'
        })
        toast({
          title: 'Error',
          description: 'Failed to load repositories. Please try again.',
          variant: 'destructive',
        })
        setRepositories([])
      } finally {
        setIsLoading(false)
      }
    }

    loadRepositories()
  }, [toast])

  async function handleGenerateStory() {
    if (!selectedRepo) return

    setIsGenerating(true)
    try {
      const response = await fetch('/api/story/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repository_url: selectedRepo.url,
          commit_hash: selectedRepo.default_branch
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate story')
      }

      const story = await response.json()
      onStoryGenerated(story)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error generating story'
      logError(errorMessage, {
        context: 'StoryGenerator:generateStory',
        metadata: { repositoryId: selectedRepo.id }
      })
      toast({
        title: 'Error',
        description: 'Failed to generate story. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <RepositorySelect
        repositories={repositories}
        selectedRepo={selectedRepo}
        onSelectRepo={setSelectedRepo}
        isLoading={isLoading}
      />

      {selectedRepo && (
        <Button
          className="w-full"
          onClick={handleGenerateStory}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating Story...' : 'Generate Story'}
        </Button>
      )}
    </div>
  )
} 