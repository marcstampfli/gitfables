/**
 * @module types/next
 * @description Type definitions for Next.js app router
 */

import type { NextRequest } from 'next/server'

export type DynamicRouteParams = Record<string, string>

export interface PageProps<T extends DynamicRouteParams = DynamicRouteParams> {
  params: T
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface RouteContext<T extends DynamicRouteParams = DynamicRouteParams> {
  params: T
}

export interface RouteHandlerContext<T extends DynamicRouteParams = DynamicRouteParams> {
  params: T
}

export type RouteHandler<T extends DynamicRouteParams = DynamicRouteParams> = (
  request: NextRequest,
  context: RouteHandlerContext<T>
) => Promise<Response> | Response

// Re-export Next.js types to ensure compatibility
declare module 'next' {
  // Override Next.js PageProps type
  export interface PageProps<T extends DynamicRouteParams = DynamicRouteParams> {
    params: T
    searchParams: { [key: string]: string | string[] | undefined }
  }
}

declare module 'next/server' {
  // Override Next.js RouteHandlerContext type
  export interface RouteHandlerContext<T extends DynamicRouteParams = DynamicRouteParams> {
    params: T
  }
} 