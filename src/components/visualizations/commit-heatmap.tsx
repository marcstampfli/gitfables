'use client'

import * as React from 'react'
import { format } from 'date-fns'
import type { Commit } from '@/types/vcs'

interface CommitHeatmapProps {
  commits: Commit[]
  className?: string
}

export function CommitHeatmap({ commits, className }: CommitHeatmapProps) {
  // Group commits by date
  const commitsByDate = React.useMemo(() => {
    return commits.reduce<Record<string, number>>((acc, commit) => {
      const date = format(new Date(commit.author.date), 'yyyy-MM-dd')
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {})
  }, [commits])

  // Calculate max commits for color scaling
  const maxCommits = React.useMemo(() => {
    const values = Object.values(commitsByDate)
    return values.length ? Math.max(...values) : 0
  }, [commitsByDate])

  // Color scale function
  const getColor = React.useCallback((count: number) => {
    if (count === 0) return '#ebedf0'
    const intensity = Math.min(count / maxCommits, 1)
    return `rgba(14, 165, 233, ${intensity})`
  }, [maxCommits])

  return (
    <div className={className}>
      <div className="grid grid-cols-7 gap-1">
        {Object.entries(commitsByDate).map(([date, count]) => (
          <div
            key={date}
            className="aspect-square rounded"
            style={{
              backgroundColor: getColor(count),
              cursor: 'pointer',
            }}
            title={`${count} commits on ${format(new Date(date), 'MMM d, yyyy')}`}
          />
        ))}
      </div>
    </div>
  )
} 