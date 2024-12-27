'use client'

import { useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tooltip } from '@/components/ui/tooltip'
import type { CommitPattern } from '@/lib/story/types'

interface CommitTimelineProps {
  patterns: CommitPattern[]
  width?: number
  height?: number
}

function getPatternColor(type: string): { bg: string; text: string } {
  const colors = {
    feature: { bg: 'bg-blue-500/90', text: 'text-blue-500' },
    bugfix: { bg: 'bg-red-500/90', text: 'text-red-500' },
    refactor: { bg: 'bg-purple-500/90', text: 'text-purple-500' },
    docs: { bg: 'bg-green-500/90', text: 'text-green-500' },
    test: { bg: 'bg-yellow-500/90', text: 'text-yellow-500' },
    chore: { bg: 'bg-gray-500/90', text: 'text-gray-500' },
    style: { bg: 'bg-pink-500/90', text: 'text-pink-500' },
    perf: { bg: 'bg-orange-500/90', text: 'text-orange-500' },
    revert: { bg: 'bg-red-700/90', text: 'text-red-700' },
    merge: { bg: 'bg-blue-700/90', text: 'text-blue-700' },
    release: { bg: 'bg-green-700/90', text: 'text-green-700' }
  }
  return colors[type as keyof typeof colors] || { bg: 'bg-gray-500/90', text: 'text-gray-500' }
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function CommitTimeline({ patterns, width = 800, height = 60 }: CommitTimelineProps) {
  const timelineData = useMemo(() => {
    if (patterns.length === 0) return { segments: [], start: 0, end: 0, duration: 0 }

    const start = Math.min(...patterns.map(p => new Date(p.startDate).getTime()))
    const end = Math.max(...patterns.map(p => new Date(p.endDate).getTime()))
    const duration = end - start

    const segments = patterns.map(pattern => {
      const patternStart = new Date(pattern.startDate).getTime()
      const patternEnd = new Date(pattern.endDate).getTime()
      return {
        type: pattern.type,
        x: ((patternStart - start) / duration) * width,
        width: Math.max(((patternEnd - patternStart) / duration) * width, 4),
        commits: pattern.commits.length,
        significance: pattern.significance,
        startDate: pattern.startDate,
        endDate: pattern.endDate
      }
    })

    return { segments, start, end, duration }
  }, [patterns, width])

  const patternCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    patterns.forEach(p => {
      counts[p.type] = (counts[p.type] || 0) + p.commits.length
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
  }, [patterns])

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Development Timeline</h3>
        <div className="flex gap-2">
          {patternCounts.map(([type, count]) => (
            <Badge 
              key={type} 
              variant="secondary" 
              className={`text-xs ${getPatternColor(type).text}`}
            >
              {type}: {count}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="relative" style={{ height }}>
        {/* Background grid */}
        <div 
          className="absolute inset-0 border-l border-r border-dashed border-muted-foreground/20"
          style={{ backgroundSize: `${width / 12}px ${height}px` }}
        />
        
        {/* Pattern segments */}
        <svg width={width} height={height}>
          {timelineData.segments.map((segment, i) => (
            <Tooltip
              key={i}
              content={
                <div className="space-y-1 text-xs">
                  <div className="font-medium">{segment.type}</div>
                  <div>{segment.commits} commits</div>
                  <div className="text-muted-foreground">
                    {formatDate(segment.startDate)} → {formatDate(segment.endDate)}
                  </div>
                </div>
              }
            >
              <g className="group cursor-pointer">
                <rect
                  x={segment.x}
                  y={height / 4}
                  width={segment.width}
                  height={height / 2}
                  className={`${getPatternColor(segment.type).bg} transition-all duration-200 group-hover:opacity-100`}
                  style={{ opacity: 0.3 + segment.significance * 0.7 }}
                  rx={2}
                />
              </g>
            </Tooltip>
          ))}
        </svg>

        {/* Time markers */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
          <span>
            {timelineData.start ? formatDate(new Date(timelineData.start).toISOString()) : ''}
          </span>
          <span>
            {timelineData.end ? formatDate(new Date(timelineData.end).toISOString()) : ''}
          </span>
        </div>
      </div>
    </Card>
  )
} 