/**
 * @module types
 * @description Common type definitions for the application
 */

/**
 * Theme configuration
 */
export interface ThemeConfig {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  isDark: boolean
}

/**
 * Toast notification type
 */
export type ToastType = 'info' | 'success' | 'warning' | 'error'

/**
 * Toast notification
 */
export interface Toast {
  id: string
  type: ToastType
  title: string
  message: string
  duration?: number
}

/**
 * Version control system platform
 */
export type VCSPlatform = 'github' | 'gitlab' | 'bitbucket'

/**
 * Repository statistics
 */
export interface RepoStats {
  stars: number
  forks: number
  watchers: number
  issues: number
  lastUpdated: string
}

/**
 * Commit data
 */
export interface CommitData {
  id: string
  message: string
  author: string
  date: string
  additions: number
  deletions: number
  files: number
  stats?: {
    total: number
    additions: number
    deletions: number
  }
}

/**
 * Error types
 */
export type ErrorType = 
  | 'auth_error'
  | 'network_error'
  | 'api_error'
  | 'validation_error'
  | 'unknown_error'

/**
 * API error response
 */
export interface APIError {
  type: ErrorType
  message: string
  code?: number
  details?: Record<string, unknown>
} 