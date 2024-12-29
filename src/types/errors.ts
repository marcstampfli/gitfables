/**
 * @module types/errors
 * @description Types for error handling and validation
 */

export type ErrorType = 
  | 'validation_error'
  | 'auth_error'
  | 'network_error'
  | 'api_error'
  | 'database_error'
  | 'not_found'
  | 'permission_denied'
  | 'rate_limit'
  | 'unknown_error'

export interface AppError extends Error {
  type: ErrorType
  code?: string
  metadata?: Record<string, unknown>
}

export interface ValidationError extends AppError {
  type: 'validation_error'
  field?: string
  value?: unknown
  constraints?: Record<string, string>
} 