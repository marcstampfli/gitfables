import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Share2, Download, GitBranch, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import type { Database } from '@/types/database'

type Story = Database['public']['Tables']['stories']['Row']

interface StoryBlock {
  type: 'section' | 'commit'
  title?: string
  content?: string
  hash?: string
  date?: string
  message?: string
  changes?: string
}

interface StoryEditorProps {
  story: Story & {
    content: StoryBlock[]
    repository_name: string
    description: string
  }
}

export function StoryEditor({ story }: StoryEditorProps) {
  const readTime = Math.max(1, Math.ceil(story.content.reduce((acc: number, block: StoryBlock) => 
    acc + (block.content?.length || 0) + (block.message?.length || 0), 0) / 1000))

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              icon={<ArrowLeft className="h-4 w-4" />}
              iconPosition="left"
            >
              <Link href="/dashboard/stories">
                Back to Stories
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                icon={<Share2 className="h-4 w-4" />}
                iconPosition="left"
              >
                Share
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                icon={<Download className="h-4 w-4" />}
                iconPosition="left"
              >
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
                    <span>{story.repository_name}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(story.created_at).toLocaleDateString()}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{readTime} min read</span>
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
                {story.content.map((block: StoryBlock, index: number) => (
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