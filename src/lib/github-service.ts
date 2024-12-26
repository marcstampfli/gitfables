/**
 * @module github-service
 * @description Service layer for interacting with the GitHub API.
 * Handles authentication, data fetching, and error handling.
 */

import { Octokit } from '@octokit/rest'
import type { RestEndpointMethodTypes } from '@octokit/rest'
import type { CommitData } from '@/components/github-story-visualizer'
import { isValidDateFormat } from '@/lib/validation'

type CommitResponse = RestEndpointMethodTypes['repos']['listCommits']['response']
type RepoResponse = RestEndpointMethodTypes['repos']['get']['response']

/**
 * GitHub API error types
 */
export class GitHubAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: unknown
  ) {
    super(message)
    this.name = 'GitHubAPIError'
  }
}

/**
 * Configuration options for the GitHub service
 */
export interface GitHubServiceConfig {
  token?: string
  baseUrl?: string
  userAgent?: string
}

/**
 * Parameters for fetching commit data
 */
export interface FetchCommitsParams {
  owner: string
  repo: string
  since?: string
  until?: string
  perPage?: number
  page?: number
}

/**
 * Repository statistics response
 */
export interface RepoStats {
  stars: number
  forks: number
  language: string | null
  createdAt: string
  updatedAt: string
}

/**
 * GitHub service class for handling API interactions
 * 
 * @example
 * ```ts
 * const github = new GitHubService({ token: 'your-token' })
 * 
 * try {
 *   const commits = await github.fetchCommits({
 *     owner: 'username',
 *     repo: 'repo-name'
 *   })
 * } catch (error) {
 *   if (error instanceof GitHubAPIError) {
 *     console.error('API Error:', error.message)
 *   }
 * }
 * ```
 */
export class GitHubService {
  private octokit: Octokit
  private rateLimitRemaining: number = 5000

  /**
   * Creates a new GitHubService instance
   * @param {GitHubServiceConfig} config - Configuration options
   */
  constructor(config: GitHubServiceConfig = {}) {
    this.octokit = new Octokit({
      auth: config.token,
      baseUrl: config.baseUrl,
      userAgent: config.userAgent || 'RepoTales-App',
    })
  }

  /**
   * Fetches commit data for a repository
   * @param {FetchCommitsParams} params - Parameters for the fetch operation
   * @returns {Promise<CommitData[]>} Array of commit data
   * @throws {GitHubAPIError} If the API request fails
   */
  async fetchCommits(params: FetchCommitsParams): Promise<CommitData[]> {
    try {
      // Validate date parameters
      if (params.since && !isValidDateFormat(params.since)) {
        throw new GitHubAPIError('Invalid since date format')
      }
      if (params.until && !isValidDateFormat(params.until)) {
        throw new GitHubAPIError('Invalid until date format')
      }

      // Check rate limit before making request
      if (this.rateLimitRemaining <= 0) {
        throw new GitHubAPIError('GitHub API rate limit exceeded')
      }

      const response: CommitResponse = await this.octokit.repos.listCommits({
        owner: params.owner,
        repo: params.repo,
        since: params.since,
        until: params.until,
        per_page: params.perPage || 30,
        page: params.page || 1,
      })

      // Update rate limit
      this.rateLimitRemaining = parseInt(
        response.headers['x-ratelimit-remaining'] || '5000'
      )

      // Transform the response into CommitData format
      return response.data.map(commit => ({
        date: new Date(commit.commit.author?.date || '').toISOString().split('T')[0],
        commits: 1,
        message: commit.commit.message,
        time: new Date(commit.commit.author?.date || '').toTimeString().slice(0, 5),
        language: null, // Language needs to be fetched separately
        linesAdded: null,
        linesRemoved: null,
      }))
    } catch (error) {
      if (error instanceof Error) {
        throw new GitHubAPIError(
          error.message,
          (error as any).status,
          (error as any).response
        )
      }
      throw new GitHubAPIError('Unknown error occurred')
    }
  }

  /**
   * Fetches repository statistics
   * @param {string} owner - Repository owner
   * @param {string} repo - Repository name
   * @returns {Promise<RepoStats>} Repository statistics
   * @throws {GitHubAPIError} If the API request fails
   */
  async fetchRepoStats(owner: string, repo: string): Promise<RepoStats> {
    try {
      const response: RepoResponse = await this.octokit.repos.get({
        owner,
        repo,
      })

      return {
        stars: response.data.stargazers_count,
        forks: response.data.forks_count,
        language: response.data.language,
        createdAt: response.data.created_at,
        updatedAt: response.data.updated_at,
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new GitHubAPIError(
          error.message,
          (error as any).status,
          (error as any).response
        )
      }
      throw new GitHubAPIError('Unknown error occurred')
    }
  }

  /**
   * Checks if the current token has valid authentication
   * @returns {Promise<boolean>} Whether the token is valid
   */
  async checkAuth(): Promise<boolean> {
    try {
      await this.octokit.users.getAuthenticated()
      return true
    } catch {
      return false
    }
  }

  /**
   * Gets the remaining rate limit
   * @returns {number} Remaining API calls
   */
  getRateLimitRemaining(): number {
    return this.rateLimitRemaining
  }
} 