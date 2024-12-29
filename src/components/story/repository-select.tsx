/**
 * @module components/story/repository-select
 * @description Repository selection component for story generation
 */

'use client'

import { type Repository } from '@/types/vcs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface RepositorySelectProps {
  repositories: Repository[]
  selectedRepo: Repository | null
  onSelectRepo: (repo: Repository | null) => void
  isLoading?: boolean
}

export function RepositorySelect({ 
  repositories, 
  selectedRepo, 
  onSelectRepo,
  isLoading 
}: RepositorySelectProps) {
  const router = useRouter()

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
          onSelectRepo(repo || null)
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
    </div>
  )
} 