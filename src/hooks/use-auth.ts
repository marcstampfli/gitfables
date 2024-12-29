/**
 * @module hooks/use-auth
 * @description Hook for managing authentication state
 */

'use client'

import { useEffect, useState } from 'react'
import { type User, type AuthChangeEvent, type Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

/**
 * Hook for managing authentication state
 * 
 * @returns {Object} Authentication state and functions
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initAuth() {
      const supabase = await createClient()
      const { data: { user: initialUser } } = await supabase.auth.getUser()
      setUser(initialUser)
      setLoading(false)

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
        if (event === 'SIGNED_IN') {
          setUser(session?.user ?? null)
        }
        if (event === 'SIGNED_OUT') {
          setUser(null)
        }
      })

      return () => {
        subscription.unsubscribe()
      }
    }

    initAuth()
  }, [])

  return { user, loading }
} 