/**
 * @module RepositoryCard
 * @description A component that displays GitHub repository information in a card format.
 * Shows repository name, description, statistics, and languages used.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <RepositoryCard repository={repository} />
 * 
 * // With click handler
 * <RepositoryCard 
 *   repository={repository} 
 *   onClick={handleRepositoryClick} 
 * />
 * ```
 */

'use client'

import { type Repository } from '@/lib/github-client'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatNumber } from '@/lib/utils'

/**
 * Props for the RepositoryCard component
 * @interface
 */
interface RepositoryCardProps {
  /** The repository object containing repository information */
  repository: Repository
  /** Optional click handler for the card */
  onClick?: () => void
}

/**
 * RepositoryCard Component
 * 
 * @component
 * @description Displays a GitHub repository's information in a card format.
 * Shows the repository name, description, fork count, default branch,
 * and programming languages used.
 * 
 * @param {Object} props - Component props
 * @param {Repository} props.repository - The repository object containing repository information
 * @param {Function} [props.onClick] - Optional click handler for the card
 * @returns {JSX.Element} A card component displaying repository information
 */
export function RepositoryCard({ repository, onClick }: RepositoryCardProps) {
  return (
    <Card
      className="p-6 cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={onClick}
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{repository.name}</h3>
          {repository.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {repository.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="none"
              className="w-4 h-4"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 5.5l.5-.5 5 5-.5.5-5-5z" />
              <path d="M10 5.5l-.5-.5-5 5 .5.5 5-5z" />
            </svg>
            <span>{formatNumber(repository.forks)}</span>
          </div>

          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="none"
              className="w-4 h-4"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M8 3.5v9M3.5 8h9" />
            </svg>
            <span>{repository.defaultBranch}</span>
          </div>
        </div>

        {repository.languages && Object.keys(repository.languages).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {Object.keys(repository.languages).map((lang) => (
              <Badge key={lang} variant="secondary">
                {lang}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
} 