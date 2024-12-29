/**
 * @module types/api
 * @description Type definitions for API-related functionality
 */

export type ApiScope = 'read' | 'write' | 'delete'

export interface ApiRequest {
  method: string
  path: string
  scopes: ApiScope[]
  token?: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
} 