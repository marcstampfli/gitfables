/**
 * @module components/story-viewer
 * @description Component for displaying generated stories with interactive features
 */

'use client'

import { Card } from '@/components/ui/card'
import type { Story } from '@/lib/story'

interface StoryViewerProps {
  story: Story
}

export function StoryViewer({ story }: StoryViewerProps) {
  return (
    <Card className="p-6">
      <article className="prose dark:prose-invert lg:prose-lg">
        <h1>{story.title}</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Generated on {new Date(story.createdAt).toLocaleDateString()}
        </div>
        <div className="mt-4">
          {story.content}
        </div>
      </article>
    </Card>
  )
} 