/**
 * @module types/next
 * @description Type definitions for Next.js app router
 */

import type { NextRequest } from 'next/server'

export interface PageProps<T = Record<string, never>> {
  params: T
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface RouteContext<T = Record<string, never>> {
  params: T
}

export interface RouteHandlerContext<T = Record<string, never>> {
  params: T
}

export type RouteHandler = (
  request: NextRequest,
  context: RouteHandlerContext
) => Promise<Response> | Response

// Re-export Next.js types to ensure compatibility
declare module 'next' {
  interface PageProps {
    params: Record<string, string>
    searchParams: { [key: string]: string | string[] | undefined }
  }
}

declare module 'next/server' {
  interface RouteHandlerContext {
    params: Record<string, string>
  }
} 