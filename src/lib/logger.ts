/**
 * @module lib/logger
 * @description Centralized logging utility for the application
 */

type _LogLevel = 'error' | 'warn' | 'info' | 'debug'

interface LogOptions {
  context?: string
  metadata?: Record<string, unknown>
}

/**
 * Log an error with context and optional metadata
 * 
 * @param {Error | string} error - The error object or message
 * @param {LogOptions} options - Additional logging options
 */
export function logError(error: Error | string, options: LogOptions = {}) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error(
      `[ERROR]${options.context ? ` [${options.context}]` : ''}:`,
      error,
      options.metadata || ''
    )
  }
  // TODO: In production, send to error tracking service
}

/**
 * Log a warning with context and optional metadata
 * 
 * @param {string} message - The warning message
 * @param {LogOptions} options - Additional logging options
 */
export function logWarning(message: string, options: LogOptions = {}) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      `[WARN]${options.context ? ` [${options.context}]` : ''}:`,
      message,
      options.metadata || ''
    )
  }
}

/**
 * Log debug information (only in development)
 * 
 * @param {string} message - The debug message
 * @param {LogOptions} options - Additional logging options
 */
export function logDebug(message: string, options: LogOptions = {}) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.debug(
      `[DEBUG]${options.context ? ` [${options.context}]` : ''}:`,
      message,
      options.metadata || ''
    )
  }
} 