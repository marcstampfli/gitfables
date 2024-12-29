/**
 * @module types/api
 * @description Type definitions for API requests and responses.
 * These types define the structure of API endpoints, requests,
 * and responses for type-safe API interactions.
 * 
 * @example
 * ```ts
 * import type { APIResponse, APIError } from '@/types'
 * 
 * // Make API request
 * const response: APIResponse<User> = await api.get('/users/me')
 * 
 * if (response.error) {
 *   handleError(response.error)
 * } else {
 *   const user = response.data
 * }
 * ```
 */

/**
 * Standard API response structure.
 * Provides consistent response formatting across endpoints.
 * 
 * @template T The type of the response data
 * 
 * @example
 * ```ts
 * const response: APIResponse<User> = {
 *   data: {
 *     id: 'user-123',
 *     name: 'John Doe'
 *   },
 *   error: null,
 *   metadata: {
 *     timestamp: '2024-01-01T00:00:00Z'
 *   }
 * }
 * ```
 */
export interface APIResponse<T> {
  data: T | null
  error: APIError | null
  metadata?: {
    timestamp: string
    requestId?: string
    [key: string]: unknown
  }
}

/**
 * Standard API error structure.
 * Provides consistent error formatting across endpoints.
 * 
 * @example
 * ```ts
 * const error: APIError = {
 *   code: 'VALIDATION_ERROR',
 *   message: 'Invalid input',
 *   details: {
 *     field: 'email',
 *     constraint: 'required'
 *   }
 * }
 * ```
 */
export interface APIError {
  code: string
  message: string
  details?: Record<string, unknown>
  stack?: string
}

/**
 * API endpoint configuration.
 * Used to define API endpoint behavior.
 * 
 * @example
 * ```ts
 * const endpoint: APIEndpoint = {
 *   method: 'POST',
 *   path: '/users',
 *   auth: true,
 *   rateLimit: {
 *     requests: 100,
 *     period: 3600
 *   }
 * }
 * ```
 */
export interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  auth?: boolean
  rateLimit?: {
    requests: number
    period: number
  }
}

/**
 * API request options.
 * Used to configure individual API requests.
 * 
 * @example
 * ```ts
 * const options: APIRequestOptions = {
 *   headers: {
 *     'Content-Type': 'application/json'
 *   },
 *   timeout: 5000,
 *   retries: 3
 * }
 * ```
 */
export interface APIRequestOptions {
  headers?: Record<string, string>
  timeout?: number
  retries?: number
  signal?: AbortSignal
}

/**
 * API client configuration.
 * Used to configure API client instances.
 * 
 * @example
 * ```ts
 * const config: APIConfig = {
 *   baseUrl: 'https://api.example.com',
 *   version: 'v1',
 *   timeout: 5000,
 *   headers: {
 *     'API-Key': 'your-api-key'
 *   }
 * }
 * ```
 */
export interface APIConfig {
  baseUrl: string
  version?: string
  timeout?: number
  headers?: Record<string, string>
  retries?: number
}

/**
 * API client interface.
 * Defines the contract for API client implementations.
 * 
 * @example
 * ```ts
 * class HTTPClient implements APIClient {
 *   async get<T>(path: string, options?: APIRequestOptions): Promise<APIResponse<T>> {
 *     // Make GET request
 *   }
 *   
 *   async post<T>(path: string, data: unknown, options?: APIRequestOptions): Promise<APIResponse<T>> {
 *     // Make POST request
 *   }
 * }
 * ```
 */
export interface APIClient {
  get<T>(path: string, options?: APIRequestOptions): Promise<APIResponse<T>>
  post<T>(path: string, data: unknown, options?: APIRequestOptions): Promise<APIResponse<T>>
  put<T>(path: string, data: unknown, options?: APIRequestOptions): Promise<APIResponse<T>>
  patch<T>(path: string, data: unknown, options?: APIRequestOptions): Promise<APIResponse<T>>
  delete<T>(path: string, options?: APIRequestOptions): Promise<APIResponse<T>>
}

/**
 * API route handler type.
 * Used for Next.js API route handlers.
 * 
 * @example
 * ```ts
 * const handler: APIRouteHandler = async (req, res) => {
 *   try {
 *     const data = await handleRequest(req)
 *     res.status(200).json({ data })
 *   } catch (error) {
 *     res.status(500).json({ error })
 *   }
 * }
 * ```
 */
export type APIRouteHandler = (
  req: Request,
  res: Response
) => void | Promise<void> 