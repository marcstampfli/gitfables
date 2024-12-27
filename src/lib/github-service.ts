/**
 * @module lib/github-service
 * @description Service for interacting with GitHub API
 */

import { Octokit } from '@octokit/rest'
import type { VCSProvider, VCSConfig, VCSAuthOptions, CommitFetchOptions } from '@/lib/vcs/types'
import type { CommitData, RepoStats } from '@/types'

type _GitHubCommit = {
  sha: string
  message: string
  author: {
    name: string
    email: string
    date: string
  }
}

/**
 * GitHub service implementation
 * 
 * @class
 * @implements {VCSProvider}
 */
export class GitHubService implements VCSProvider {
  private octokit: Octokit
  private config?: VCSConfig

  constructor(token: string) {
    this.octokit = new Octokit({
      auth: token
    })
  }

  async init(config: VCSConfig): Promise<void> {
    this.config = config
    this.octokit = new Octokit({
      auth: config.token,
      baseUrl: config.baseUrl
    })
  }

  async authenticate(options: VCSAuthOptions): Promise<void> {
    this.octokit = new Octokit({
      auth: options.token
    })
  }

  async fetchCommits(options: CommitFetchOptions): Promise<CommitData[]> {
    const { data } = await this.octokit.repos.listCommits({
      owner: options.owner,
      repo: options.repo,
      sha: options.branch,
      since: options.since?.toISOString(),
      until: options.until?.toISOString(),
      per_page: options.perPage,
      page: options.page
    })

    return data.map(commit => ({
      id: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author?.name || 'Unknown',
      date: commit.commit.author?.date || new Date().toISOString(),
      additions: 0, // Would need additional API call to get these
      deletions: 0, // Would need additional API call to get these
      files: 0, // Would need additional API call to get these
      stats: {
        total: 0,
        additions: 0,
        deletions: 0
      }
    }))
  }

  async fetchRepoStats(owner: string, repo: string): Promise<RepoStats> {
    const { data } = await this.octokit.repos.get({
      owner,
      repo
    })

    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      watchers: data.watchers_count,
      issues: data.open_issues_count,
      lastUpdated: data.updated_at
    }
  }

  isAuthenticated(): boolean {
    return !!this.octokit.auth
  }

  getConfig(): VCSConfig {
    if (!this.config) {
      throw new Error('GitHub provider not initialized')
    }
    return this.config
  }

  // Additional helper methods
  async getRepositories() {
    const { data } = await this.octokit.repos.listForAuthenticatedUser({
      sort: 'updated',
      direction: 'desc',
      per_page: 100
    })

    return data.map(repo => ({
      id: repo.id.toString(),
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || '',
      url: repo.html_url,
      private: repo.private,
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at
    }))
  }

  async getLanguages(owner: string, repo: string) {
    const { data } = await this.octokit.repos.listLanguages({
      owner,
      repo
    })

    const total = Object.values(data).reduce((sum, value) => sum + value, 0)

    return Object.entries(data).map(([name, bytes]) => ({
      name,
      percentage: (bytes / total) * 100
    }))
  }
} 