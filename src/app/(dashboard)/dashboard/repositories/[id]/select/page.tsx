/**
 * @module app/repositories/[id]/select/page
 * @description Repository selection page after choosing a VCS provider
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Search, GitFork, Star, History } from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

interface Repository {
  id: string
  name: string
  full_name: string
  description: string
  stars: number
  language: string
  updated_at: string
  private: boolean
}

async function getProviderRepositories(provider: string): Promise<Repository[]> {
  // TODO: Implement actual provider API calls
  // This is mock data for now
  return [
    {
      id: '1',
      name: 'my-awesome-project',
      full_name: 'username/my-awesome-project',
      description: 'A really awesome project built with Next.js',
      stars: 42,
      language: 'TypeScript',
      updated_at: new Date().toISOString(),
      private: false
    },
    {
      id: '2',
      name: 'cool-app',
      full_name: 'username/cool-app',
      description: 'A cool application with some neat features',
      stars: 15,
      language: 'JavaScript',
      updated_at: new Date().toISOString(),
      private: true
    }
  ]
}

export default async function SelectRepositoryPage({ params }: { params: { id: string } }) {
  // Validate provider
  const provider = params.id
  if (!['github', 'gitlab', 'bitbucket'].includes(provider)) {
    notFound()
  }

  const repositories = await getProviderRepositories(provider)

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/repositories/new" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Select Repository</h1>
          </div>
          <p className="text-muted-foreground">
            Choose repositories to connect from {provider.charAt(0).toUpperCase() + provider.slice(1)}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search repositories..." className="pl-8" />
        </div>
        <Button variant="outline" size="sm">
          <History className="mr-2 h-4 w-4" />
          Refresh List
        </Button>
      </div>

      {/* Repository List */}
      <div className="grid gap-4">
        {repositories.map((repo) => (
          <Card key={repo.id} className="group relative overflow-hidden hover:bg-muted/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-md bg-primary/10">
                      <GitFork className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{repo.name}</CardTitle>
                    {repo.private && (
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">
                        Private
                      </span>
                    )}
                  </div>
                  <CardDescription className="line-clamp-2">
                    {repo.description || 'No description available'}
                  </CardDescription>
                </div>
                <Button>
                  Connect
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {repo.language && (
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span>{repo.language}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  <span>{repo.stars}</span>
                </div>
                <div>
                  Updated {new Date(repo.updated_at).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/dashboard/repositories/new">
            Cancel
          </Link>
        </Button>
        <Button>
          Connect Selected
        </Button>
      </div>
    </div>
  )
} 