/**
 * @module StoryViewerExport
 * @description A component that provides functionality to export a story to Markdown format.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <StoryViewerExport story={story} />
 * ```
 */

'use client'

import { type Story } from '@/lib/story'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { logError } from '@/lib/logger'
import { toast } from '@/components/ui/use-toast'

/**
 * Props for the StoryViewerExport component
 * @interface
 */
interface StoryViewerExportProps {
  /** The story object to be exported */
  story: Story
}

/**
 * StoryViewerExport Component
 * 
 * @component
 * @description Renders a card with export functionality that allows users to download
 * a story in Markdown format. Handles the export process through an API endpoint.
 * 
 * @param {Object} props - Component props
 * @param {Story} props.story - The story object to be exported
 * @returns {JSX.Element} A card component with export functionality
 */
export function StoryViewerExport({ story }: StoryViewerExportProps) {
  const handleExport = async () => {
    try {
      const response = await fetch('/api/story/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ story }),
      })

      if (!response.ok) {
        throw new Error('Failed to export story')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${story.title.toLowerCase().replace(/\s+/g, '-')}.md`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      logError(error instanceof Error ? error : new Error('Error exporting story'), {
        context: 'StoryViewerExport:exportStory',
        metadata: { storyId: story.id }
      })
      toast({
        title: 'Error',
        description: 'Failed to export story',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Export Story</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Download your story in Markdown format
          </p>
        </div>

        <Button onClick={handleExport} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Export Story
        </Button>
      </div>
    </Card>
  )
} 