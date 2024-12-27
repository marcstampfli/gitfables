import { createClient } from '@/lib/supabase/server'
import { StoryList } from '@/components/dashboard/story-list'
import type { DatabaseStory } from '@/components/dashboard/story-list'
import type { Database } from '@/types/supabase'

export default async function StoriesPage() {
  const supabase = createClient()

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return null
  }

  const { data: stories } = await supabase
    .from('stories')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .returns<Database['public']['Tables']['stories']['Row'][]>()

  const typedStories = (stories || []).map(story => ({
    id: story.id,
    title: story.title,
    content: story.content,
    created_at: story.created_at
  })) as DatabaseStory[]

  return <StoryList stories={typedStories} />
} 