/**
 * @module app/repositories/page
 * @description List and manage connected GitHub repositories
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GitBranch, Plus, ArrowRight, RefreshCw, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { formatDistanceToNow } from 'date-fns'
import { RepositoryActions } from '@/components/repositories/repository-actions'

async function getRepositories() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data: repositories } = await supabase
    .from('repositories')
    .select('*')
    .eq('user_id', user.id)
    .order('last_synced_at', { ascending: false })

  return repositories || []
}

export default async function RepositoriesPage() {
  const repositories = await getRepositories()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Repositories</h1>
          <p className="text-muted-foreground">
            Manage your connected GitHub repositories
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/repositories/new">
            <Plus className="mr-2 h-4 w-4" /> Connect Repository
          </Link>
        </Button>
      </div>

      {/* Repository Grid */}
      <div className="grid gap-6">
        {repositories.length > 0 ? (
          repositories.map((repo) => (
            <Card key={repo.id} className="relative group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-5 w-5 text-primary" />
                      <CardTitle>{repo.name}</CardTitle>
                    </div>
                    <CardDescription>{repo.description}</CardDescription>
                  </div>
                  <RepositoryActions repository={repo} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium">Stories</p>
                      <p className="text-2xl font-bold">{repo.story_count || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Commits</p>
                      <p className="text-2xl font-bold">{repo.commit_count || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Last Synced</p>
                      <p className="text-sm text-muted-foreground">
                        {repo.last_synced_at 
                          ? formatDistanceToNow(new Date(repo.last_synced_at), { addSuffix: true })
                          : 'Never'}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/repositories/${repo.id}`}>
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No repositories connected</CardTitle>
              <CardDescription>
                Connect your first GitHub repository to start generating stories
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-6">
              <Button asChild>
                <Link href="/dashboard/repositories/new">
                  <Plus className="mr-2 h-4 w-4" /> Connect Repository
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 