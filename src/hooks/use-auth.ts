/**
 * @module hooks/use-auth
 * @description Custom hook for handling authentication state and actions
 */

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { logError } from '@/lib/utils/logger'
import type { User } from '@supabase/supabase-js'

interface AuthError {
  message: string
}

interface AuthState {
  user: User | null
  loading: boolean
  error: AuthError | null
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      try {
        const supabase = await createClient()

        // Get session and subscribe to changes
        const { data: { session } } = await supabase.auth.getSession()
        
        if (mounted) {
          setState(prev => ({
            ...prev,
            user: session?.user ?? null,
            loading: false,
            error: null
          }))
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          if (mounted) {
            setState(prev => ({
              ...prev,
              user: session?.user ?? null,
              loading: false,
              error: null
            }))
          }
        })

        return () => {
          subscription.unsubscribe()
        }
      } catch (error) {
        if (mounted) {
          setState(prev => ({
            ...prev,
            user: null,
            loading: false,
            error: null // Don't show error on initial load
          }))
        }
      }
    }

    // Get initial session
    getInitialSession()

    return () => {
      mounted = false
    }
  }, [])

  async function signInWithPassword(email: string, password: string) {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        throw error
      }
    } catch (error) {
      logError('Failed to sign in with password', { metadata: { error, email } })
      setState(prev => ({
        ...prev,
        error: {
          message: error instanceof Error ? error.message : 'Failed to sign in'
        }
      }))
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  async function signInWithOAuth(provider: 'github', redirectTo?: string) {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectTo ? `${window.location.origin}/auth/callback?next=${redirectTo}` : undefined
        }
      })

      if (error) {
        throw error
      }
    } catch (error) {
      logError('Failed to sign in with OAuth', { metadata: { error, provider } })
      setState(prev => ({
        ...prev,
        error: {
          message: error instanceof Error ? error.message : 'Failed to sign in'
        }
      }))
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  async function signOut() {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw error
      }

      setState(prev => ({
        ...prev,
        user: null,
        error: null
      }))
    } catch (error) {
      logError('Failed to sign out', { metadata: { error } })
      setState(prev => ({
        ...prev,
        error: {
          message: error instanceof Error ? error.message : 'Failed to sign out'
        }
      }))
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    signInWithPassword,
    signInWithOAuth,
    signOut
  }
} 