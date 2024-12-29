/**
 * @module lib/utils/logger
 * @description Utility functions for logging
 */

export interface LogMetadata {
  [key: string]: unknown
  context?: string
  action?: string
  timestamp?: string
}

/**
 * Logs debug information with optional metadata
 */
export function logDebug(message: string, metadata: LogMetadata = {}) {
  if (process.env.NODE_ENV === 'development') {
    console.debug('Debug:', {
      message,
      context: metadata.context || 'app',
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString()
      }
    })
  }
}

/**
 * Logs an error with optional context and metadata
 */
export function logError(
  message: string | Error,
  error?: unknown,
  metadata?: LogMetadata
): void {
  const errorMessage = message instanceof Error ? message.message : message
  const errorObject = message instanceof Error ? message : error

  console.error(
    `[ERROR] ${errorMessage}`,
    errorObject,
    metadata
  )
} 