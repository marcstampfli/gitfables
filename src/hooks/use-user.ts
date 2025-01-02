/**
 * @module hooks/use-user
 * @description Hook for managing user authentication state
 */

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/database.types'

// Get the singleton instance
const supabase = createClient()

export function useUser() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function getUser() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error) {
          console.error('Error getting user:', error)
          if (mounted) {
            setUser(null)
            setIsLoading(false)
          }
          return
        }

        if (!user) {
          console.log('No user found')
          if (mounted) {
            setUser(null)
            setIsLoading(false)
          }
          return
        }

        if (mounted) {
          setUser(user)
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Error in getUser:', err)
        if (mounted) {
          setUser(null)
          setIsLoading(false)
        }
      }
    }

    // Get initial user
    getUser()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          setUser(session?.user ?? null)
          setIsLoading(false)

          if (event === 'SIGNED_OUT') {
            router.push('/login')
          }
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [router])

  return { user, isLoading }
} 