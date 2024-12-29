/**
 * @module lib/utils/logger
 * @description Logging utility for consistent error and event tracking
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogMetadata {
  context?: string
  metadata?: Record<string, unknown>
}

interface PostgresError {
  code: string
  message: string
  details?: string
  hint?: string
}

/**
 * Log an error with consistent formatting and optional metadata
 */
export function logError(
  message: string,
  error?: Error | PostgresError | unknown,
  metadata?: LogMetadata
): void {
  // In production, we would send this to a logging service
  if (process.env.NODE_ENV === 'production') {
    // Send to logging service (e.g., Sentry, LogRocket)
    return
  }

  // In development, log to console with formatting
  const timestamp = new Date().toISOString()
  
  // Handle Postgres errors
  if (error && typeof error === 'object' && 'code' in error) {
    const pgError = error as PostgresError
    const errorObject = new Error(pgError.message)
    errorObject.name = `PostgresError[${pgError.code}]`
    error = errorObject
  }
  
  // Handle other errors
  const errorObject = error instanceof Error ? error : error ? new Error(JSON.stringify(error)) : null
  
  const logData = {
    timestamp,
    level: 'error' as LogLevel,
    message,
    context: metadata?.context,
    ...(metadata?.metadata && { metadata: metadata.metadata }),
    ...(errorObject && {
      error: {
        name: errorObject.name,
        message: errorObject.message,
        stack: errorObject.stack,
      }
    })
  }

  // Only log to console in development
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error(JSON.stringify(logData, null, 2))
  }
}

/**
 * Log debug information with consistent formatting
 */
export function logDebug(
  message: string,
  metadata?: LogMetadata
): void {
  logEvent(message, 'debug', metadata)
}

/**
 * Log an event with consistent formatting and optional metadata
 */
export function logEvent(
  message: string,
  level: LogLevel = 'info',
  metadata?: LogMetadata
): void {
  // In production, we would send this to a logging service
  if (process.env.NODE_ENV === 'production') {
    // Send to logging service (e.g., Sentry, LogRocket)
    return
  }

  // In development, log to console with formatting
  const timestamp = new Date().toISOString()
  const logData = {
    timestamp,
    level,
    message,
    context: metadata?.context,
    ...(metadata?.metadata && { metadata: metadata.metadata })
  }

  // Only log to console in development
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console[level](JSON.stringify(logData, null, 2))
  }
} 