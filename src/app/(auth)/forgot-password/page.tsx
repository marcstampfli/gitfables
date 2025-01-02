/**
 * @module app/forgot-password/page
 * @description Enhanced forgot password page with improved styling and error handling
 */

'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { logError } from '@/lib/utils/logger'
import { Logo } from '@/components/ui/logo'
import { ArrowLeft, Mail } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface ResetState {
  email: string
  isLoading: boolean
  success?: boolean
  error: string | null
}

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [state, setState] = useState<ResetState>({
    email: '',
    isLoading: false,
    success: false,
    error: null
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState(prev => ({ ...prev, isLoading: true, success: false, error: null }))

    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(state.email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      })

      if (error) {
        setState(prev => ({ ...prev, error: error.message }))
        return
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
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to send reset email. Please try again.'
      }))
    } finally {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }

  return (
    <>
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
            <Alert className="bg-primary/10 text-primary border-primary/20">
              <AlertDescription>
                Check your email for a link to reset your password.
              </AlertDescription>
            </Alert>
            <Button 
              variant="outline" 
              className="w-full bg-background" 
              asChild
              icon={<ArrowLeft className="h-4 w-4" />}
              iconPosition="left"
            >
              <Link href="/login">
                Return to login
              </Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {state.error && (
              <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
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
                value={state.email}
                onChange={e => setState(prev => ({ ...prev, email: e.target.value }))}
                disabled={state.isLoading}
                required
                className="bg-background"
              />
            </div>

            <Button 
              className="w-full" 
              type="submit" 
              disabled={state.isLoading}
              loading={state.isLoading}
              icon={<Mail className="h-4 w-4" />}
              iconPosition="left"
            >
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
    </>
  )
} 