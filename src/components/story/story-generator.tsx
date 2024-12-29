/**
 * @module components/story/story-generator
 * @description Story generator component for creating stories from repositories
 */

'use client'

import { useState, useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { type Repository } from '@/types/vcs'
import { type Story } from '@/types/story'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { logError } from '@/lib/utils/logger'
import { useRouter } from 'next/navigation'

/**
 * Props for the StoryGenerator component
 * @interface
 */
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
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onStoryGenerated - Callback function called with the generated story
 * @returns {JSX.Element} A card component with repository selection and story generation UI
 */
export function StoryGenerator({ onStoryGenerated }: StoryGeneratorProps) {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    async function loadRepositories() {
      setIsLoading(true)
      try {
        const response = await fetch('/api/repositories')
        if (!response.ok) {
          if (response.status === 401) {
            // Don't redirect, just set repositories to empty array
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
  }, [toast, router])

  const generateStory = async () => {
    if (!selectedRepo) {
      toast({
        title: 'Error',
        description: 'Please select a repository first',
        variant: 'destructive',
      })
      return
    }

    try {
      setIsGenerating(true)

      const response = await fetch('/api/story/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repository: {
            id: selectedRepo.id,
            name: selectedRepo.name,
            full_name: selectedRepo.full_name,
            html_url: selectedRepo.html_url,
            description: selectedRepo.description,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate story')
      }

      const story = await response.json()
      onStoryGenerated(story)

      toast({
        title: 'Success',
        description: 'Your story has been generated',
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error generating story'
      logError(errorMessage, {
        context: 'StoryGenerator:generateStory',
        metadata: { repositoryId: selectedRepo?.id }
      })
      toast({
        title: 'Error',
        description: 'Failed to generate story',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">Loading repositories...</p>
      </Card>
    )
  }

  if (repositories.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground">
            No repositories found. Connect your GitHub account to get started.
          </p>
          <Button
            variant="outline"
            onClick={() => router.push('/login')}
          >
            Connect GitHub Account
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Generate a Story</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Select a repository to generate a story from its commit history
          </p>
        </div>

        <Select
          value={selectedRepo?.full_name}
          onValueChange={(value) => {
            const repo = repositories.find((r) => r.full_name === value)
            setSelectedRepo(repo || null)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a repository" />
          </SelectTrigger>
          <SelectContent>
            {repositories.map((repo) => (
              <SelectItem key={repo.id} value={repo.full_name}>
                {repo.full_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={generateStory}
          disabled={isGenerating || !selectedRepo}
          className="w-full"
        >
          {isGenerating ? 'Generating...' : 'Generate Story'}
        </Button>
      </div>
    </Card>
  )
} 