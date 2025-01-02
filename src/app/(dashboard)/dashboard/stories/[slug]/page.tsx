/**
 * @module app/(dashboard)/dashboard/stories/[slug]/page
 * @description Protected story viewer page for authenticated users
 */

import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { StoryEditor } from '@/components/dashboard/stories/story-editor'

interface StoryPageProps {
  params: {
    slug: string
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  const supabase = await createServerClient()

  const { data: story, error } = await supabase
    .from('stories')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !story) {
    notFound()
  }

  return (
    <div className="container py-8">
      <StoryEditor story={story} />
    </div>
  )
} 