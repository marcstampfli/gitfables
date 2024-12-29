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

export default function SelectRepositoryPage() {
  const router = useRouter()
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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
        logError('Failed to load repositories', error, {
          context: 'select_repository',
          metadata: {
            action: 'load_repositories'
          }
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadRepositories()
  }, [router])

  const handleRepositorySelect = (repo: Repository) => {
    router.push(`/dashboard/repositories/${repo.id}/setup`)
  }

  if (isLoading) {
    return (
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Select Repository</h1>
        <p className="text-muted-foreground">Loading repositories...</p>
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