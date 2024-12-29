/**
 * @module lib/github-client
 * @description GitHub API client for interacting with repositories and commits.
 */

import { Octokit } from '@octokit/rest'
import type { Repository, Commit } from '@/types/vcs'
import { logDebug } from '@/lib/utils/logger'

/**
 * GitHub API client wrapper
 */
export class GitHubClient {
  private octokit: Octokit

  constructor(token?: string) {
    this.octokit = new Octokit({ auth: token })
  }

  /**
   * List repositories for the authenticated user
   */
  async listRepositories(): Promise<Repository[]> {
    try {
      const { data } = await this.octokit.repos.listForAuthenticatedUser({
        visibility: 'all',
        sort: 'updated',
        per_page: 100
      })

      const repositories = await Promise.all(data.map(async (repo) => {
        let languages: Record<string, number> = {}

        try {
          const { data: languageData } = await this.octokit.repos.listLanguages({
            owner: repo.owner.login,
            repo: repo.name
          })
          languages = languageData
        } catch (error) {
          logDebug('Failed to fetch languages for repository', {
            context: 'github_client',
            metadata: { repository: repo.full_name, error: error instanceof Error ? error.message : 'Unknown error' }
          })
        }

        return {
          id: repo.id.toString(),
          name: repo.name,
          full_name: repo.full_name,
          owner: repo.owner.login,
          description: repo.description ?? '',
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
    } catch (error) {
      logDebug('Failed to list repositories', {
        context: 'github_client',
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
      })
      throw error
    }
  }

  /**
   * List commits for a repository
   */
  async listCommits(owner: string, repo: string): Promise<Commit[]> {
    try {
      const { data } = await this.octokit.repos.listCommits({
        owner,
        repo,
        per_page: 100
      })

      return data.map((commit) => ({
        sha: commit.sha,
        message: commit.commit.message,
        author: {
          name: commit.commit.author?.name ?? 'Unknown',
          email: commit.commit.author?.email ?? 'unknown@example.com',
          date: commit.commit.author?.date ?? new Date().toISOString()
        },
        url: commit.html_url
      }))
    } catch (error) {
      logDebug('Failed to list commits', {
        context: 'github_client',
        metadata: { repository: `${owner}/${repo}`, error: error instanceof Error ? error.message : 'Unknown error' }
      })
      throw error
    }
  }
}

export const createGitHubClient = (token?: string) => new GitHubClient(token) 