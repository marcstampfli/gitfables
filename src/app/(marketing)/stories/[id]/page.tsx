/**
 * @module app/(marketing)/stories/[id]/page
 * @description Public story view page
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getStory } from '@/lib/story/story-service'
import { StoryViewer } from '@/components/story/story-viewer'
import { Story } from '@/types/story'

interface PageProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = await createClient()
  const story = await getStory(supabase, params.id)

  if (!story) {
    return {
      title: 'Story Not Found | GitFables',
      description: 'The requested story could not be found.'
    }
  }

  return {
    title: `${story.title} | GitFables`,
    description: story.description || 'A story generated from Git commits'
  }
}

export default async function StoryPage({ params }: PageProps) {
  const supabase = await createClient()
  const story = await getStory(supabase, params.id)

  if (!story) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <StoryViewer story={story as Story} />
    </main>
  )
} 