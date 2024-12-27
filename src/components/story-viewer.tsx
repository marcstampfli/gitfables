/**
 * @module StoryViewer
 * @description A component that displays a story with its metadata and content.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <StoryViewer story={story} />
 * ```
 */

'use client'

import { type Story } from '@/lib/story'
import { Card } from '@/components/ui/card'
import { ShareMenu } from '@/components/share-menu'

/**
 * Props for the StoryViewer component
 * @interface
 */
interface StoryViewerProps {
  /** The story object to be displayed */
  story: Story
}

/**
 * StoryViewer Component
 * 
 * @component
 * @description Renders a story with its content, sharing options, and export functionality.
 * 
 * @param {Object} props - Component props
 * @param {Story} props.story - The story object to be displayed
 * @returns {JSX.Element} A card component containing the story content
 */
export function StoryViewer({ story }: StoryViewerProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">{story.title}</h2>
          <p className="text-muted-foreground mt-2">{story.description}</p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          {story.content}
        </div>

        <div className="pt-4 border-t">
          <ShareMenu _url={story.repository.url} />
        </div>
      </div>
    </Card>
  )
} 