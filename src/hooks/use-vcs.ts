/**
 * @module hooks/use-vcs
 * @description Hook for managing version control system providers
 */

'use client'

import { useState, useCallback } from 'react'
import { GitHubService } from '@/lib/github-service'
import type { VCSProvider } from '@/types/vcs'

/**
 * Hook for managing VCS providers
 * 
 * @returns {Object} VCS provider management functions and state
 */
export function useVCS() {
  const [provider, setProvider] = useState<VCSProvider | null>(null)

  const initializeProvider = useCallback((type: 'github', token: string) => {
    switch (type) {
      case 'github':
        setProvider(new GitHubService(token))
        break
      default:
        throw new Error(`Unknown provider type: ${type}`)
    }
  }, [])

  return {
    provider,
    initializeProvider
  }
} 