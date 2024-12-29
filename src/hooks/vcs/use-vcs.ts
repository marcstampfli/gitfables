/**
 * @module hooks/use-vcs
 * @description Hook for managing version control system providers
 */

'use client'

import { useState, useEffect } from 'react'
import { GitHubProvider } from '@/lib/vcs/github-provider'
import { type VCSProviderImpl } from '@/types/vcs'

/**
 * Hook for managing VCS providers
 * 
 * @returns {Object} VCS provider management functions and state
 */
export function useVCS() {
  const [provider, setProvider] = useState<VCSProviderImpl | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function initializeProvider() {
      try {
        const response = await fetch('/api/auth/token')
        if (!response.ok) {
          throw new Error('Failed to fetch token')
        }

        const { token } = await response.json()
        if (!token) {
          setProvider(null)
          return
        }

        const provider = new GitHubProvider()
        await provider.init({ platform: 'github' })
        await provider.authenticate({ token })
        setProvider(provider)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize VCS provider'))
      } finally {
        setIsLoading(false)
      }
    }

    initializeProvider()
  }, [])

  return { provider, isLoading, error }
} 