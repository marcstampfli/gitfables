/**
 * @module hooks/use-vcs
 * @description React hook for managing version control system providers
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { config } from '@/lib/config'
import type { Repository, Commit } from '@/lib/github-client'

export function useVCS() {
  const [platform, setPlatform] = useState<'github' | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Check authentication status on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/status')
        const data = await response.json()
        if (data.authenticated) {
          setPlatform('github')
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to check auth status'))
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])

  const connect = useCallback(async (platform: 'github') => {
    setIsLoading(true)
    setError(null)

    try {
      // Generate random state for CSRF protection
      const state = Math.random().toString(36).substring(7)
      sessionStorage.setItem('oauth_state', state)

      // Construct GitHub OAuth URL
      const params = new URLSearchParams({
        client_id: config.github.clientId,
        redirect_uri: config.github.redirectUri,
        scope: 'repo',
        state,
      })

      // Redirect to GitHub OAuth
      window.location.href = `https://github.com/login/oauth/authorize?${params}`
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to connect'))
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchCommits = useCallback(async (repo: Repository) => {
    try {
      const [owner, repoName] = repo.full_name.split('/')
      const response = await fetch(`/api/repos/${owner}/${repoName}/commits`)
      if (!response.ok) throw new Error('Failed to fetch commits')
      const commits: Commit[] = await response.json()
      return commits
    } catch (error) {
      console.error('Failed to fetch commits:', error)
      throw error
    }
  }, [])

  return {
    platform,
    isLoading,
    error,
    connect,
    fetchCommits,
  }
} 