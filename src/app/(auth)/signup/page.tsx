/**
 * @module app/signup/page
 * @description Registration page with email/password and social provider signup
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { logError } from '@/lib/utils/logger'
import { Logo } from '@/components/ui/logo'

interface AuthState {
  email: string
  password: string
  confirmPassword: string
  isLoading: boolean
}

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [state, setState] = useState<AuthState>({
    email: '',
    password: '',
    confirmPassword: '',
    isLoading: false
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState(prev => ({ ...prev, isLoading: true }))

    if (state.password !== state.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive'
      })
      setState(prev => ({ ...prev, isLoading: false }))
      return
    }

    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.signUp({
        email: state.email,
        password: state.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        throw error
      }

      // Redirect to verification page
      router.push('/verify-email?email=' + encodeURIComponent(state.email))
    } catch (error) {
      logError('Failed to create account', { 
        metadata: { 
          error,
          email: state.email 
        }
      })
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create account. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }

  async function handleGitHubSignup() {
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
      logError('Failed to sign up with GitHub', { metadata: { error } })
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to sign up with GitHub. Please try again.',
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
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign up to start creating your stories
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

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={state.confirmPassword}
                    onChange={e => setState(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    disabled={state.isLoading}
                    required
                  />
                </div>

                <Button className="w-full" type="submit" disabled={state.isLoading}>
                  {state.isLoading ? 'Creating account...' : 'Create account'}
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

              <Button variant="outline" type="button" onClick={handleGitHubSignup}>
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>

              <div className="text-xs text-center text-muted-foreground space-x-1">
                By signing up, you agree to our{' '}
                <Link href="/terms" className="hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 