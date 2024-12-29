'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { logError } from '@/lib/utils/logger'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to error monitoring service
    logError('Dashboard error occurred', { 
      metadata: { 
        error,
        digest: error.digest,
        name: error.name,
        stack: error.stack 
      }
    })
  }, [error])

  return (
    <div className="container py-10">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>
          <div className="mt-2">
            <p className="text-sm text-muted-foreground">
              {error.message || 'An unexpected error occurred while loading the dashboard.'}
            </p>
            {error.digest && (
              <p className="mt-1 text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
          </div>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => reset()}
          >
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  )
} 