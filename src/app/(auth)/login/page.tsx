/**
 * @module app/login/page
 * @description Login page with email/password and social provider authentication
 */

'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { useToast } from '@/components/ui/use-toast'
import { logError } from '@/lib/utils/logger'

interface AuthState {
  email: string
  password: string
  isLoading: boolean
}

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [state, setState] = useState<AuthState>({
    email: '',
    password: '',
    isLoading: false,
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email: state.email,
        password: state.password,
      })

      if (error) {
        throw error
      }

      const redirectTo = searchParams.get('redirectTo')
      router.push(redirectTo || '/dashboard')
      router.refresh()
    } catch (error) {
      logError('Failed to sign in with email', { 
        metadata: { 
          error,
          email: state.email 
        }
      })
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to sign in',
        variant: 'destructive'
      })
    } finally {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }

  async function handleGitHubLogin() {
    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }
    } catch (error) {
      logError('Failed to sign in with GitHub', { metadata: { error } })
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to sign in with GitHub',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="container relative flex flex-col items-center justify-center min-h-screen">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <Link href="/" className="mx-auto">
                <Logo size="lg" />
              </Link>
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>

            <div className="grid gap-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={state.email}
                    onChange={e => setState(prev => ({ ...prev, email: e.target.value }))}
                    disabled={state.isLoading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={state.password}
                    onChange={e => setState(prev => ({ ...prev, password: e.target.value }))}
                    disabled={state.isLoading}
                    required
                  />
                </div>

                <Button className="w-full" type="submit" disabled={state.isLoading}>
                  {state.isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button variant="outline" type="button" onClick={handleGitHubLogin}>
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>

              <div className="text-center text-sm">
                <Link href="/forgot-password" className="text-primary hover:underline">
                  Forgot your password?
                </Link>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 