/**
 * @module types/vcs
 * @description Type definitions for version control system integrations.
 * These types define the core interfaces and types for interacting with various VCS platforms
 * like GitHub, GitLab, and Bitbucket.
 * 
 * @example
 * ```ts
 * import type { VCSProvider, VCSConfig, Repository } from '@/types'
 * 
 * // Configure a VCS provider
 * const config: VCSConfig = {
 *   platform: 'github',
 *   token: process.env.GITHUB_TOKEN
 * }
 * 
 * // Initialize provider
 * await provider.init(config)
 * 
 * // Fetch repository data
 * const repo = await provider.fetchRepoStats('owner', 'repo')
 * ```
 */

/** Supported version control system platforms */
export type VCSPlatform = 'github' | 'gitlab' | 'bitbucket'

/**
 * Configuration options for VCS providers.
 * Used to initialize and configure provider instances.
 * 
 * @example
 * ```ts
 * const config: VCSConfig = {
 *   platform: 'github',
 *   baseUrl: 'https://api.github.com',
 *   token: 'your-access-token'
 * }
 * ```
 */
export interface VCSConfig {
  platform: VCSPlatform
  baseUrl?: string
  token?: string
}

/**
 * Authentication options for VCS providers.
 * Used to authenticate with the VCS platform.
 * 
 * @example
 * ```ts
 * const authOptions: VCSAuthOptions = {
 *   token: 'your-access-token',
 *   scope: ['repo', 'user']
 * }
 * ```
 */
export interface VCSAuthOptions {
  token: string
  scope?: string[]
}

/**
 * Options for fetching commits from a repository.
 * Supports pagination and date range filtering.
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
 * Standard error structure for VCS operations.
 * Provides consistent error handling across providers.
 * 
 * @example
 * ```ts
 * const error: VCSError = {
 *   type: 'auth_error',
 *   message: 'Invalid access token',
 *   raw: originalError
 * }
 * ```
 */
export interface VCSError {
  type: 'auth_error' | 'api_error' | 'validation_error' | 'unknown_error'
  message: string
  raw?: unknown
}

/**
 * Configuration for a VCS provider integration.
 * Used to define available VCS providers in the application.
 * 
 * @example
 * ```ts
 * const githubConfig: VCSProviderConfig = {
 *   id: 'github',
 *   name: 'GitHub',
 *   icon: 'github-icon',
 *   isActive: true,
 *   authUrl: 'https://github.com/login/oauth/authorize'
 * }
 * ```
 */
export interface VCSProviderConfig {
  id: string
  name: string
  icon: string
  isActive: boolean
  authUrl: string
}

/**
 * Provider implementation interface.
 * Defines the required methods for VCS provider implementations.
 */
export interface VCSProviderImpl {
  init(config: VCSConfig): Promise<void>
  authenticate(options: VCSAuthOptions): Promise<void>
  fetchCommits(options: CommitFetchOptions): Promise<CommitData[]>
  fetchRepoStats(owner: string, repo: string): Promise<RepoStats>
  isAuthenticated(): boolean
  getConfig(): VCSConfig
}

/**
 * Core interface for VCS provider metadata.
 * Used for provider selection and display.
 */
export interface VCSProvider {
  /** Unique identifier for the provider */
  id: string
  /** Display name of the provider */
  name: string
  /** Icon identifier for the provider */
  icon: string
  /** Whether the provider is currently active */
  isActive?: boolean
  /** Base URL for API requests */
  baseUrl?: string
  /** OAuth authorization URL */
  authUrl?: string
  description: string
}

/**
 * Repository information from a VCS platform.
 * Contains metadata about a code repository.
 * 
 * @example
 * ```ts
 * const repo: Repository = {
 *   id: 123,
 *   name: 'Hello-World',
 *   fullName: 'octocat/Hello-World',
 *   url: 'https://github.com/octocat/Hello-World',
 *   description: 'My first repository',
 *   language: 'TypeScript',
 *   // ... other properties
 * }
 * ```
 */
export interface Repository {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  languages_url: string
  owner: string
  stargazers_count: number
  forks_count: number
  languages: Record<string, number> | null
  default_branch: string
  watchers_count: number
  size: number
}

/**
 * Commit information from a VCS platform.
 * Contains metadata about a single commit.
 * 
 * @example
 * ```ts
 * const commit: Commit = {
 *   sha: 'abc123',
 *   message: 'feat: add user authentication',
 *   author: {
 *     name: 'John Doe',
 *     email: 'john@example.com',
 *     date: '2024-01-01T00:00:00Z'
 *   },
 *   date: '2024-01-01T00:00:00Z',
 *   url: 'https://github.com/octocat/Hello-World/commit/abc123'
 * }
 * ```
 */
export interface Commit {
  sha: string
  message: string
  author: {
    name: string
    email: string
    date: string
  }
  date: string
  url: string
}

/**
 * Repository statistics from a VCS platform.
 * Contains high-level metrics about a repository.
 * 
 * @example
 * ```ts
 * const stats: RepoStats = {
 *   stars: 1000,
 *   forks: 100,
 *   watchers: 50,
 *   issues: 10,
 *   lastUpdated: '2024-01-01T00:00:00Z'
 * }
 * ```
 */
export interface RepoStats {
  stars: number
  forks: number
  watchers: number
  issues: number
  lastUpdated: string
}

/**
 * Extended commit data with additional statistics.
 * Used for detailed commit analysis and story generation.
 * 
 * @example
 * ```ts
 * const commitData: CommitData = {
 *   id: 'abc123',
 *   message: 'feat: add user authentication',
 *   author: 'John Doe',
 *   date: '2024-01-01T00:00:00Z',
 *   additions: 100,
 *   deletions: 50,
 *   files: 5,
 *   stats: {
 *     total: 150,
 *     additions: 100,
 *     deletions: 50
 *   }
 * }
 * ```
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