/**
 * @module DashboardContent
 * @description A component that composes the main dashboard view with statistics
 * and repository list sections.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <DashboardContent repositories={repositories} />
 * ```
 */

'use client'

import { StatsSection } from './stats-section'
import { RepositoryList } from './repository-list'
import { type Repository } from '@/lib/github-client'

/**
 * Props for the DashboardContent component
 * @interface
 */
interface DashboardContentProps {
  /** Array of repositories to display in stats and list */
  repositories: Repository[]
}

/**
 * DashboardContent Component
 * 
 * @component
 * @description Renders the main dashboard content, combining repository statistics
 * and a list of repositories in a vertically stacked layout.
 * 
 * @param {Object} props - Component props
 * @param {Repository[]} props.repositories - Array of repositories to display
 * @returns {JSX.Element} A container with stats and repository list sections
 */
export function DashboardContent({ repositories }: DashboardContentProps) {
  return (
    <div className="space-y-8">
      <StatsSection repositories={repositories} />
      <RepositoryList repositories={repositories} />
    </div>
  )
} 