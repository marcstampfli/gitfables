/**
 * @module lib/github-client
 * @description GitHub API client for interacting with repositories and commits.
 * Uses Octokit REST client for making authenticated requests to the GitHub API.
 * 
 * @example
 * ```ts
 * import { createGitHubClient } from '@/lib/vcs/github-client'
 * 
 * const client = createGitHubClient()
 * const repos = await client.listRepositories()
 * console.debug('Repository info', { fullName: repos[0].full_name })
 * 
 * const commits = await client.listCommits('owner/repo')
 * console.debug('Commit info', { message: commits[0].message })
 * ```
 */

import { Octokit } from '@octokit/rest'
import type { Repository, Commit } from '@/types/vcs'

/**
 * GitHub API client wrapper
 * 
 * @example
 * ```ts
 * const client = new GitHubClient('token')
 * const repos = await client.listRepositories()
 * console.debug('Repositories fetched', { count: repos.length })
 * ```
 */
export class GitHubClient {
  private octokit: Octokit

  constructor(token?: string) {
    this.octokit = new Octokit({ auth: token })
  }

  /**
   * List repositories for the authenticated user
   * 
   * @example
   * ```ts
   * const repos = await client.listRepositories()
   * console.debug('Repositories fetched', { count: repos.length })
   * ```
   */
  async listRepositories(): Promise<Repository[]> {
    const { data } = await this.octokit.repos.listForAuthenticatedUser({
      visibility: 'all',
      sort: 'updated',
      per_page: 100
    })

    return data.map(repo => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description,
      language: repo.language,
      languages_url: repo.languages_url,
      owner: repo.owner.login,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      languages: null, // Requires separate API call
      default_branch: repo.default_branch,
      watchers_count: repo.watchers_count,
      size: repo.size
    }))
  }

  /**
   * List commits for a repository
   * 
   * @example
   * ```ts
   * const commits = await client.listCommits('owner', 'repo')
   * console.debug('Commits fetched', { count: commits.length })
   * ```
   */
  async listCommits(owner: string, repo: string): Promise<Commit[]> {
    const { data } = await this.octokit.repos.listCommits({
      owner,
      repo,
      per_page: 100
    })

    return data.map(commit => {
      const commitAuthor = commit.commit.author || {
        name: 'Unknown',
        email: 'unknown@example.com',
        date: new Date().toISOString()
      }

      const commitUrl = typeof commit.html_url === 'string' 
        ? commit.html_url 
        : `https://github.com/${owner}/${repo}/commit/${commit.sha}`

      const commitMessage = typeof commit.commit.message === 'string'
        ? commit.commit.message
        : 'No commit message'

      const commitSha = typeof commit.sha === 'string'
        ? commit.sha
        : 'unknown'

      return {
        sha: commitSha,
        message: commitMessage,
        author: {
          name: commitAuthor.name || 'Unknown',
          email: commitAuthor.email || 'unknown@example.com',
          date: commitAuthor.date || new Date().toISOString()
        },
        date: commitAuthor.date || new Date().toISOString(),
        url: commitUrl
      }
    })
  }
}

export const createGitHubClient = (token?: string) => new GitHubClient(token) 