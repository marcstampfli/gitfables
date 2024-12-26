/**
 * @module lib/vcs/gitlab-provider
 * @description GitLab VCS provider implementation
 */

import type { 
  VCSProvider,
  VCSConfig,
  VCSAuthOptions,
  CommitFetchOptions,
  VCSError
} from './types'
import type { CommitData, RepoStats } from '@/types'

/**
 * GitLab VCS provider implementation
 * 
 * @example
 * ```ts
 * const gitlab = new GitLabProvider()
 * await gitlab.init({ platform: 'gitlab' })
 * await gitlab.authenticate({ token: 'your-token' })
 * 
 * const commits = await gitlab.fetchCommits({
 *   owner: 'owner',
 *   repo: 'repo'
 * })
 * ```
 */
export class GitLabProvider implements VCSProvider {
  private token: string | null = null
  private config: VCSConfig | null = null
  private baseUrl: string = 'https://gitlab.com/api/v4'

  /**
   * Initialize the GitLab provider
   */
  async init(config: VCSConfig): Promise<void> {
    if (config.platform !== 'gitlab') {
      throw this.createError('Invalid platform', 'validation_error')
    }
    this.config = config
    if (config.baseUrl) {
      this.baseUrl = config.baseUrl
    }
  }

  /**
   * Authenticate with GitLab
   */
  async authenticate(options: VCSAuthOptions): Promise<void> {
    try {
      // Verify token by making a test API call
      const response = await fetch(`${this.baseUrl}/user`, {
        headers: {
          'Authorization': `Bearer ${options.token}`,
        }
      })

      if (!response.ok) {
        throw new Error('Authentication failed')
      }

      this.token = options.token
    } catch (error) {
      throw this.createError('Authentication failed', 'auth_error', error)
    }
  }

  /**
   * Fetch commits from a GitLab repository
   */
  async fetchCommits(options: CommitFetchOptions): Promise<CommitData[]> {
    if (!this.token) {
      throw this.createError('Not authenticated', 'auth_error')
    }

    try {
      const encodedRepo = encodeURIComponent(`${options.owner}/${options.repo}`)
      const url = new URL(`${this.baseUrl}/projects/${encodedRepo}/repository/commits`)

      if (options.branch) url.searchParams.append('ref_name', options.branch)
      if (options.since) url.searchParams.append('since', options.since.toISOString())
      if (options.until) url.searchParams.append('until', options.until.toISOString())
      if (options.perPage) url.searchParams.append('per_page', options.perPage.toString())
      if (options.page) url.searchParams.append('page', options.page.toString())

      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        }
      })

      if (!response.ok) {
        throw new Error(`GitLab API error: ${response.statusText}`)
      }

      const commits = await response.json()

      return commits.map((commit: any) => {
        const stats = commit.stats && {
          total: commit.stats.total || 0,
          additions: commit.stats.additions || 0,
          deletions: commit.stats.deletions || 0,
        }

        return {
          id: commit.id,
          message: commit.message,
          author: commit.author_name || 'Unknown',
          date: commit.created_at || new Date().toISOString(),
          additions: stats?.additions || 0,
          deletions: stats?.deletions || 0,
          files: commit.stats?.files || 0,
          stats,
        }
      })
    } catch (error) {
      throw this.createError('Failed to fetch commits', 'api_error', error)
    }
  }

  /**
   * Fetch GitLab repository statistics
   */
  async fetchRepoStats(owner: string, repo: string): Promise<RepoStats> {
    if (!this.token) {
      throw this.createError('Not authenticated', 'auth_error')
    }

    try {
      const encodedRepo = encodeURIComponent(`${owner}/${repo}`)
      const response = await fetch(`${this.baseUrl}/projects/${encodedRepo}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        }
      })

      if (!response.ok) {
        throw new Error(`GitLab API error: ${response.statusText}`)
      }

      const data = await response.json()

      return {
        stars: data.star_count,
        forks: data.forks_count,
        watchers: data.star_count, // GitLab uses stars as watchers
        issues: data.open_issues_count,
        lastUpdated: data.last_activity_at,
      }
    } catch (error) {
      throw this.createError('Failed to fetch repo stats', 'api_error', error)
    }
  }

  /**
   * Check if the provider is authenticated
   */
  isAuthenticated(): boolean {
    return this.token !== null
  }

  /**
   * Get the current configuration
   */
  getConfig(): VCSConfig {
    if (!this.config) {
      throw this.createError('Not initialized', 'validation_error')
    }
    return this.config
  }

  /**
   * Create a standardized error object
   */
  private createError(
    message: string,
    type: VCSError['type'],
    raw?: unknown
  ): VCSError {
    const error: VCSError = {
      type,
      message,
      raw,
    }

    if (raw instanceof Error) {
      error.message = `${message}: ${raw.message}`
    }

    return error
  }
} 