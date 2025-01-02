/**
 * @module components/stories/story-list
 * @description List component for displaying stories
 */

import { Card } from '@/components/ui/card'
import { BookOpen } from 'lucide-react'

interface Story {
  id: string
  title: string
  description: string
  status: 'draft' | 'published'
  createdAt: string
}

interface StoryListProps {
  stories?: Story[]
  className?: string
}

export function StoryList({ stories = [], className }: StoryListProps) {
  if (!stories.length) {
    return (
      <Card className={className}>
        <div className="p-6">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
            <h3 className="font-semibold">No stories yet</h3>
            <p className="text-sm text-muted-foreground">
              Create your first story to get started
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Your Stories</h2>
        <div className="space-y-4">
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex items-start justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <h3 className="font-medium">{story.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {story.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className="capitalize">{story.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
} 