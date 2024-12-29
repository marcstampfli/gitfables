/**
 * @module middleware
 * @description Global middleware configuration
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateApiKey } from '@/middleware/api/auth'
import type { ApiScope } from '@/types/api/api-keys'

export async function middleware(request: NextRequest) {
  // Skip non-API routes
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Get required scopes based on HTTP method
  const requiredScopes = getRequiredScopes(request.method)

  // Validate API key
  return validateApiKey(request, requiredScopes)
}

/**
 * Get required scopes based on HTTP method
 */
function getRequiredScopes(method: string | undefined): ApiScope[] {
  switch (method?.toUpperCase()) {
    case 'GET':
      return ['read']
    case 'POST':
      return ['write']
    case 'PUT':
    case 'PATCH':
      return ['write']
    case 'DELETE':
      return ['delete']
    default:
      return []
  }
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