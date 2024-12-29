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

interface FormattedError {
  message: string
  error: {
    name?: string
    message: string
    stack?: string
  }
  context: string
  metadata: LogMetadata
}

function formatError(message: string, error: unknown, metadata: LogMetadata = {}): FormattedError {
  const errorObject = error instanceof Error ? error : new Error(String(error))
  
  return {
    message,
    error: {
      name: errorObject.name,
      message: errorObject.message,
      stack: errorObject.stack
    },
    context: metadata.context || 'app',
    metadata
  }
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
export function logError(message: string, error: unknown, metadata: LogMetadata = {}) {
  const logData = formatError(message, error, metadata)
  const consoleData = {
    message: logData.message,
    error: logData.error,
    context: logData.context,
    metadata: logData.metadata
  }

  if (process.env.NODE_ENV === 'development') {
    // In development, log the full error object for debugging
    console.error('Error:', {
      ...consoleData,
      stack: logData.error.stack
    })
  } else {
    // In production, log a cleaner error message
    console.error(`Error: ${logData.message}`, {
      context: logData.context,
      metadata: logData.metadata
    })
  }
} 