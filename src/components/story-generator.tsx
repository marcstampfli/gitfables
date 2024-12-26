/**
 * @module components/story-generator
 * @description Component for generating stories from commit data
 */

'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import type { Repository, Commit } from '@/lib/github-client'
import type { Story } from '@/lib/story'
import { useVCS } from '@/hooks/use-vcs'
import { useToast } from '@/hooks/use-toast'

interface StoryGeneratorProps {
  repo: Repository
  onStoryGenerated: (story: Story) => void
}

export function StoryGenerator({ repo, onStoryGenerated }: StoryGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [commits, setCommits] = useState<Commit[]>([])
  const [isLoadingCommits, setIsLoadingCommits] = useState(false)
  const { fetchCommits } = useVCS()
  const { addToast } = useToast()

  useEffect(() => {
    async function loadCommits() {
      setIsLoadingCommits(true)
      try {
        const repoCommits = await fetchCommits(repo)
        setCommits(repoCommits)
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Error',
          message: 'Failed to load commits',
        })
      } finally {
        setIsLoadingCommits(false)
      }
    }
    loadCommits()
  }, [repo, fetchCommits, addToast])

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      // TODO: Implement actual story generation
      const story: Story = {
        id: '1',
        title: `Story from ${repo.name}`,
        content: `Generated from ${commits.length} commits...`,
        createdAt: new Date().toISOString(),
      }
      onStoryGenerated(story)
    } catch (error) {
      console.error('Failed to generate story:', error)
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to generate story',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Generate Story</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Generate a story from {repo.full_name}
        </p>
        {isLoadingCommits ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading commits...</span>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            {commits.length} commits loaded
          </p>
        )}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || isLoadingCommits}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Story'
          )}
        </Button>
      </div>
    </Card>
  )
} 