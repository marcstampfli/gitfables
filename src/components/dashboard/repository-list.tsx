/**
 * @module RepositoryList
 * @description A component that displays a list of GitHub repositories in a card format.
 * Shows repository details including name, description, language, and statistics.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <RepositoryList repositories={repositories} />
 * ```
 */

'use client'

import { type Repository } from '@/lib/github-client'
import { Card } from '@/components/ui/card'

/**
 * Props for the RepositoryList component
 * @interface
 */
interface RepositoryListProps {
  /** Array of GitHub repositories to display */
  repositories: Repository[]
}

/**
 * RepositoryList Component
 * 
 * @component
 * @description Renders a list of GitHub repositories in card format, displaying
 * repository name, description, primary language, and engagement metrics.
 * Shows a placeholder message when no repositories are available.
 * 
 * @param {Object} props - Component props
 * @param {Repository[]} props.repositories - Array of repositories to display
 * @returns {JSX.Element} A list of repository cards or a placeholder message
 */
export function RepositoryList({ repositories }: RepositoryListProps) {
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
      {repositories.map((repo) => (
        <Card key={repo.id} className="p-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{repo.name}</h3>
            <p className="text-sm text-muted-foreground">
              {repo.description || 'No description available'}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{repo.language}</span>
              <span>⭐ {repo.stars}</span>
              <span>🍴 {repo.forks}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
} 