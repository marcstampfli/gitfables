/**
 * @module hooks/vcs/use-vcs
 * @description Hook for VCS provider interactions
 */

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { createVCSProvider, initializeVCSProvider } from '@/lib/vcs'
import type { VCSProvider, Commit } from '@/types/vcs'

/**
 * Hook for VCS provider interactions
 */
export function useVCS() {
  const { data: session } = useSession()
  const [provider, setProvider] = useState<VCSProvider | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  /**
   * Initialize the VCS provider
   */
  const initialize = async () => {
    if (!session?.provider_token || !session?.provider) {
      throw new Error('No provider token available')
    }

    try {
      setLoading(true)
      setError(null)

      const vcsProvider = createVCSProvider({
        platform: session.provider as 'github' | 'gitlab' | 'bitbucket',
      })

      const initializedProvider = await initializeVCSProvider(
        vcsProvider,
        { platform: session.provider as 'github' | 'gitlab' | 'bitbucket' },
        session.provider_token
      )

      setProvider(initializedProvider)
      return initializedProvider
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to initialize VCS provider')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  /**
   * Get commits from a repository
   */
  const getCommits = async (owner: string, repo: string): Promise<Commit[]> => {
    try {
      setLoading(true)
      setError(null)

      const vcsProvider = provider || await initialize()
      const commits = await vcsProvider.listCommits(owner, repo)

      return commits
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch commits')
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    provider,
    loading,
    error,
    initialize,
    getCommits,
  }
} 