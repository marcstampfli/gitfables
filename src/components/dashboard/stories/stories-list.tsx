/**
 * @module components/dashboard/stories/stories-list
 * @description List of stories with actions
 */

'use client'

import * as React from 'react'
import { useStories } from '@/hooks/story/use-stories'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Pencil, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ShareDialog } from '@/components/dashboard/stories/share-dialog'
import { ExportDialog } from '@/components/dashboard/stories/export-dialog'
import { BatchExportDialog } from '@/components/dashboard/stories/batch-export-dialog'

export function StoriesList() {
  const { stories, loading, deleteStory } = useStories()

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!stories.length) {
    return (
      <Card className="p-8 text-center">
        <h2 className="text-lg font-semibold">No Stories Yet</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Create your first story to get started.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <BatchExportDialog stories={stories} />
      </div>
      
      {stories.map(story => (
        <Card key={story.id} className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{story.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Created {formatDistanceToNow(new Date(story.created_at), { addSuffix: true })}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <ShareDialog story={story} />
              <ExportDialog story={story} />
              <Button variant="outline" size="sm" asChild>
                <a href={`/dashboard/stories/${story.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteStory(story.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
} 