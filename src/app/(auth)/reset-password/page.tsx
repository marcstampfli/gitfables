/**
 * @module app/reset-password/page
 * @description Enhanced reset password page with improved styling and error handling
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { logError } from '@/lib/utils/logger'
import { Logo } from '@/components/ui/logo'
import { Key } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface ResetState {
  password: string
  confirmPassword: string
  isLoading: boolean
  error: string | null
}

export default function ResetPasswordPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [state, setState] = useState<ResetState>({
    password: '',
    confirmPassword: '',
    isLoading: false,
    error: null
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    if (state.password !== state.confirmPassword) {
      setState(prev => ({ 
        ...prev, 
        error: 'Passwords do not match',
        isLoading: false 
      }))
      return
    }

    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.updateUser({
        password: state.password
      })

      if (error) {
        setState(prev => ({ ...prev, error: error.message }))
        return
      }

      // Password updated successfully, redirect to login
      router.push('/login?message=password-updated')
    } catch (error) {
      logError('Failed to update password', { metadata: { error } })
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to update password. Please try again.'
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
          Enter your new password below
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {state.error && (
            <Alert variant="destructive">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              New Password
            </label>
            <Input
              id="password"
              type="password"
              value={state.password}
              onChange={e => setState(prev => ({ ...prev, password: e.target.value }))}
              disabled={state.isLoading}
              required
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm New Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={state.confirmPassword}
              onChange={e => setState(prev => ({ ...prev, confirmPassword: e.target.value }))}
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
            icon={<Key className="h-4 w-4" />}
            iconPosition="left"
          >
            Update password
          </Button>
        </form>

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