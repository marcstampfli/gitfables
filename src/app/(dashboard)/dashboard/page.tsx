/**
 * @module app/dashboard/page
 * @description Dashboard page component
 */

import { createClient } from '@/lib/supabase/server'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { StoryList } from '@/components/dashboard/stories/story-list'
import { RepositoryList } from '@/components/dashboard/repositories/repository-list'
import { DashboardStats } from '@/components/dashboard/stats'
import { getStats } from '@/lib/actions/stats'
import type { Story, Repository } from '@/types/dashboard'
import type { Database } from '@/types/database'

type DbStory = Database['public']['Tables']['stories']['Row'] & {
  repository: Database['public']['Tables']['repositories']['Row'] | null
}

type DbRepo = Database['public']['Tables']['repositories']['Row']

export default async function DashboardPage() {
  const supabase = await createClient()

  // Get user's stories
  const storiesResult = await supabase
    .from('stories')
    .select('*, repository:repositories(*)')
    .order('created_at', { ascending: false })
    .limit(5)

  // Get user's repositories
  const reposResult = await supabase
    .from('repositories')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  // Get dashboard stats
  const stats = await getStats()

  // Transform stories data
  const stories: Story[] = (storiesResult.data ?? []).map((story: DbStory) => ({
    id: story.id,
    title: story.title,
    description: story.content,
    status: story.is_public ? 'published' : 'draft',
    createdAt: story.created_at,
    repository: story.repository ? {
      id: story.repository.id,
      name: story.repository.name,
      provider: story.repository.provider ?? 'unknown'
    } : null
  }))

  // Transform repositories data
  const repositories: Repository[] = (reposResult.data ?? []).map((repo: DbRepo) => ({
    id: repo.id,
    name: repo.name,
    provider: repo.provider ?? 'unknown',
    url: repo.url,
    createdAt: repo.created_at
  }))

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="View your stories, repositories, and activity."
      />
      <div className="grid gap-10">
        <DashboardStats stats={stats} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <StoryList
            title="Recent Stories"
            stories={stories}
            className="col-span-4"
          />
          <RepositoryList
            title="Recent Repositories"
            repositories={repositories}
            className="col-span-3"
          />
        </div>
      </div>
    </DashboardShell>
  )
} 