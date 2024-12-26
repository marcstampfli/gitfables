/**
 * @module lib/vcs/types
 * @description Type definitions for version control system (VCS) integrations
 */

import type { CommitData, RepoStats, VCSPlatform, ErrorType } from '@/types'

/**
 * VCS provider configuration
 */
export interface VCSConfig {
  platform: VCSPlatform
  baseUrl?: string
  token?: string
  username?: string
}

/**
 * VCS authentication options
 */
export interface VCSAuthOptions {
  token: string
  username?: string
  scopes?: string[]
}

/**
 * VCS commit fetch options
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
 * VCS error details
 */
export interface VCSError {
  type: ErrorType
  message: string
  statusCode?: number
  raw?: unknown
}

/**
 * VCS provider interface
 * All VCS providers must implement this interface
 */
export interface VCSProvider {
  /**
   * Initialize the provider with configuration
   */
  init(config: VCSConfig): Promise<void>

  /**
   * Authenticate with the VCS platform
   */
  authenticate(options: VCSAuthOptions): Promise<void>

  /**
   * Fetch commits from a repository
   */
  fetchCommits(options: CommitFetchOptions): Promise<CommitData[]>

  /**
   * Fetch repository statistics
   */
  fetchRepoStats(owner: string, repo: string): Promise<RepoStats>

  /**
   * Check if the provider is authenticated
   */
  isAuthenticated(): boolean

  /**
   * Get the current configuration
   */
  getConfig(): VCSConfig
} 