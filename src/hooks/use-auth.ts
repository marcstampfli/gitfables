/**
 * @module hooks/use-auth
 * @description Hook for managing authentication state
 */

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

/**
 * Hook for managing authentication state
 * 
 * @returns {Object} Authentication state and functions
 */
export function useAuth() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/login')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase.auth])

  return {
    signOut: () => supabase.auth.signOut(),
    getUser: async (): Promise<User | null> => {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    }
  }
} 