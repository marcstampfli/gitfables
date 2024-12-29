import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { logError } from '@/lib/utils/logger'

export interface VCSConnection {
  provider: string
  connected: boolean
  username?: string
  avatarUrl?: string
}

interface IdentityData {
  provider: string
  identity_data?: {
    preferred_username?: string
    avatar_url?: string
  }
}

export function useVCSConnections() {
  const [connections, setConnections] = useState<VCSConnection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function loadConnections() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          setConnections([])
          return
        }

        // Get user identities
        const identities = user.identities as IdentityData[] | null
        
        if (!identities?.length) {
          setConnections([])
          return
        }

        // Map identities to connections
        const vcsConnections = identities.map(identity => ({
          provider: identity.provider,
          connected: true,
          username: identity.identity_data?.preferred_username,
          avatarUrl: identity.identity_data?.avatar_url,
        }))

        setConnections(vcsConnections)
      } catch (err) {
        logError('Failed to load VCS connections', {
          metadata: {
            error: err,
            userId: supabase.auth.getUser().then(({ data }) => data.user?.id)
          }
        })
        setError('Failed to load connected providers')
      } finally {
        setIsLoading(false)
      }
    }

    loadConnections()
  }, [supabase])

  return {
    connections,
    isLoading,
    error,
  }
} 