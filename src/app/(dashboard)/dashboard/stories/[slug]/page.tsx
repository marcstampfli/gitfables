/**
 * @module app/(dashboard)/dashboard/stories/[slug]/page
 * @description Protected story viewer page for authenticated users
 */

import { Button } from '@/components/ui/button'
import { ArrowLeft, Share2, Download, GitBranch, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUserId } from '@/lib/auth'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function StoryPage({ params }: PageProps) {
  const userId = await getCurrentUserId()
  if (!userId) {
    redirect('/login')
  }

  const supabase = await createClient()
  const { data: story, error } = await supabase
    .from('stories')
    .select('*, repository:repositories(*)')
    .eq('id', params.slug)
    .eq('user_id', userId)
    .single()

  if (error || !story) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/stories">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Stories
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative py-20">
          <div className="container relative">
            <div className="max-w-[800px] mx-auto space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <GitBranch className="w-4 h-4" />
                    <span>{story.repository.name}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(story.created_at).toLocaleDateString()}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{story.read_time || '5 min read'}</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tight">
                  {story.title}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {story.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-[800px] mx-auto">
              <div className="prose prose-gray dark:prose-invert lg:prose-lg max-w-none">
                {story.content.map((block: any, index: number) => (
                  <div key={index} className="mb-12 last:mb-0">
                    {block.type === 'section' ? (
                      <div>
                        <h2>{block.title}</h2>
                        <div className="whitespace-pre-wrap">{block.content}</div>
                      </div>
                    ) : block.type === 'commit' ? (
                      <div className="not-prose">
                        <div className="flex items-start gap-4 p-4 bg-muted rounded-lg font-mono text-sm">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-primary">{block.hash}</span>
                              <span className="text-muted-foreground">•</span>
                              <span>{block.date}</span>
                            </div>
                            <p className="font-medium">{block.message}</p>
                            <p className="text-muted-foreground">{block.changes}</p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 