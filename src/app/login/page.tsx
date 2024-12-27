/**
 * @module app/login/page
 * @description Login page component
 */

'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/icons'
import { toast } from '@/components/ui/use-toast'
import { logError } from '@/lib/logger'

interface AuthState {
  email: string
  password: string
  isLoading: boolean
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [state, setState] = useState<AuthState>({
    email: '',
    password: '',
    isLoading: false,
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email: state.email,
        password: state.password,
      })

      if (error) {
        throw error
      }

      const redirectTo = searchParams.get('redirectTo')
      router.push(redirectTo || '/')
      router.refresh()
    } catch (error) {
      logError(error instanceof Error ? error : new Error('Failed to sign in'), {
        context: 'login',
        metadata: { email: state.email }
      })
      toast({
        title: 'Error',
        description: 'Failed to sign in. Please check your credentials.',
        variant: 'destructive',
      })
    } finally {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }

  return (
    <div className="mx-auto max-w-sm space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your credentials to access your account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="m@example.com"
            required
            type="email"
            value={state.email}
            onChange={e => setState(prev => ({ ...prev, email: e.target.value }))}
            disabled={state.isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            required
            type="password"
            value={state.password}
            onChange={e => setState(prev => ({ ...prev, password: e.target.value }))}
            disabled={state.isLoading}
          />
        </div>
        <Button className="w-full" type="submit" disabled={state.isLoading}>
          {state.isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign In
        </Button>
      </form>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
} 