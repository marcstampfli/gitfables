import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface VCSConnection {
  id: string
  user_id: string
  provider: 'github' | 'gitlab' | 'bitbucket'
  provider_user_id: string
  provider_username: string
  provider_email: string
  provider_avatar_url: string | null
  access_token: string
  refresh_token: string | null
  expires_at: string | null
  created_at: string
  updated_at: string
}

export function useVCSConnections() {
  const [connections, setConnections] = useState<VCSConnection[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const fetchConnections = useCallback(async () => {
    try {
      setIsLoading(true)
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No authenticated user')

      const { data, error } = await supabase
        .from('vcs_connections')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setConnections(data || [])
      return data
    } catch (err) {
      const error = err as Error
      setError(error)
      toast({
        title: 'Error',
        description: 'Failed to fetch VCS connections',
        variant: 'destructive'
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  return {
    connections,
    isLoading,
    error,
    fetchConnections
  }
} 