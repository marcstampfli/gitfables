/**
 * @module app/(dashboard)/dashboard/repositories/[id]/page
 * @description Repository details page showing repository information and commit history
 */

import { Suspense } from 'react'
import { createServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GitBranch, GitCommit, Star, GitFork, Eye, Loader2, ExternalLink } from 'lucide-react'
import { formatNumber, formatDate } from '@/lib/utils/formatting'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface CommitListProps {
  commits: {
    sha: string
    message: string
    author_name: string
    author_date: string
    url: string
  }[]
}

function CommitList({ commits }: CommitListProps) {
  if (commits.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No commits found. Try syncing the repository.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {commits.map((commit) => (
        <div key={commit.sha} className="flex items-start gap-4 p-4 rounded-lg border">
          <GitCommit className="h-5 w-5 mt-1 text-muted-foreground" />
          <div className="flex-1 space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <a
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline truncate"
              >
                {commit.message.split('\n')[0]}
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              {commit.author_name} committed on {formatDate(commit.author_date)}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            asChild
            icon={<GitCommit className="h-4 w-4" />}
            iconPosition="left"
          >
            <a
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {commit.sha.substring(0, 7)}
            </a>
          </Button>
        </div>
      ))}
    </div>
  )
}

function LoadingCard() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 w-24 bg-muted animate-pulse rounded" />
        <div className="h-4 w-48 bg-muted animate-pulse rounded" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
          <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
        </div>
      </CardContent>
    </Card>
  )
}

function RepositoryContent({ repository, commits }: { 
  repository: any, 
  commits: any[]
}) {
  const syncStatus = repository.last_synced_at
    ? `Last synced ${formatDate(repository.last_synced_at)}`
    : 'Never synced'

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{repository.name}</h1>
          <p className="text-muted-foreground">{repository.description || 'No description available'}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">{syncStatus}</p>
          <Button 
            asChild
            icon={<ExternalLink className="h-4 w-4" />}
            iconPosition="right"
          >
            <a href={repository.url} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Repository Info</CardTitle>
            <CardDescription>
              Details and statistics about this repository
            </CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm font-medium text-muted-foreground">Default Branch</dt>
                <dd className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4" />
                  {repository.default_branch}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm font-medium text-muted-foreground">Stars</dt>
                <dd className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  {formatNumber(repository.stargazers_count)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm font-medium text-muted-foreground">Forks</dt>
                <dd className="flex items-center gap-2">
                  <GitFork className="h-4 w-4" />
                  {formatNumber(repository.forks_count)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm font-medium text-muted-foreground">Watchers</dt>
                <dd className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {formatNumber(repository.watchers_count)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm font-medium text-muted-foreground">Created</dt>
                <dd className="text-sm">{formatDate(repository.created_at)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
                <dd className="text-sm">{formatDate(repository.updated_at)}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
            <CardDescription>
              Programming languages used in this repository
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(repository.languages || {}).map(([language, bytes]) => (
                <div key={language} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{language}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatNumber(bytes as number)} bytes
                  </span>
                </div>
              ))}
              {Object.keys(repository.languages || {}).length === 0 && (
                <p className="text-sm text-muted-foreground">No language data available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Commits</CardTitle>
          <CardDescription>
            Latest commits to the default branch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CommitList commits={commits} />
        </CardContent>
      </Card>
    </div>
  )
}

export default async function RepositoryPage({ params }: { params: { id: string } }) {
  const supabase = await createServerClient()

  // Fetch repository details
  const { data: repository, error: repoError } = await supabase
    .from('repositories')
    .select('*')
    .eq('id', params.id)
    .single()

  if (repoError || !repository) {
    notFound()
  }

  // Fetch latest commits
  const { data: commits, error: commitsError } = await supabase
    .from('commits')
    .select('*')
    .eq('repository_id', repository.id)
    .order('author_date', { ascending: false })
    .limit(10)

  if (commitsError) {
    return (
      <div className="container py-8">
        <Alert variant="destructive">
          <AlertDescription>Failed to load commit history</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Suspense fallback={
        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="h-8 w-48 bg-muted animate-pulse rounded" />
              <div className="h-4 w-96 bg-muted animate-pulse rounded" />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <LoadingCard />
            <LoadingCard />
          </div>
          <LoadingCard />
        </div>
      }>
        <RepositoryContent repository={repository} commits={commits || []} />
      </Suspense>
    </div>
  )
} 