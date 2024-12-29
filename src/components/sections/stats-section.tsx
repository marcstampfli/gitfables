/**
 * @module StatsSection
 * @description A component that displays various statistics about GitHub repositories
 * in a grid of cards.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <StatsSection repositories={repositories} />
 * ```
 */

'use client'

import { type Repository } from '@/lib/vcs/github-client'
import { Card } from '@/components/ui/card'
import { formatNumber } from '@/lib/utils'

/**
 * Props for the StatsCard component
 * @interface
 * @private
 */
interface StatsCardProps {
  /** The title of the statistic */
  title: string
  /** The value to display */
  value: string | number
  /** Optional description or subtitle */
  description?: string
}

/**
 * StatsCard Component
 * 
 * @component
 * @private
 * @description Displays a single statistic in a card format with title, value, and optional description
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the statistic
 * @param {string|number} props.value - The value to display
 * @param {string} [props.description] - Optional description or subtitle
 */
function StatsCard({ title, value, description }: StatsCardProps) {
  return (
    <Card className="p-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </Card>
  )
}

/**
 * Props for the StatsSection component
 * @interface
 */
interface StatsSectionProps {
  /** Array of repositories to calculate statistics from */
  repositories: Repository[]
}

/**
 * StatsSection Component
 * 
 * @component
 * @description Displays a grid of statistics about GitHub repositories including total repos,
 * forks, watchers, languages used, and repository sizes.
 * 
 * @param {Object} props - Component props
 * @param {Repository[]} props.repositories - Array of repositories to calculate statistics from
 * @returns {JSX.Element} A grid of statistics cards
 */
export function StatsSection({ repositories }: StatsSectionProps) {
  const stats = {
    totalRepos: repositories?.length ?? 0,
    totalForks: repositories?.reduce((acc, repo) => acc + repo.forks_count, 0) ?? 0,
    totalWatchers: repositories?.reduce((acc, repo) => acc + repo.watchers_count, 0) ?? 0,
    languages: new Set(repositories?.flatMap(repo => repo.languages ? Object.keys(repo.languages) : [])),
    avgRepoSize: repositories?.length
      ? Math.round(repositories.reduce((acc, repo) => acc + repo.size, 0) / repositories.length / 1024)
      : 0,
    largestRepo: repositories?.reduce((largest, repo) => {
      const sizeMB = Math.round(repo.size / 1024)
      return sizeMB > largest.size ? { name: repo.name, size: sizeMB } : largest
    }, { name: '', size: 0 }),
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatsCard
        title="Total Repositories"
        value={formatNumber(stats.totalRepos)}
      />
      <StatsCard
        title="Total Forks"
        value={formatNumber(stats.totalForks)}
      />
      <StatsCard
        title="Total Watchers"
        value={formatNumber(stats.totalWatchers)}
      />
      <StatsCard
        title="Languages Used"
        value={formatNumber(stats.languages.size)}
      />
      <StatsCard
        title="Average Repository Size"
        value={`${formatNumber(stats.avgRepoSize)} MB`}
      />
      <StatsCard
        title="Largest Repository"
        value={`${formatNumber(stats.largestRepo.size)} MB`}
        description={stats.largestRepo.name}
      />
    </div>
  )
} 