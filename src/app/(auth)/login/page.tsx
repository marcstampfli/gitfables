/**
 * @module app/login/page
 * @description Login page using Supabase authentication
 */

'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Github, LogIn } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { useAuth } from '@/hooks/use-auth'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface FormState {
  email: string
  password: string
}

function LoginContent() {
  const searchParams = useSearchParams()
  const { user, loading, error, signInWithPassword, signInWithOAuth } = useAuth()
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
  })

  // Handle redirect when user is authenticated
  useEffect(() => {
    if (user && !loading) {
      const redirectTo = searchParams.get('redirectTo') || '/dashboard'
      window.location.replace(redirectTo)
    }
  }, [user, loading, searchParams])

  async function handleEmailLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await signInWithPassword(formState.email, formState.password)
  }

  async function handleOAuthLogin() {
    const redirectTo = searchParams.get('redirectTo') || '/dashboard'
    await signInWithOAuth('github', redirectTo)
  }

  // Show loading state while checking auth
  if (loading) {
    return <Skeleton className="h-[400px]" />
  }

  // Redirect if already logged in
  if (user) {
    return <Skeleton className="h-[400px]" />
  }

  return (
    <>
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
        <form onSubmit={handleEmailLogin} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={formState.email}
              onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
              disabled={loading}
              required
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={formState.password}
              onChange={e => setFormState(prev => ({ ...prev, password: e.target.value }))}
              disabled={loading}
              required
              className="bg-background"
            />
          </div>

          <Button 
            className="w-full" 
            type="submit" 
            disabled={loading}
            loading={loading}
            icon={<LogIn className="h-4 w-4" />}
            iconPosition="left"
          >
            {loading ? 'Signing in...' : 'Sign in with Email'}
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

        <Button 
          variant="outline" 
          type="button" 
          onClick={handleOAuthLogin}
          disabled={loading}
          icon={<Github className="h-4 w-4" />}
          iconPosition="left"
          className="bg-background"
        >
          GitHub
        </Button>

        <div className="flex flex-col space-y-2 text-center text-sm">
          <Link 
            href="/forgot-password" 
            className="text-muted-foreground hover:text-primary"
          >
            Forgot your password?
          </Link>
          <div className="text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default function LoginPage() {
  return (
    <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Suspense fallback={<Skeleton className="h-[400px]" />}>
            <LoginContent />
          </Suspense>
        </div>
      </div>
    </div>
  )
} 