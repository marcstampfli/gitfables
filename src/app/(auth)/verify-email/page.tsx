/**
 * @module app/verify-email/page
 * @description Email verification page shown after signup
 */

'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { Skeleton } from '@/components/ui/skeleton'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="container relative flex flex-col items-center justify-center min-h-screen">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <Link href="/" className="mx-auto">
                <Logo size="lg" />
              </Link>
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Check your email
              </h1>
              <p className="text-sm text-muted-foreground">
                We&apos;ve sent a verification link to{' '}
                <span className="font-medium text-foreground">
                  {email}
                </span>
              </p>
            </div>

            <div className="grid gap-6">
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <h2 className="font-medium">What happens next?</h2>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Click the link in your email to verify your account</li>
                    <li>You&apos;ll be redirected back to GitFables</li>
                    <li>You can then sign in and start creating stories</li>
                  </ul>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login">
                    Return to login
                  </Link>
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Didn&apos;t receive the email?{' '}
                <Link href="/resend-verification" className="text-primary hover:underline">
                  Click here to resend
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="container relative flex flex-col items-center justify-center min-h-screen">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <Skeleton className="h-12 w-32 mx-auto" />
              <div className="flex justify-center">
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <VerifyEmailContent />
    </Suspense>
  )
} 