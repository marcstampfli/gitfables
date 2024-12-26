'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GitBranch, Loader2 } from 'lucide-react'
import type { Repository } from '@/lib/github-client'

interface RepositorySelectorProps {
  onSelect: (repo: Repository) => void
}

export function RepositorySelector({ onSelect }: RepositorySelectorProps) {
  const [repos, setRepos] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch('/api/repos')
        if (!response.ok) throw new Error('Failed to fetch repositories')
        const data = await response.json()
        setRepos(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load repositories')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepos()
  }, [])

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading repositories...</span>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-red-500 dark:text-red-400">
          Error: {error}
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Select Repository</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <Button
              key={repo.id}
              variant="outline"
              className="justify-start"
              onClick={() => onSelect(repo)}
            >
              <GitBranch className="mr-2 h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">{repo.name}</div>
                {repo.description && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {repo.description}
                  </div>
                )}
              </div>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  )
} 