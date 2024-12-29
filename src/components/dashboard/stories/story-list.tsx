/**
 * @module components/dashboard/stories/story-list
 * @description List component for displaying stories in the dashboard
 */

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { BookOpen } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Story } from '@/types/dashboard'

interface StoryListProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  stories: Story[]
}

export function StoryList({
  title,
  stories,
  className,
  ...props
}: StoryListProps) {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      <h2 className="text-xl font-semibold">{title}</h2>
      {stories.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No stories yet"
          description="Create your first story by selecting a repository and commit."
          action={{
            label: "Create Story",
            href: "/dashboard/stories/new"
          }}
        />
      ) : (
        <div className="grid gap-4">
          {stories.map((story) => (
            <Card key={story.id} className="p-6">
              <div className="space-y-2">
                <h3 className="font-semibold">{story.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {story.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>
                    Created {formatDistanceToNow(new Date(story.createdAt))} ago
                  </span>
                  {story.repository && (
                    <>
                      <span>•</span>
                      <span>{story.repository.name}</span>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 