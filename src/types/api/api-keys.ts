/**
 * @module types/api-keys
 * @description Type definitions for API key management
 */

export type ApiScope = 
  | 'stories:read'
  | 'stories:write'
  | 'repositories:read'
  | 'repositories:write'

export interface ApiKey {
  id: string
  name: string
  scopes: ApiScope[]
  last_used: string | null
  created_at: string
  expires_at: string | null
  rate_limit: number
  rate_interval: string // PostgreSQL interval as string
}

export interface ApiKeyWithToken extends ApiKey {
  token: string
}

export interface CreateApiKeyRequest {
  name: string
  scopes: ApiScope[]
  expires_in_days?: number
  rate_limit?: number
  rate_interval?: string
}

export interface ApiKeyUsageStats {
  hour: string
  endpoint: string
  method: string
  request_count: number
  avg_response_time: number
  successful_requests: number
  failed_requests: number
  last_updated: string
}

export interface ApiKeyUsage {
  id: string
  api_key_id: string
  endpoint: string
  method: string
  status_code: number
  response_time: number
  created_at: string
} 