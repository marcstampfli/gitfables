/**
 * @module RepositorySelector
 * @description A component that displays a searchable list of GitHub repositories and allows selection.
 */

'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GitBranch, GitFork, Star } from 'lucide-react'
import { type Repository } from '@/types/vcs'
import { formatNumber, formatDate } from '@/lib/utils/formatting'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils/styles'

interface RepositoryCardProps {
  repository: Repository
  isSelected?: boolean
  onSelect: (repo: Repository) => void
}

function RepositoryCard({ repository, isSelected, onSelect }: RepositoryCardProps) {
  const primaryLanguage = repository.languages ? Object.keys(repository.languages)[0] : null
  const updatedAt = formatDate(repository.updated_at)

  return (
    <Card
      className={cn(
        "p-6 cursor-pointer transition-all hover:shadow-md",
        isSelected ? "border-2 border-primary bg-primary/5" : "hover:border-primary/50"
      )}
      onClick={() => onSelect(repository)}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{repository.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {repository.description || 'No description available'}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0">
            <GitFork className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4 text-sm">
          {primaryLanguage && (
            <Badge variant="secondary" className="font-normal">
              {primaryLanguage}
            </Badge>
          )}
          <div className="flex items-center gap-1 text-muted-foreground">
            <Star className="h-4 w-4" />
            {formatNumber(repository.stargazers_count)}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <GitBranch className="h-4 w-4" />
            {repository.default_branch}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Updated {updatedAt}</span>
          {repository.private && (
            <Badge variant="outline" className="font-normal">
              Private
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}

interface RepositorySelectorProps {
  repositories: Repository[]
  onSelect: (repo: Repository) => void
}

export function RepositorySelector({ repositories, onSelect }: RepositorySelectorProps) {
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)

  const handleSelect = (repo: Repository) => {
    setSelectedRepo(repo)
    onSelect(repo)
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {repositories.map((repo) => (
        <RepositoryCard
          key={repo.id}
          repository={repo}
          isSelected={selectedRepo?.id === repo.id}
          onSelect={handleSelect}
        />
      ))}
    </div>
  )
} 