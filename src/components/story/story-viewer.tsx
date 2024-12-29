/**
 * @module components/story/story-viewer
 * @description Story viewer component with export functionality
 */

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { ShareDialog } from '@/components/ui/share-dialog'
import { toast } from '@/components/ui/use-toast'
import { logError } from '@/lib/utils/logger'
import type { Story } from '@/types'

interface StoryViewerProps {
  story: Story
  showActions?: boolean
  onEdit?: () => void
}

export function StoryViewer({ 
  story, 
  showActions = true,
  onEdit 
}: StoryViewerProps) {
  const [exporting, setExporting] = useState(false)

  async function handleExport() {
    try {
      setExporting(true)
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
        context: 'StoryViewer:exportStory',
        metadata: { storyId: story.id }
      })
      toast({
        title: 'Error',
        description: 'Failed to export story',
        variant: 'destructive',
      })
    } finally {
      setExporting(false)
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{story.title}</h2>
          {story.description && (
            <p className="mt-2 text-muted-foreground">{story.description}</p>
          )}
        </div>

        {showActions && (
          <div className="flex items-center space-x-2">
            <ShareDialog 
              title="Share Story"
              url={`/s/${story.id}`}
              showAdvancedOptions
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={handleExport}
              disabled={exporting}
            >
              {exporting ? (
                <Icons.spinner className="h-4 w-4 animate-spin" />
              ) : (
                <Icons.post className="h-4 w-4" />
              )}
              <span className="sr-only">Export</span>
            </Button>

            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onEdit}
              >
                <Icons.settings className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="prose prose-gray dark:prose-invert mt-6 max-w-none">
        {story.content}
      </div>
    </Card>
  )
} 