/**
 * @module StoryList
 * @description A component that displays a list of generated stories in a card format.
 * Handles both database stories and in-memory stories.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <StoryList stories={stories} />
 * ```
 */

'use client'

import { Card } from '@/components/ui/card'
import { type Story } from '@/lib/story'

/**
 * Database story structure
 * @interface
 */
export interface DatabaseStory {
  /** Unique identifier for the story */
  id: string
  /** Title of the story */
  title: string
  /** Content/body of the story */
  content: string
  /** Creation timestamp */
  created_at: string
}

/**
 * Props for the StoryList component
 * @interface
 */
interface StoryListProps {
  /** Array of stories to display, can be either database stories or in-memory stories */
  stories: (Story | DatabaseStory)[]
}

/**
 * StoryList Component
 * 
 * @component
 * @description Renders a list of stories in card format, displaying title, creation date,
 * and content. Shows a placeholder message when no stories are available.
 * 
 * @param {Object} props - Component props
 * @param {Array<Story|DatabaseStory>} props.stories - Array of stories to display
 * @returns {JSX.Element} A list of story cards or a placeholder message
 */
export function StoryList({ stories }: StoryListProps) {
  if (stories.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">
          No stories found. Generate your first story to get started!
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {stories.map((story) => (
        <Card key={story.id} className="p-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{story.title}</h3>
            <p className="text-sm text-muted-foreground">
              Generated on {new Date('created_at' in story ? story.created_at : story.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm">{story.content}</p>
          </div>
        </Card>
      ))}
    </div>
  )
} 