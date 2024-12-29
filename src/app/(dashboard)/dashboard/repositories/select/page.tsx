/**
 * @module app/(dashboard)/dashboard/repositories/select/page
 * @description Page for selecting repositories to connect after OAuth
 */

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { createGitHubClient } from '@/lib/vcs/github-client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GitBranch, Star } from 'lucide-react'
import { EmptyState } from '@/components/ui/empty-state'

export default async function SelectRepositoryPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/dashboard/repositories/new')
  }

  if (!session.provider_token) {
    redirect('/dashboard/repositories/new')
  }

  const githubClient = createGitHubClient(session.provider_token)
  const repositories = await githubClient.listRepositories()

  if (!repositories.length) {
    return (
      <div className="container py-8">
        <EmptyState
          icon={GitBranch}
          title="No repositories found"
          description="We couldn't find any repositories in your GitHub account. Make sure you have at least one repository and try again."
          action={{
            label: "Try Again",
            href: "/dashboard/repositories/new"
          }}
        />
      </div>
    )
  }

  return (
    <div className="container space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Select Repository</h1>
        <p className="text-muted-foreground">
          Choose repositories to connect from your GitHub account
        </p>
      </div>

      <div className="grid gap-4">
        {repositories.map((repo) => (
          <Card key={repo.id} className="hover:border-primary cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>{repo.full_name}</CardTitle>
                  <CardDescription>
                    {repo.description || 'No description available'}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4" />
                    {repo.stargazers_count}
                  </div>
                  <Button>Connect Repository</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {repo.language && (
                  <div className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full bg-primary" />
                    {repo.language}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <GitBranch className="h-4 w-4" />
                  {repo.default_branch}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 