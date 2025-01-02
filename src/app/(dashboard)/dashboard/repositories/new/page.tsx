/**
 * @module app/(dashboard)/dashboard/repositories/new/page
 * @description Page for selecting a VCS provider and repository
 */

'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Github, GitBranch, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { logError } from '@/lib/utils/logger'

export default function NewRepositoryPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleProviderSelect = async (provider: 'github') => {
    try {
      setIsLoading(true)
      setError(null)

      const supabase = createClient()
      const redirectUrl = new URL('/auth/callback', window.location.origin).toString()
      
      // Log the redirect URL for debugging
      console.log('Redirect URL:', redirectUrl)
      console.log('Window origin:', window.location.origin)
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl,
          scopes: 'read:user user:email repo',
          queryParams: {
            allow_signup: 'true'
          }
        }
      })

      if (error) {
        console.error('OAuth error:', error)
        throw error
      }
      
      if (!data?.url) {
        console.error('No OAuth URL returned')
        throw new Error('No OAuth URL returned')
      }

      console.log('OAuth URL:', data.url)

      // Redirect to OAuth provider
      window.location.href = data.url
    } catch (err) {
      logError('Failed to handle provider selection', {
        metadata: { 
          error: err instanceof Error ? err.message : 'Unknown error',
          provider 
        }
      })
      setError('Failed to connect to provider. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Connect Repository</h1>
          <p className="text-muted-foreground mt-2">
            Choose a version control provider to get started
          </p>
        </div>
        <Link href="/dashboard/repositories">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Repositories
          </Button>
        </Link>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Provider Selection */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Button
          variant="outline"
          className="p-6 h-auto hover:border-primary"
          onClick={() => handleProviderSelect('github')}
          disabled={isLoading}
        >
          <div className="space-y-4 w-full">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <Github className="h-8 w-8 text-[#333]" />
                <h3 className="text-lg font-semibold mt-2 text-left">GitHub</h3>
                <p className="text-sm text-muted-foreground text-left">
                  Connect your GitHub repositories and start creating stories
                </p>
              </div>
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GitBranch className="h-4 w-4" />
              <span>Public & Private repos</span>
            </div>
          </div>
        </Button>

        {/* Future providers will be added here */}
        <Card className="p-6 border-dashed opacity-50">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">More Coming Soon</h3>
              <p className="text-sm text-muted-foreground">
                Support for GitLab, Bitbucket, and other providers is coming soon
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 