/**
 * @module app/stories/page
 * @description List and manage generated stories
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Plus, ArrowRight, Search, Share2, Eye, Clock, Pencil } from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'
import { formatDistanceToNow } from 'date-fns'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

async function getStories() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data: stories } = await supabase
    .from('stories')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return stories || []
}

export default async function StoriesPage() {
  const stories = await getStories()

  return (
    <div className="container space-y-8 py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Stories</h1>
          <p className="text-muted-foreground">
            Create and manage your code stories
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share All
          </Button>
          <Button asChild>
            <Link href="/dashboard/stories/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Story
            </Link>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search stories..." className="pl-8" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {stories.length} stories
          </Badge>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid gap-4">
        {stories.length > 0 ? (
          stories.map((story) => (
            <Card key={story.id} className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-muted/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-md bg-primary/10">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <Link 
                        href={`/dashboard/stories/${story.id}`}
                        className="hover:underline"
                      >
                        <CardTitle>{story.title}</CardTitle>
                      </Link>
                      {story.published && (
                        <Badge variant="secondary" className="text-xs">Published</Badge>
                      )}
                    </div>
                    <CardDescription className="line-clamp-2">
                      {story.description || 'No description available'}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/stories/${story.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      Created {formatDistanceToNow(new Date(story.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{story.views || 0} views</span>
                  </div>
                  {story.repository_name && (
                    <div className="flex items-center gap-1">
                      <span>From {story.repository_name}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">No stories yet</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Create your first story by transforming your code history into an engaging narrative
                  </p>
                </div>
                <Button asChild>
                  <Link href="/dashboard/stories/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Story
                  </Link>
                </Button>
              </div>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  )
} 