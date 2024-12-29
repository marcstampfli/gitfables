/**
 * @module types/logger
 * @description Type definitions for application logging.
 * These types define the structure of log messages and provide type safety
 * for logging operations across the application.
 * 
 * @example
 * ```ts
 * import type { Logger, LogLevel, LogMessage } from '@/types'
 * 
 * // Create a log message
 * const log: LogMessage = {
 *   level: 'info',
 *   message: 'User logged in',
 *   context: 'auth',
 *   metadata: { userId: '123' }
 * }
 * 
 * // Log the message
 * logger.log(log)
 * ```
 */

/**
 * Available log levels for the application.
 * Ordered by severity (debug being lowest, error being highest).
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

/**
 * Log message structure.
 * Defines the format of log messages throughout the application.
 * 
 * @example
 * ```ts
 * const log: LogMessage = {
 *   level: 'error',
 *   message: 'Failed to connect to database',
 *   context: 'database',
 *   timestamp: new Date().toISOString(),
 *   metadata: {
 *     error: 'Connection timeout',
 *     retries: 3
 *   }
 * }
 * ```
 */
export interface LogMessage {
  level: LogLevel
  message: string
  context?: string
  timestamp?: string
  metadata?: Record<string, unknown>
}

/**
 * Log context structure.
 * Provides additional context for log messages.
 * 
 * @example
 * ```ts
 * const context: LogContext = {
 *   service: 'auth-service',
 *   environment: 'production',
 *   version: '1.0.0',
 *   metadata: {
 *     region: 'us-west-2',
 *     instance: 'web-1'
 *   }
 * }
 * ```
 */
export interface LogContext {
  service?: string
  environment?: string
  version?: string
  metadata?: Record<string, unknown>
}

/**
 * Logger configuration options.
 * Used to configure logger instances.
 * 
 * @example
 * ```ts
 * const config: LoggerConfig = {
 *   level: 'info',
 *   format: 'json',
 *   destination: 'console',
 *   context: {
 *     service: 'api',
 *     environment: 'production'
 *   }
 * }
 * ```
 */
export interface LoggerConfig {
  level: LogLevel
  format?: 'json' | 'text'
  destination?: 'console' | 'file'
  context?: LogContext
}

/**
 * Logger interface.
 * Defines the contract for logger implementations.
 * 
 * @example
 * ```ts
 * class ConsoleLogger implements Logger {
 *   log(message: LogMessage): void {
 *     console.log(JSON.stringify(message))
 *   }
 *   
 *   error(message: string, metadata?: Record<string, unknown>): void {
 *     this.log({
 *       level: 'error',
 *       message,
 *       metadata
 *     })
 *   }
 *   
 *   // ... implement other methods
 * }
 * ```
 */
export interface Logger {
  log(message: LogMessage): void
  debug(message: string, metadata?: Record<string, unknown>): void
  info(message: string, metadata?: Record<string, unknown>): void
  warn(message: string, metadata?: Record<string, unknown>): void
  error(message: string, metadata?: Record<string, unknown>): void
  setContext(context: LogContext): void
  getContext(): LogContext
}

/**
 * Log formatter interface.
 * Defines the contract for log message formatters.
 * 
 * @example
 * ```ts
 * class JSONFormatter implements LogFormatter {
 *   format(message: LogMessage): string {
 *     return JSON.stringify(message)
 *   }
 * }
 * ```
 */
export interface LogFormatter {
  format(message: LogMessage): string
}

/**
 * Log transport interface.
 * Defines the contract for log message transports.
 * 
 * @example
 * ```ts
 * class ConsoleTransport implements LogTransport {
 *   send(message: LogMessage): void {
 *     console.log(message)
 *   }
 * }
 * ```
 */
export interface LogTransport {
  send(message: LogMessage): void
} 