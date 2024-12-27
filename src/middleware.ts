/**
 * @module middleware
 * @description Next.js middleware for handling authentication and request processing.
 * Initializes Supabase client and manages authentication state for all matched routes.
 *
 * @example
 * ```ts
 * // This middleware is automatically executed by Next.js for matched routes
 * // It handles authentication and sets up the Supabase client
 * ```
 */

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Database } from '@/types/supabase'

// Validate environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

/**
 * Next.js middleware function
 * Handles authentication and request processing for all matched routes
 *
 * @param {NextRequest} request - The incoming request object
 * @returns {Promise<NextResponse>} The response object
 */
export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({
    req: request,
    res: response,
  })

  await supabase.auth.getSession()
  return response
}

/**
 * Middleware configuration
 * Defines which routes should be processed by the middleware
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public files
     * - api routes
     * - root route (handled by route.ts)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|^/$).*)',
  ],
} 