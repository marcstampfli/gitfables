/**
 * @module lib/vcs/github-provider
 * @description GitHub VCS provider implementation
 */

import { Octokit } from '@octokit/rest'
import type { VCSProvider, VCSConfig, VCSAuthOptions, Repository, Commit } from '@/types/vcs'
import { BaseVCSProvider } from './base-provider'
import { logDebug } from '@/lib/utils/logger'

/**
 * GitHub VCS provider implementation
 */
export class GitHubProvider extends BaseVCSProvider implements VCSProvider {
  private octokit: Octokit | null = null

  constructor() {
    super({ platform: 'github' })
  }

  /**
   * Initialize the GitHub provider
   */
  async init(config: VCSConfig): Promise<void> {
    if (config.platform !== 'github') {
      throw new Error('Invalid platform for GitHub provider')
    }
    this.config = config
  }

  /**
   * Authenticate with GitHub
   */
  async authenticate(options: VCSAuthOptions): Promise<void> {
    this.octokit = new Octokit({
      auth: options.token,
    })
  }

  /**
   * List repositories for the authenticated user
   */
  async listRepositories(): Promise<Repository[]> {
    if (!this.octokit) {
      throw new Error('GitHub provider not authenticated')
    }

    const { data } = await this.octokit.repos.listForAuthenticatedUser({
      visibility: 'all',
      sort: 'updated',
      per_page: 100
    })

    const repositories = await Promise.all(data.map(async (repo) => {
      let languages: Record<string, number> = {}

      try {
        const { data: languageData } = await this.octokit!.repos.listLanguages({
          owner: repo.owner.login,
          repo: repo.name
        })
        languages = languageData
      } catch (error) {
        logDebug('Failed to fetch languages for repository', {
          context: 'github_provider',
          metadata: { repository: repo.full_name, error: error instanceof Error ? error.message : 'Unknown error' }
        })
      }

      return {
        id: repo.id.toString(),
        name: repo.name,
        full_name: repo.full_name,
        owner: repo.owner.login,
        description: repo.description,
        url: repo.html_url,
        private: repo.private,
        default_branch: repo.default_branch,
        languages,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        watchers_count: repo.watchers_count,
        size: repo.size,
        created_at: repo.created_at || new Date().toISOString(),
        updated_at: repo.updated_at || new Date().toISOString()
      }
    }))

    return repositories
  }

  /**
   * List commits for a repository
   */
  async listCommits(owner: string, repo: string): Promise<Commit[]> {
    if (!this.octokit) {
      throw new Error('GitHub provider not authenticated')
    }

    try {
      const { data } = await this.octokit.repos.listCommits({
        owner,
        repo,
        per_page: 100
      })

      logDebug('Fetched commits from GitHub', { 
        context: 'github_provider',
        metadata: { repository: `${owner}/${repo}`, count: data.length }
      })

      return data.map(commit => ({
        sha: commit.sha,
        message: commit.commit.message,
        author: {
          name: commit.commit.author?.name ?? 'Unknown',
          email: commit.commit.author?.email ?? '',
          date: commit.commit.author?.date ?? new Date().toISOString()
        },
        url: commit.html_url
      }))
    } catch (error) {
      logDebug('Failed to fetch commits for repository', {
        context: 'github_provider',
        metadata: { repository: `${owner}/${repo}`, error: error instanceof Error ? error.message : 'Unknown error' }
      })
      return []
    }
  }
} 