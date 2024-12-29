/**
 * @module middleware
 * @description Global middleware configuration
 */

import { type NextRequest, NextResponse } from 'next/server'
import { validateApiKey } from '@/lib/utils/validation'

export async function middleware(request: NextRequest) {
  // Skip non-API routes
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Validate API key
  return validateApiKey(request)
}

/**
 * Middleware configuration
 */
export const config = {
  matcher: [
    // Match all API routes except auth endpoints
    '/api/((?!auth).*)',
  ],
} 