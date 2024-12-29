/**
 * @module types/error
 * @description Type definitions for error handling and error types.
 * These types provide a standardized way to handle and report errors
 * across the application.
 * 
 * @example
 * ```ts
 * import type { AppError, ErrorType } from '@/types'
 * 
 * // Create a typed error
 * const error: AppError = {
 *   type: 'validation_error',
 *   message: 'Invalid input',
 *   code: 'INVALID_INPUT',
 *   details: { field: 'email' }
 * }
 * 
 * // Handle error
 * handleError(error)
 * ```
 */

/**
 * Standard error types used throughout the application.
 * Helps categorize and handle errors consistently.
 */
export type ErrorType =
  | 'validation_error'    // Input validation errors
  | 'auth_error'         // Authentication/authorization errors
  | 'api_error'          // External API errors
  | 'network_error'      // Network-related errors
  | 'database_error'     // Database operation errors
  | 'not_found_error'    // Resource not found errors
  | 'rate_limit_error'   // Rate limiting errors
  | 'unknown_error'      // Uncategorized errors

/**
 * Standard error codes used throughout the application.
 * Provides more specific error identification.
 */
export type ErrorCode =
  | 'INVALID_INPUT'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'RATE_LIMITED'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR'
  | 'DATABASE_ERROR'
  | 'UNKNOWN_ERROR'

/**
 * Standard error structure used throughout the application.
 * Provides consistent error reporting and handling.
 * 
 * @example
 * ```ts
 * const error: AppError = {
 *   type: 'validation_error',
 *   message: 'Invalid email format',
 *   code: 'INVALID_INPUT',
 *   path: ['user', 'email'],
 *   details: {
 *     value: 'invalid-email',
 *     constraint: 'email'
 *   }
 * }
 * ```
 */
export interface AppError {
  type: ErrorType
  message: string
  code: ErrorCode
  path?: (string | number)[]
  details?: Record<string, unknown>
  cause?: Error | unknown
}

/**
 * Error handler function type.
 * Used for consistent error handling across the application.
 * 
 * @example
 * ```ts
 * const handleError: ErrorHandler = (error) => {
 *   if (error.type === 'validation_error') {
 *     // Handle validation error
 *     showValidationError(error)
 *   } else {
 *     // Handle other errors
 *     showGeneralError(error)
 *   }
 * }
 * ```
 */
export type ErrorHandler = (error: AppError) => void

/**
 * Error reporter function type.
 * Used to report errors to external services.
 * 
 * @example
 * ```ts
 * const reportError: ErrorReporter = async (error) => {
 *   await sentryClient.captureError(error)
 *   console.error('Error reported:', error)
 * }
 * ```
 */
export type ErrorReporter = (error: AppError) => Promise<void>

/**
 * Error context interface.
 * Provides additional context for error handling and reporting.
 * 
 * @example
 * ```ts
 * const context: ErrorContext = {
 *   userId: 'user-123',
 *   action: 'create_story',
 *   timestamp: new Date().toISOString(),
 *   metadata: {
 *     browser: 'Chrome',
 *     version: '1.0.0'
 *   }
 * }
 * ```
 */
export interface ErrorContext {
  userId?: string
  action?: string
  timestamp: string
  metadata?: Record<string, unknown>
} 