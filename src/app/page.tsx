/**
 * @module app/page
 * @description Main page component for story generation and viewing
 */

'use client'

import { useState, useCallback } from 'react'
import { useVCS } from '@/hooks/use-vcs'
import { useToast } from '@/hooks/use-toast'
import { StoryGenerator } from '@/components/story-generator'
import { StoryViewer } from '@/components/story-viewer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Github, GitBranch, Loader2 } from 'lucide-react'
import type { Story } from '@/lib/story'
import { RepositorySelector } from '@/components/repository-selector'
import type { Repository } from '@/lib/github-client'

export default function HomePage() {
  const [story, setStory] = useState<Story | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToast()
  const {
    platform,
    isLoading: isVCSLoading,
    error: vcsError,
    connect,
    fetchCommits,
  } = useVCS()
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)

  const handleConnect = useCallback(async () => {
    setIsLoading(true)
    try {
      await connect('github')
      addToast({
        type: 'success',
        title: 'Connected',
        message: 'Successfully connected to GitHub',
      })
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Connection Failed',
        message: error instanceof Error ? error.message : 'Failed to connect',
      })
    } finally {
      setIsLoading(false)
    }
  }, [connect, addToast])

  const handleStoryGenerated = useCallback((newStory: Story) => {
    setStory(newStory)
    addToast({
      type: 'success',
      title: 'Story Generated',
      message: 'Your developer story has been generated',
    })
  }, [addToast])

  const handleRepoSelect = useCallback((repo: Repository) => {
    setSelectedRepo(repo)
    addToast({
      type: 'success',
      title: 'Repository Selected',
      message: `Selected repository: ${repo.name}`,
    })
  }, [addToast])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">RepoTales</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Turn your commit history into an engaging story
          </p>
        </div>

        {/* Connection Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">
                {platform ? 'Connected to GitHub' : 'Connect to GitHub'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {platform
                  ? 'Ready to generate stories from your repositories'
                  : 'Connect to GitHub to get started'}
              </p>
            </div>
            <Button
              variant={platform ? 'outline' : 'default'}
              size="lg"
              disabled={isLoading || isVCSLoading}
              onClick={handleConnect}
            >
              {isLoading || isVCSLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Github className="mr-2 h-4 w-4" />
              )}
              {platform ? 'Connected' : 'Connect'}
            </Button>
          </div>
          {vcsError && (
            <p className="mt-2 text-sm text-red-500 dark:text-red-400">
              {vcsError.message}
            </p>
          )}
        </Card>

        {/* Repository Selection */}
        {platform && !story && !selectedRepo && (
          <RepositorySelector onSelect={handleRepoSelect} />
        )}

        {/* Story Generation */}
        {platform && !story && selectedRepo && (
          <StoryGenerator
            repo={selectedRepo}
            onStoryGenerated={handleStoryGenerated}
          />
        )}

        {/* Story Viewer */}
        {story && (
          <>
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => setStory(null)}
              >
                Generate Another Story
              </Button>
            </div>
            <StoryViewer story={story} />
          </>
        )}
      </div>
    </main>
  )
} 