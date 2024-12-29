/**
 * @module app/(dashboard)/dashboard/page
 * @description Main dashboard page with overview metrics and recent activity
 */

import { Suspense } from 'react'
import { EmptyState } from '@/components/ui/empty-state'
import DashboardLoading from './loading'
import { createClient } from '@/lib/supabase/server'
import { formatDistanceToNow } from 'date-fns'
import { GitBranch, GitCommit, Share2, Star, BookOpen, GitFork } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Database } from '@/types/database'
import { logError } from '@/lib/utils/logger'

interface Story {
  id: string
  title: string
  description: string
  created_at: string
  repository: {
    id: string
    name: string
    provider: string
  }
}

interface Repository {
  id: string
  name: string
  provider: string
  created_at: string
  updated_at: string
}

interface StatsResponse {
  repoCount: number
  storyCount: number
  totalViews: number
  totalCommits: number
  recentStories: Story[]
  recentRepos: Repository[]
}

type DbStory = Database['public']['Tables']['stories']['Row']
type DbRepo = Database['public']['Tables']['repositories']['Row']

interface StoryWithRepo extends Pick<DbStory, 'id' | 'title' | 'content' | 'created_at'> {
  repository: Pick<DbRepo, 'id' | 'name' | 'url' | 'provider'> | null
}

async function getStats(provider: string): Promise<StatsResponse> {
  try {
    const supabase = createClient()

    // Fetch counts first to validate table existence
    const repoResult = await supabase
      .from('repositories')
      .select('id', { count: 'exact' })
      .match(provider === 'all' ? {} : { provider })

    if (repoResult.error) {
      logError('Failed to fetch repository count', repoResult.error, {
        context: 'dashboard:stats',
        metadata: { provider }
      })
      throw repoResult.error
    }

    const storyResult = await supabase
      .from('stories')
      .select('id', { count: 'exact' })

    if (storyResult.error) {
      logError('Failed to fetch story count', storyResult.error, {
        context: 'dashboard:stats',
        metadata: { provider }
      })
      throw storyResult.error
    }

    const viewResult = await supabase
      .from('story_views')
      .select('id', { count: 'exact' })

    if (viewResult.error) {
      logError('Failed to fetch view count', viewResult.error, {
        context: 'dashboard:stats',
        metadata: { provider }
      })
      throw viewResult.error
    }

    const commitResult = await supabase
      .from('repository_syncs')
      .select('id', { count: 'exact' })
      .eq('status', 'completed')

    if (commitResult.error) {
      logError('Failed to fetch commit count', commitResult.error, {
        context: 'dashboard:stats',
        metadata: { provider }
      })
      throw commitResult.error
    }

    // Fetch recent items
    const storiesResult = await supabase
      .from('stories')
      .select(`
        id,
        title,
        content,
        created_at,
        repository:repositories (
          id,
          name,
          url,
          provider
        )
      `)
      .order('created_at', { ascending: false })
      .limit(3)

    if (storiesResult.error) {
      logError('Failed to fetch recent stories', storiesResult.error, {
        context: 'dashboard:stats',
        metadata: { provider }
      })
      throw storiesResult.error
    }

    const reposResult = await supabase
      .from('repositories')
      .select(`
        id,
        name,
        url,
        provider,
        created_at,
        updated_at
      `)
      .match(provider === 'all' ? {} : { provider })
      .order('updated_at', { ascending: false })
      .limit(3)

    if (reposResult.error) {
      logError('Failed to fetch recent repositories', reposResult.error, {
        context: 'dashboard:stats',
        metadata: { provider }
      })
      throw reposResult.error
    }

    const stories: Story[] = ((storiesResult.data ?? []) as unknown as StoryWithRepo[]).map((story) => ({
      id: story.id,
      title: story.title,
      description: story.content,
      created_at: story.created_at,
      repository: {
        id: story.repository?.id ?? 'unknown',
        name: story.repository?.name ?? 'Unknown Repository',
        provider: story.repository?.provider ?? 'unknown'
      }
    }))

    const repositories: Repository[] = ((reposResult.data ?? []) as unknown as DbRepo[]).map((repo) => ({
      id: repo.id,
      name: repo.name,
      provider: repo.provider ?? 'unknown',
      created_at: repo.created_at,
      updated_at: repo.updated_at
    }))

    return {
      repoCount: repoResult.count ?? 0,
      storyCount: storyResult.count ?? 0,
      totalViews: viewResult.count ?? 0,
      totalCommits: commitResult.count ?? 0,
      recentStories: stories,
      recentRepos: repositories
    }
  } catch (error) {
    logError('Failed to fetch dashboard stats', error, {
      context: 'dashboard:stats',
      metadata: { provider }
    })
    return {
      repoCount: 0,
      storyCount: 0,
      totalViews: 0,
      totalCommits: 0,
      recentStories: [],
      recentRepos: []
    }
  }
}

async function DashboardContent() {
  const stats = await getStats('all')

  return (
    <div className="container space-y-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <GitFork className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Total Repositories</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">{stats.repoCount}</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Total Stories</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">{stats.storyCount}</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Total Views</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">{stats.totalViews}</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <GitCommit className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Total Commits</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">{stats.totalCommits}</p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Stories</h2>
          </div>
          {stats.recentStories.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No stories yet"
              description="Create your first story by selecting a repository and commit."
              action={{
                label: "Create Story",
                href: "/dashboard/stories/new"
              }}
            />
          ) : (
            <div className="grid gap-4">
              {stats.recentStories.map((story) => (
                <Card key={story.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{story.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {story.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Created {formatDistanceToNow(new Date(story.created_at))} ago
                      </p>
                    </div>
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Repositories</h2>
          </div>
          {stats.recentRepos.length === 0 ? (
            <EmptyState
              icon={GitFork}
              title="No repositories connected"
              description="Connect your first repository to get started."
              action={{
                label: "Connect Repository",
                href: "/dashboard/repositories/new"
              }}
            />
          ) : (
            <div className="grid gap-4">
              {stats.recentRepos.map((repo) => (
                <Card key={repo.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{repo.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Last updated {formatDistanceToNow(new Date(repo.updated_at))} ago
                      </p>
                    </div>
                    <GitBranch className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  )
} 