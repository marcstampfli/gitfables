/**
 * @module lib/vcs/bitbucket-provider
 * @description Bitbucket VCS provider implementation
 */

import { VCSProvider, VCSConfig, VCSAuthOptions, CommitFetchOptions, VCSError } from './types'
import type { CommitData, RepoStats, ErrorType } from '@/types'

interface _BitbucketRepo {
  uuid: string
  name: string
  full_name: string
  links: {
    html: {
      href: string
    }
  }
  description: string | null
}

interface BitbucketCommit {
  hash: string
  message: string
  author: {
    user: {
      display_name: string
    }
    raw: string
  }
  date: string
  links: {
    html: {
      href: string
    }
  }
}

interface BitbucketError extends Error {
  status?: number
  response?: {
    data?: {
      error?: {
        message?: string
      }
    }
  }
}

export class BitbucketProvider implements VCSProvider {
  private token: string | undefined
  private baseUrl = 'https://api.bitbucket.org/2.0'
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
        `${this.baseUrl}/repositories/${options.owner}/${options.repo}/commits${
          options.branch ? `?branch=${options.branch}` : ''
        }`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.values.map((commit: BitbucketCommit) => ({
        sha: commit.hash,
        message: commit.message,
        author: {
          name: commit.author.user.display_name,
          email: commit.author.raw,
        },
        date: commit.date,
        url: commit.links.html.href,
      }))
    } catch (error) {
      const err = error as BitbucketError
      const vcsError: VCSError = {
        type: 'api_error' as ErrorType,
        message: `Failed to fetch commits: ${err.response?.data?.error?.message || err.message}`,
        statusCode: err.status,
        raw: err
      }
      throw vcsError
    }
  }

  async fetchRepoStats(owner: string, repo: string): Promise<RepoStats> {
    try {
      const response = await fetch(
        `${this.baseUrl}/repositories/${owner}/${repo}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return {
        stars: data.watchers_count || 0,
        forks: data.forks_count || 0,
        watchers: data.subscribers_count || 0,
        issues: data.open_issues_count || 0,
        lastUpdated: data.updated_on,
      }
    } catch (error) {
      const err = error as BitbucketError
      const vcsError: VCSError = {
        type: 'api_error' as ErrorType,
        message: `Failed to fetch repository stats: ${err.response?.data?.error?.message || err.message}`,
        statusCode: err.status,
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