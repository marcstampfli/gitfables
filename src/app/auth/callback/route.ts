import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const error = url.searchParams.get('error')
  const errorDescription = url.searchParams.get('error_description')
  const hash = url.hash

  // If there's an error in the URL or hash fragment
  if (error || errorDescription || hash.includes('error=')) {
    // Extract error details from hash if present
    const hashError = hash.match(/error_description=([^&]+)/)?.[1]
    const finalErrorDescription = hashError ? decodeURIComponent(hashError) : errorDescription

    // Redirect to login with error details
    return NextResponse.redirect(
      new URL(`/login?error=auth_error&details=${encodeURIComponent(finalErrorDescription || '')}`, url.origin)
    )
  }

  // For non-error cases, return a 200 response
  return new Response(null, { status: 200 })
} 