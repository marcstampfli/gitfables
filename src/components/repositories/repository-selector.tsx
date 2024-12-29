/**
 * @module RepositorySelector
 * @description A component that displays a searchable list of GitHub repositories and allows selection.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * import { logDebug } from '@/lib/utils/logger'
 * 
 * <RepositorySelector 
 *   onSelect={(repo) => {
 *     logDebug('Repository selected', { metadata: { repo } })
 *   }} 
 * />
 * ```
 */

'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { type Repository } from '@/types/vcs'
import { logError } from '@/lib/utils/logger'
import { formatNumber } from '@/lib/utils/formatting'
import { GitHubClient } from '@/lib/vcs/github-client'

/**
 * Props for the RepositoryCard component
 * @interface
 * @private
 */
interface RepositoryCardProps {
  /** The repository to display */
  repository: Repository
  /** Whether the repository is currently selected */
  isSelected?: boolean
  /** Callback function when repository is selected */
  onSelect: (repo: Repository) => void
}

/**
 * RepositoryCard Component
 * 
 * @component
 * @private
 * @description Displays individual repository information in a card format
 * 
 * @param {Object} props - Component props
 * @param {Repository} props.repository - The repository to display
 * @param {boolean} [props.isSelected] - Whether the repository is currently selected
 * @param {Function} props.onSelect - Callback function when repository is selected
 */
function RepositoryCard({ repository, isSelected, onSelect }: RepositoryCardProps) {
  return (
    <Card
      className={`p-4 cursor-pointer hover:bg-accent ${isSelected ? 'border-primary' : ''}`}
      onClick={() => onSelect(repository)}
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{repository.name}</h3>
        <p className="text-sm text-muted-foreground">
          {repository.description || 'No description available'}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{repository.languages ? Object.keys(repository.languages)[0] : 'Unknown'}</span>
          <span>⭐ {formatNumber(repository.stargazers_count)}</span>
          <span>🍴 {formatNumber(repository.forks_count)}</span>
        </div>
      </div>
    </Card>
  )
}

/**
 * Props for the RepositorySelector component
 * @interface
 */
interface RepositorySelectorProps {
  /** Callback function when a repository is selected */
  onSelect: (repo: Repository) => void
}

/**
 * RepositorySelector Component
 * 
 * @component
 * @description A component that fetches and displays a searchable list of GitHub repositories.
 * Provides search functionality and selection capability.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSelect - Callback function when a repository is selected
 * @returns {JSX.Element} A searchable list of repository cards
 */
export function RepositorySelector({ onSelect }: RepositorySelectorProps) {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)
  const [_error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadRepositories() {
      try {
        const response = await fetch('/api/repos')
        if (!response.ok) throw new Error('Failed to fetch repositories')
        const data = await response.json()
        setRepositories(data)
      } catch (error) {
        logError(error instanceof Error ? error : new Error('Error loading repositories'), {
          context: 'RepositorySelector:loadRepositories'
        })
        setError('Failed to load repositories')
      } finally {
        setIsLoading(false)
      }
    }

    loadRepositories()
  }, [])

  const handleSelect = (repo: Repository) => {
    setSelectedRepo(repo)
    onSelect(repo)
  }

  const filteredRepos = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
        <p className="text-center text-muted-foreground">
          No repositories found. Connect your GitHub account to get started.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search repositories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="space-y-2">
        {filteredRepos.map((repo) => (
          <RepositoryCard
            key={repo.id}
            repository={repo}
            isSelected={selectedRepo?.id === repo.id}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  )
} 