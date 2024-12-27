/**
 * @module lib/vcs/types
 * @description Type definitions for version control system (VCS) integrations.
 * Provides interfaces for VCS providers, authentication, configuration, and error handling.
 * These types are used to ensure consistent integration with different VCS platforms.
 * 
 * @example
 * ```ts
 * import type { VCSProvider, VCSConfig } from '@/lib/vcs/types'
 * 
 * class GitHubProvider implements VCSProvider {
 *   async init(config: VCSConfig) {
 *     // Initialize GitHub provider
 *   }
 * }
 * ```
 */

import type { CommitData, RepoStats, VCSPlatform, ErrorType } from '@/types'

/**
 * VCS provider configuration
 * 
 * @interface VCSConfig
 * @property {VCSPlatform} platform - VCS platform identifier (e.g., 'github', 'gitlab')
 * @property {string} [baseUrl] - Base URL for self-hosted instances
 * @property {string} [token] - Authentication token
 * @property {string} [username] - Username for authentication
 * 
 * @example
 * ```ts
 * const config: VCSConfig = {
 *   platform: 'github',
 *   token: 'github_pat_...',
 *   username: 'octocat'
 * }
 * ```
 */
export interface VCSConfig {
  platform: VCSPlatform
  baseUrl?: string
  token?: string
  username?: string
}

/**
 * VCS authentication options
 * 
 * @interface VCSAuthOptions
 * @property {string} token - Authentication token (e.g., Personal Access Token)
 * @property {string} [username] - Username associated with the token
 * @property {string[]} [scopes] - Required OAuth scopes or permissions
 * 
 * @example
 * ```ts
 * const auth: VCSAuthOptions = {
 *   token: 'github_pat_...',
 *   username: 'octocat',
 *   scopes: ['repo', 'user']
 * }
 * ```
 */
export interface VCSAuthOptions {
  token: string
  username?: string
  scopes?: string[]
}

/**
 * Options for fetching commits from a repository
 * 
 * @interface CommitFetchOptions
 * @property {string} owner - Repository owner or organization
 * @property {string} repo - Repository name
 * @property {string} [branch] - Branch to fetch commits from
 * @property {Date} [since] - Fetch commits after this date
 * @property {Date} [until] - Fetch commits before this date
 * @property {number} [perPage] - Number of commits per page
 * @property {number} [page] - Page number for pagination
 * 
 * @example
 * ```ts
 * const options: CommitFetchOptions = {
 *   owner: 'octocat',
 *   repo: 'Hello-World',
 *   branch: 'main',
 *   since: new Date('2024-01-01'),
 *   perPage: 100
 * }
 * ```
 */
export interface CommitFetchOptions {
  owner: string
  repo: string
  branch?: string
  since?: Date
  until?: Date
  perPage?: number
  page?: number
}

/**
 * VCS error details with type information
 * 
 * @interface VCSError
 * @property {ErrorType} type - Type of error (e.g., 'auth', 'rate_limit')
 * @property {string} message - Human-readable error message
 * @property {number} [statusCode] - HTTP status code if applicable
 * @property {unknown} [raw] - Raw error data from the VCS provider
 * 
 * @example
 * ```ts
 * const error: VCSError = {
 *   type: 'rate_limit',
 *   message: 'API rate limit exceeded',
 *   statusCode: 429,
 *   raw: response.data
 * }
 * ```
 */
export interface VCSError {
  type: ErrorType
  message: string
  statusCode?: number
  raw?: unknown
}

/**
 * Interface that all VCS providers must implement
 * 
 * @interface VCSProvider
 * @description Defines the contract for VCS provider implementations.
 * Each provider (GitHub, GitLab, etc.) must implement these methods
 * to ensure consistent behavior across the application.
 * 
 * @example
 * ```ts
 * class GitHubProvider implements VCSProvider {
 *   private config?: VCSConfig
 *   private client?: Octokit
 * 
 *   async init(config: VCSConfig) {
 *     this.config = config
 *     this.client = new Octokit({ auth: config.token })
 *   }
 * 
 *   async fetchCommits(options: CommitFetchOptions) {
 *     // Fetch commits from GitHub
 *     return this.client.repos.listCommits(...)
 *   }
 * }
 * ```
 */
export interface VCSProvider {
  /**
   * Initialize the provider with configuration
   * 
   * @param {VCSConfig} config - Provider configuration
   * @returns {Promise<void>}
   * @throws {VCSError} If initialization fails
   */
  init(config: VCSConfig): Promise<void>

  /**
   * Authenticate with the VCS platform
   * 
   * @param {VCSAuthOptions} options - Authentication options
   * @returns {Promise<void>}
   * @throws {VCSError} If authentication fails
   */
  authenticate(options: VCSAuthOptions): Promise<void>

  /**
   * Fetch commits from a repository
   * 
   * @param {CommitFetchOptions} options - Commit fetch options
   * @returns {Promise<CommitData[]>} List of commits
   * @throws {VCSError} If fetching commits fails
   */
  fetchCommits(options: CommitFetchOptions): Promise<CommitData[]>

  /**
   * Fetch repository statistics
   * 
   * @param {string} owner - Repository owner
   * @param {string} repo - Repository name
   * @returns {Promise<RepoStats>} Repository statistics
   * @throws {VCSError} If fetching stats fails
   */
  fetchRepoStats(owner: string, repo: string): Promise<RepoStats>

  /**
   * Check if the provider is authenticated
   * 
   * @returns {boolean} True if authenticated
   */
  isAuthenticated(): boolean

  /**
   * Get the current configuration
   * 
   * @returns {VCSConfig} Current configuration
   * @throws {Error} If provider is not initialized
   */
  getConfig(): VCSConfig
} 