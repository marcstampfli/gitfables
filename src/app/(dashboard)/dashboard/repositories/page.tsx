/**
 * @module app/repositories/page
 * @description List and manage connected GitHub repositories
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GitBranch, Plus, ArrowRight, RefreshCw, Trash2, GitFork, Search, History } from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'
import { formatDistanceToNow } from 'date-fns'
import { RepositoryActions } from '@/components/repositories/repository-actions'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

async function getRepositories() {
  const supabase = await createServerClient()
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
    <div className="container space-y-8 py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Repositories</h1>
          <p className="text-muted-foreground">
            Connect and manage your code repositories
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <History className="mr-2 h-4 w-4" />
            Sync All
          </Button>
          <Button asChild>
            <Link href="/dashboard/repositories/new">
              <Plus className="mr-2 h-4 w-4" />
              Connect Repository
            </Link>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search repositories..." className="pl-8" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {repositories.length} repositories
          </Badge>
        </div>
      </div>

      {/* Repository Grid */}
      <div className="grid gap-4">
        {repositories.length > 0 ? (
          repositories.map((repo) => (
            <Card key={repo.id} className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-muted/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-md bg-primary/10">
                        <GitFork className="h-4 w-4 text-primary" />
                      </div>
                      <Link 
                        href={`/dashboard/repositories/${repo.id}`}
                        className="hover:underline"
                      >
                        <CardTitle>{repo.name}</CardTitle>
                      </Link>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {repo.description || 'No description available'}
                    </CardDescription>
                  </div>
                  <RepositoryActions repository={repo} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span className="capitalize">{repo.provider}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <History className="h-3 w-3" />
                    <span>
                      Last synced {repo.last_synced_at ? formatDistanceToNow(new Date(repo.last_synced_at), { addSuffix: true }) : 'never'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <GitFork className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">No repositories connected</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Connect your first repository to start creating stories from your code history
                  </p>
                </div>
                <Button asChild>
                  <Link href="/dashboard/repositories/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Connect Repository
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