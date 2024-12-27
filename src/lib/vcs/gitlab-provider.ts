/**
 * @module lib/vcs/gitlab-provider
 * @description GitLab VCS provider implementation
 */

import { VCSProvider, VCSConfig, VCSAuthOptions, CommitFetchOptions, VCSError } from './types'
import type { CommitData, RepoStats, ErrorType } from '@/types'

interface _GitLabRepo {
  id: number
  name: string
  path_with_namespace: string
  web_url: string
  description: string | null
}

interface GitLabCommit {
  id: string
  message: string
  author_name: string
  author_email: string
  committed_date: string
  web_url: string
}

interface GitLabError extends Error {
  response?: {
    status?: number
    data?: {
      message?: string
    }
  }
}

export class GitLabProvider implements VCSProvider {
  private token: string | undefined
  private baseUrl = 'https://gitlab.com/api/v4'
  private config: VCSConfig | undefined

  async init(config: VCSConfig): Promise<void> {
    this.config = config
    this.baseUrl = config.baseUrl || this.baseUrl
  }

  async authenticate(options: VCSAuthOptions): Promise<void> {
    this.token = options.token
  }

  async fetchCommits(options: CommitFetchOptions): Promise<CommitData[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/projects/${encodeURIComponent(options.owner + '/' + options.repo)}/repository/commits${
          options.branch ? `?ref_name=${options.branch}` : ''
        }`,
        {
          headers: {
            'PRIVATE-TOKEN': this.token || '',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const commits = await response.json()
      return commits.map((commit: GitLabCommit) => ({
        id: commit.id,
        message: commit.message,
        author: {
          name: commit.author_name,
          email: commit.author_email,
        },
        date: commit.committed_date,
        url: commit.web_url,
      }))
    } catch (error) {
      const err = error as GitLabError
      const vcsError: VCSError = {
        type: 'api_error' as ErrorType,
        message: `Failed to fetch commits: ${err.response?.data?.message || err.message}`,
        statusCode: err.response?.status,
        raw: err
      }
      throw vcsError
    }
  }

  async fetchRepoStats(owner: string, repo: string): Promise<RepoStats> {
    try {
      const response = await fetch(
        `${this.baseUrl}/projects/${encodeURIComponent(owner + '/' + repo)}`,
        {
          headers: {
            'PRIVATE-TOKEN': this.token || '',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return {
        stars: data.star_count || 0,
        forks: data.forks_count || 0,
        watchers: data.star_count || 0, // GitLab uses stars as watchers
        issues: data.open_issues_count || 0,
        lastUpdated: data.last_activity_at,
      }
    } catch (error) {
      const err = error as GitLabError
      const vcsError: VCSError = {
        type: 'api_error' as ErrorType,
        message: `Failed to fetch repository stats: ${err.response?.data?.message || err.message}`,
        statusCode: err.response?.status,
        raw: err
      }
      throw vcsError
    }
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  getConfig(): VCSConfig {
    if (!this.config) {
      throw new Error('Provider not initialized')
    }
    return this.config
  }
} 