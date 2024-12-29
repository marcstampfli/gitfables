/**
 * @module app/forgot-password/page
 * @description Forgot password page for requesting password reset
 */

'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { logError } from '@/lib/utils/logger'
import { Logo } from '@/components/ui/logo'

interface ResetState {
  email: string
  isLoading: boolean
  success?: boolean
}

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [state, setState] = useState<ResetState>({
    email: '',
    isLoading: false
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState(prev => ({ ...prev, isLoading: true, success: false }))

    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(state.email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      })

      if (error) {
        throw error
      }

      setState(prev => ({ ...prev, success: true }))
      toast({
        title: 'Success',
        description: 'Check your email for a link to reset your password.',
      })
    } catch (error) {
      logError('Failed to send reset email', { 
        metadata: { 
          error,
          email: state.email 
        }
      })
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send reset email. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setState(prev => ({ ...prev, isLoading: false }))
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
                Reset your password
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email address and we&apos;ll send you a link to reset your password
              </p>
            </div>

            <div className="grid gap-6">
              {state.success ? (
                <div className="space-y-4">
                  <div className="p-3 text-sm text-primary bg-primary/10 rounded-md">
                    Check your email for a link to reset your password.
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login">
                      Return to login
                    </Link>
                  </Button>
                </div>
              ) : (
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

                  <Button className="w-full" type="submit" disabled={state.isLoading}>
                    {state.isLoading ? 'Sending reset link...' : 'Send reset link'}
                  </Button>
                </form>
              )}

              <div className="text-center text-sm text-muted-foreground">
                Remember your password?{' '}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 