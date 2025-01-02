/**
 * @module components/dashboard/activity-feed
 * @description Activity feed component for displaying recent user actions
 */

import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { GitCommit, BookOpen, Share2, GitFork } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface ActivityItem {
  id: string
  type: 'story_created' | 'story_published' | 'repository_connected' | 'story_shared'
  title: string
  timestamp: string
  metadata?: Record<string, any>
}

interface ActivityFeedProps {
  activities: ActivityItem[]
}

function getActivityIcon(type: ActivityItem['type']) {
  switch (type) {
    case 'story_created':
      return <BookOpen className="h-4 w-4" />
    case 'story_published':
      return <Share2 className="h-4 w-4" />
    case 'repository_connected':
      return <GitFork className="h-4 w-4" />
    case 'story_shared':
      return <Share2 className="h-4 w-4" />
    default:
      return <GitCommit className="h-4 w-4" />
  }
}

function getActivityMessage(activity: ActivityItem) {
  switch (activity.type) {
    case 'story_created':
      return `Created story "${activity.title}"`
    case 'story_published':
      return `Published story "${activity.title}"`
    case 'repository_connected':
      return `Connected repository "${activity.title}"`
    case 'story_shared':
      return `Shared story "${activity.title}"`
    default:
      return activity.title
  }
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  if (!activities?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px] text-center p-4">
        <GitCommit className="h-8 w-8 text-muted-foreground/50 mb-2" />
        <p className="text-sm text-muted-foreground">No recent activity</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-1">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-3 px-2 py-2 hover:bg-muted/50 rounded-md group transition-colors"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
              {getActivityIcon(activity.type)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm truncate">
                {getActivityMessage(activity)}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
} 