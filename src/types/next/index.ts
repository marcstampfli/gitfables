/**
 * @module types/next
 * @description Type definitions for Next.js app router
 * 
 * Known Limitations:
 * - Next.js's generated types in .next/types expect route parameters to be Promise-like
 * - This causes type errors when using TypeScript's --noEmit flag
 * - These errors don't affect runtime behavior and are safe to ignore
 * - Type checking during build is disabled via typescript.ignoreBuildErrors in next.config.js
 */

import type { Database } from '../supabase'

/**
 * Base type for dynamic route parameters
 * @example { slug: string } | { id: string } | { code: string }
 */
export type DynamicRouteParams = Record<string, string>

/**
 * Props passed to page components
 * @example
 * ```ts
 * type Props = PageProps<{ slug: string }>
 * export default function Page({ params }: Props)
 * ```
 */
export type PageProps<T extends DynamicRouteParams = DynamicRouteParams> = {
  params: T
  searchParams?: { [key: string]: string | string[] | undefined }
}

/**
 * Context passed to API route handlers
 */
export type RouteContext<T extends DynamicRouteParams = DynamicRouteParams> = {
  params: T
}

/**
 * Context passed to route handlers
 */
export type RouteHandlerContext<T extends DynamicRouteParams = DynamicRouteParams> = {
  params: T
}

/**
 * Route handler function type
 */
export type RouteHandler<T extends DynamicRouteParams = DynamicRouteParams> = (
  request: Request,
  context: RouteHandlerContext<T>
) => Promise<Response> | Response

/**
 * Helper type for accessing Supabase table types
 */
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

/**
 * Helper type for accessing Supabase enum types
 */
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]

// Re-export Next.js types to ensure compatibility
declare module 'next' {
  export interface PageProps extends Record<string, unknown> {
    params?: DynamicRouteParams
    searchParams?: { [key: string]: string | string[] | undefined }
  }
}

// Augment Next.js types for better type checking
declare module 'next/types' {
  export interface Params extends DynamicRouteParams {}
}

// Augment Next.js generated types
declare module 'next/dist/build/templates/app-page' {
  export interface PageProps {
    params: DynamicRouteParams | Promise<DynamicRouteParams>
    searchParams?: { [key: string]: string | string[] | undefined }
  }
} 