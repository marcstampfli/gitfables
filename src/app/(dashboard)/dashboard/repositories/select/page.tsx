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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'

export default function SelectRepositoryPage() {
  const router = useRouter()
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading repositories...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Select Repository</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleRetry}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (repositories.length === 0) {
    return (
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Select Repository</h1>
        <Card>
          <CardHeader>
            <CardTitle>No Repositories Found</CardTitle>
            <CardDescription>
              We couldn&apos;t find any repositories in your GitHub account. Make sure you have at least one repository and try again.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-end">
            <Button onClick={handleRetry}>
              Refresh
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Select Repository</h1>
      <RepositorySelector repositories={repositories} onSelect={handleRepositorySelect} />
    </div>
  )
} 