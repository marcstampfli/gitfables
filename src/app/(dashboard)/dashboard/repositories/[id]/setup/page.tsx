/**
 * @module app/(dashboard)/dashboard/repositories/[id]/setup/page
 * @description Repository setup page for configuring and importing a GitHub repository
 */

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { createGitHubClient } from '@/lib/vcs/github-client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, GitBranch, CheckCircle2 } from 'lucide-react'
import { logError } from '@/lib/utils/logger'
import type { Repository } from '@/types/vcs'

interface SetupStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'loading' | 'complete' | 'error'
  error?: string
}

export default function RepositorySetupPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [repository, setRepository] = useState<Repository | null>(null)
  const [steps, setSteps] = useState<SetupStep[]>([
    {
      id: 'connect',
      title: 'Connect Repository',
      description: 'Establishing connection with GitHub repository',
      status: 'pending'
    },
    {
      id: 'import',
      title: 'Import Repository',
      description: 'Importing repository metadata and settings',
      status: 'pending'
    },
    {
      id: 'sync',
      title: 'Initial Sync',
      description: 'Syncing commit history and repository data',
      status: 'pending'
    }
  ])

  useEffect(() => {
    async function setupRepository() {
      try {
        // Get GitHub token
        const supabase = await createClient()
        const { data: { session } } = await supabase.auth.getSession()

        if (!session?.provider_token) {
          throw new Error('GitHub token not found')
        }

        // Update connect step status
        updateStepStatus('connect', 'loading')

        // Get repository details
        const githubClient = createGitHubClient(session.provider_token)
        const repos = await githubClient.listRepositories()
        const repo = repos.find(r => r.id === params.id)

        if (!repo) {
          throw new Error('Repository not found')
        }

        setRepository(repo)
        updateStepStatus('connect', 'complete')

        // Import repository
        updateStepStatus('import', 'loading')
        const { data: importedRepo, error: importError } = await supabase
          .from('repositories')
          .insert({
            github_id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            description: repo.description,
            url: repo.url,
            is_private: repo.private,
            default_branch: repo.default_branch,
            languages: repo.languages,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            watchers_count: repo.watchers_count,
            size: repo.size,
            created_at: repo.created_at,
            updated_at: repo.updated_at,
            user_id: session.user.id
          })
          .select()
          .single()

        if (importError) throw importError
        updateStepStatus('import', 'complete')

        // Initial sync
        updateStepStatus('sync', 'loading')
        
        // Fetch commit history
        const commits = await githubClient.listCommits(repo.owner, repo.name)
        
        // Store commits in database
        const { error: commitsError } = await supabase
          .from('commits')
          .insert(
            commits.map(commit => ({
              repository_id: importedRepo.id,
              sha: commit.sha,
              message: commit.message,
              author_name: commit.author.name,
              author_email: commit.author.email,
              author_date: commit.author.date,
              url: commit.url,
              user_id: session.user.id
            }))
          )

        if (commitsError) throw commitsError
        updateStepStatus('sync', 'complete')

        // Redirect to repository page
        router.push(`/dashboard/repositories/${importedRepo.id}`)
      } catch (error) {
        logError('Failed to setup repository', {
          metadata: {
            error,
            repositoryId: params.id
          }
        })

        const currentStep = steps.find(s => s.status === 'loading')
        if (currentStep) {
          updateStepStatus(currentStep.id, 'error', error instanceof Error ? error.message : 'Failed to setup repository')
        }
      }
    }

    setupRepository()
  }, [params.id, router])

  const updateStepStatus = (stepId: string, status: SetupStep['status'], error?: string) => {
    setSteps(currentSteps =>
      currentSteps.map(step =>
        step.id === stepId
          ? { ...step, status, error }
          : step
      )
    )
  }

  return (
    <div className="container max-w-2xl py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Repository Setup</h1>
        <p className="text-muted-foreground">
          Setting up {repository?.name || 'repository'} for GitFables
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Setup Progress</CardTitle>
          <CardDescription>
            Please wait while we set up your repository
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4">
              <div className="mt-1">
                {step.status === 'complete' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : step.status === 'loading' ? (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                ) : step.status === 'error' ? (
                  <GitBranch className="h-5 w-5 text-destructive" />
                ) : (
                  <GitBranch className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="font-medium">{step.title}</div>
                <div className="text-sm text-muted-foreground">
                  {step.description}
                </div>
                {step.status === 'error' && step.error && (
                  <Alert variant="destructive">
                    <AlertDescription>{step.error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {steps.some(step => step.status === 'error') && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard/repositories')}
          >
            Back to Repositories
          </Button>
        </div>
      )}
    </div>
  )
} 