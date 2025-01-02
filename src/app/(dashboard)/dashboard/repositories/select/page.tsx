/**
 * @module app/(dashboard)/dashboard/repositories/select/page
 * @description Page for selecting repositories to connect after OAuth
 */

'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { createGitHubClient } from '@/lib/vcs/github-client'
import { RepositorySelector } from '@/components/repositories/repository-selector'
import type { Repository } from '@/types/vcs'
import { useEffect, useState } from 'react'
import { logError } from '@/lib/utils/logger'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, ArrowLeft, GitFork, Loader2, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function SelectRepositoryPage() {
  const router = useRouter()
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  async function loadRepositories() {
    try {
      const supabase = await createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/auth/login')
        return
      }

      const providerToken = session.provider_token
      if (!providerToken) {
        router.push('/auth/github')
        return
      }

      const githubClient = createGitHubClient(providerToken)
      const repos = await githubClient.listRepositories()
      setRepositories(repos)
    } catch (error) {
      logError('Failed to load repositories', {
        metadata: {
          error,
          action: 'load_repositories'
        }
      })
      setError(error instanceof Error ? error.message : 'Failed to load repositories')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadRepositories()
  }, [router])

  const handleRepositorySelect = (repo: Repository) => {
    router.push(`/dashboard/repositories/${repo.id}/setup`)
  }

  const handleRetry = () => {
    setIsLoading(true)
    setError(null)
    loadRepositories()
  }

  const filteredRepositories = repositories.filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Select Repository</h1>
          <p className="text-muted-foreground mt-2">
            Choose a repository to connect with GitFables
          </p>
        </div>
        <Link href="/dashboard/repositories">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Repositories
          </Button>
        </Link>
      </div>

      {/* Search and Info */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <GitFork className="h-6 w-6 text-primary mt-1" />
            <div className="space-y-1">
              <h2 className="font-semibold">Connect Your Repository</h2>
              <p className="text-sm text-muted-foreground">
                Select a repository to start creating stories from your code. GitFables will analyze your commit history and help you generate engaging content.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading repositories...</p>
        </div>
      ) : error ? (
        <div className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="flex justify-end">
            <Button onClick={handleRetry}>
              Try Again
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          {filteredRepositories.length === 0 ? (
            <Card className="p-6">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">No repositories found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or make sure you have repositories on GitHub
                </p>
              </div>
            </Card>
          ) : (
            <RepositorySelector
              repositories={filteredRepositories}
              onSelect={handleRepositorySelect}
            />
          )}
        </div>
      )}
    </div>
  )
} 