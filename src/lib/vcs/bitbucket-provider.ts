/**
 * @module lib/vcs/bitbucket-provider
 * @description Bitbucket VCS provider implementation
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
 * Bitbucket VCS provider implementation
 * 
 * @example
 * ```ts
 * const bitbucket = new BitbucketProvider()
 * await bitbucket.init({ platform: 'bitbucket' })
 * await bitbucket.authenticate({ token: 'your-token' })
 * 
 * const commits = await bitbucket.fetchCommits({
 *   owner: 'owner',
 *   repo: 'repo'
 * })
 * ```
 */
export class BitbucketProvider implements VCSProvider {
  private token: string | null = null
  private config: VCSConfig | null = null
  private baseUrl: string = 'https://api.bitbucket.org/2.0'

  /**
   * Initialize the Bitbucket provider
   */
  async init(config: VCSConfig): Promise<void> {
    if (config.platform !== 'bitbucket') {
      throw this.createError('Invalid platform', 'validation_error')
    }
    this.config = config
    if (config.baseUrl) {
      this.baseUrl = config.baseUrl
    }
  }

  /**
   * Authenticate with Bitbucket
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
   * Fetch commits from a Bitbucket repository
   */
  async fetchCommits(options: CommitFetchOptions): Promise<CommitData[]> {
    if (!this.token) {
      throw this.createError('Not authenticated', 'auth_error')
    }

    try {
      const url = new URL(`${this.baseUrl}/repositories/${options.owner}/${options.repo}/commits`)

      if (options.branch) url.searchParams.append('include', options.branch)
      if (options.since) url.searchParams.append('since', options.since.toISOString())
      if (options.until) url.searchParams.append('until', options.until.toISOString())
      if (options.perPage) url.searchParams.append('pagelen', options.perPage.toString())
      if (options.page) url.searchParams.append('page', options.page.toString())

      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        }
      })

      if (!response.ok) {
        throw new Error(`Bitbucket API error: ${response.statusText}`)
      }

      const data = await response.json()
      const commits = data.values || []

      return commits.map((commit: any) => {
        const stats = commit.rendered?.stats && {
          total: (commit.rendered.stats.additions || 0) + (commit.rendered.stats.deletions || 0),
          additions: commit.rendered.stats.additions || 0,
          deletions: commit.rendered.stats.deletions || 0,
        }

        return {
          id: commit.hash,
          message: commit.message,
          author: commit.author.user?.display_name || commit.author.raw || 'Unknown',
          date: commit.date || new Date().toISOString(),
          additions: stats?.additions || 0,
          deletions: stats?.deletions || 0,
          files: commit.rendered?.files?.length || 0,
          stats,
        }
      })
    } catch (error) {
      throw this.createError('Failed to fetch commits', 'api_error', error)
    }
  }

  /**
   * Fetch Bitbucket repository statistics
   */
  async fetchRepoStats(owner: string, repo: string): Promise<RepoStats> {
    if (!this.token) {
      throw this.createError('Not authenticated', 'auth_error')
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/repositories/${owner}/${repo}`,
        {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Bitbucket API error: ${response.statusText}`)
      }

      const data = await response.json()

      return {
        stars: data.watchers?.count || 0,
        forks: data.forks_count || 0,
        watchers: data.watchers?.count || 0,
        issues: data.open_issues_count || 0,
        lastUpdated: data.updated_on,
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