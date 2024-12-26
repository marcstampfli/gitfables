/**
 * @module lib/vcs/github-provider
 * @description GitHub VCS provider implementation
 */

import { Octokit } from '@octokit/rest'
import type { 
  VCSProvider,
  VCSConfig,
  VCSAuthOptions,
  CommitFetchOptions,
  VCSError
} from './types'
import type { CommitData, RepoStats } from '@/types'

/**
 * GitHub VCS provider implementation
 * 
 * @example
 * ```ts
 * const github = new GitHubProvider()
 * await github.init({ platform: 'github' })
 * await github.authenticate({ token: 'your-token' })
 * 
 * const commits = await github.fetchCommits({
 *   owner: 'owner',
 *   repo: 'repo'
 * })
 * ```
 */
export class GitHubProvider implements VCSProvider {
  private octokit: Octokit | null = null
  private config: VCSConfig | null = null

  /**
   * Initialize the GitHub provider
   */
  async init(config: VCSConfig): Promise<void> {
    if (config.platform !== 'github') {
      throw this.createError('Invalid platform', 'validation_error')
    }
    this.config = config
  }

  /**
   * Authenticate with GitHub
   */
  async authenticate(options: VCSAuthOptions): Promise<void> {
    try {
      this.octokit = new Octokit({
        auth: options.token,
        baseUrl: this.config?.baseUrl,
      })

      // Verify authentication
      await this.octokit.users.getAuthenticated()
    } catch (error) {
      throw this.createError('Authentication failed', 'auth_error', error)
    }
  }

  /**
   * Fetch commits from a GitHub repository
   */
  async fetchCommits(options: CommitFetchOptions): Promise<CommitData[]> {
    if (!this.octokit) {
      throw this.createError('Not authenticated', 'auth_error')
    }

    try {
      const { data: commits } = await this.octokit.repos.listCommits({
        owner: options.owner,
        repo: options.repo,
        sha: options.branch,
        since: options.since?.toISOString(),
        until: options.until?.toISOString(),
        per_page: options.perPage,
        page: options.page,
      })

      return commits.map(commit => {
        const stats = commit.stats && {
          total: commit.stats.total || 0,
          additions: commit.stats.additions || 0,
          deletions: commit.stats.deletions || 0,
        }

        return {
          id: commit.sha,
          message: commit.commit.message,
          author: commit.commit.author?.name || 'Unknown',
          date: commit.commit.author?.date || new Date().toISOString(),
          additions: stats?.additions || 0,
          deletions: stats?.deletions || 0,
          files: commit.files?.length || 0,
          stats,
        }
      })
    } catch (error) {
      throw this.createError('Failed to fetch commits', 'api_error', error)
    }
  }

  /**
   * Fetch GitHub repository statistics
   */
  async fetchRepoStats(owner: string, repo: string): Promise<RepoStats> {
    if (!this.octokit) {
      throw this.createError('Not authenticated', 'auth_error')
    }

    try {
      const { data: repoData } = await this.octokit.repos.get({
        owner,
        repo,
      })

      return {
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        watchers: repoData.watchers_count,
        issues: repoData.open_issues_count,
        lastUpdated: repoData.updated_at,
      }
    } catch (error) {
      throw this.createError('Failed to fetch repo stats', 'api_error', error)
    }
  }

  /**
   * Check if the provider is authenticated
   */
  isAuthenticated(): boolean {
    return this.octokit !== null
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