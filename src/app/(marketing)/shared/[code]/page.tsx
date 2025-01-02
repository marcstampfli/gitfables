/**
 * @module app/(marketing)/shared/[code]/page
 * @description Public shared story page that displays a story shared via a unique code
 */

'use client'

import { useEffect, useState } from 'react'
import { useSharedStories } from '@/hooks/story/use-shared-stories'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Eye, Calendar, Share2, Home } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { SharedStory } from '@/types/stories'

interface PageProps {
  params: {
    code: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function SharedStoryPage({ params }: PageProps) {
  const { getSharedStory } = useSharedStories()
  const [loading, setLoading] = useState(true)
  const [story, setStory] = useState<SharedStory | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStory() {
      try {
        const data = await getSharedStory(params.code)
        if (!data) {
          setError('Story not found')
          return
        }

        // Check if story has expired
        if (data.expires_at && new Date(data.expires_at) < new Date()) {
          setError('This shared story has expired')
          return
        }

        setStory(data)
      } catch (error) {
        // Log error to error monitoring service in production
        setError('Failed to load story')
      } finally {
        setLoading(false)
      }
    }

    loadStory()
  }, [params.code, getSharedStory])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error || !story) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="p-6 text-center">
          <h1 className="text-2xl font-bold">{error || 'Story not found'}</h1>
          <p className="mt-2 text-muted-foreground">
            The story you&apos;re looking for might have been removed or expired.
          </p>
          <Button 
            className="mt-4" 
            variant="outline" 
            asChild
            icon={<Home className="h-4 w-4" />}
            iconPosition="left"
          >
            <a href="/">Return Home</a>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-8">
      <Card className="p-6">
        <div className="mb-6 space-y-4">
          <h1 className="text-3xl font-bold">{story.story?.title}</h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {story.views_count} views
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Shared {formatDistanceToNow(new Date(story.created_at), { addSuffix: true })}
            </div>
            {story.expires_at && (
              <div className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                Expires {formatDistanceToNow(new Date(story.expires_at), { addSuffix: true })}
              </div>
            )}
          </div>
        </div>

        <div className="prose prose-sm max-w-none dark:prose-invert">
          {story.story?.content}
        </div>
      </Card>
    </div>
  )
} 