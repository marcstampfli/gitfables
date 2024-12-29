'use client'

import { type Commit } from '@/lib/github-client'

interface CommitHeatmapProps {
  commits: Commit[]
  width?: number
  height?: number
}

export function CommitHeatmap({
  commits,
  width = 340,
  height = 100,
}: CommitHeatmapProps) {
  const commitsByDate = commits.reduce((acc, commit) => {
    const date = new Date(commit.commit.author.date).toISOString().split('T')[0]
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const maxCommits = Math.max(...Object.values(commitsByDate))
  const minDate = new Date(Math.min(...commits.map(c => new Date(c.commit.author.date).getTime())))
  const maxDate = new Date(Math.max(...commits.map(c => new Date(c.commit.author.date).getTime())))

  const days = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24))
  const cellSize = Math.min(width / days, height)

  const getColor = (count: number) => {
    const intensity = count / maxCommits
    return `rgb(0, ${Math.round(intensity * 150)}, 0)`
  }

  return (
    <div className="relative">
      <svg width={width} height={height}>
        {Object.entries(commitsByDate).map(([date, count]) => {
          const x = (new Date(date).getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24) * cellSize
          return (
            <g key={date}>
              <rect
                x={x}
                y={0}
                width={cellSize * 0.9}
                height={height}
                fill={getColor(count)}
                rx={2}
              />
              <title>{`${count} commits on ${date}`}</title>
            </g>
          )
        })}
      </svg>
    </div>
  )
} 