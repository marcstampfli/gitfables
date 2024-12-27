/**
 * @module lib/github-client
 * @description GitHub API client for interacting with repositories and commits.
 * Uses Octokit REST client for making authenticated requests to the GitHub API.
 * 
 * @example
 * ```ts
 * import { createGitHubClient } from '@/lib/github-client'
 * import { logDebug } from '@/lib/logger'
 * 
 * const client = createGitHubClient()
 * const repos = await client.listRepositories()
 * logDebug('Repository info', { metadata: { fullName: repos[0].fullName } })
 * 
 * const commits = await client.listCommits('owner/repo')
 * logDebug('Commit info', { metadata: { message: commits[0].message } })
 * ```
 */

import { Octokit } from '@octokit/rest'

/**
 * Repository information returned by the GitHub API
 * 
 * @interface Repository
 * @property {number} id - Unique identifier of the repository
 * @property {string} name - Repository name without owner
 * @property {string} fullName - Full repository name with owner (owner/repo)
 * @property {string} url - HTML URL of the repository
 * @property {string | null} description - Repository description
 * @property {string | null} language - Primary language of the repository
 * @property {string} languagesUrl - URL to fetch repository languages
 * @property {string} owner - Repository owner's username
 * @property {number} stars - Number of repository stars
 * @property {number} forks - Number of repository forks
 * @property {Record<string, number> | null} languages - Repository language statistics
 * @property {string} defaultBranch - Default branch of the repository
 * @property {number} watchers - Number of repository watchers
 * @property {number} size - Repository size in kilobytes
 */
export interface Repository {
  id: number
  name: string
  fullName: string
  url: string
  description: string | null
  language: string | null
  languagesUrl: string
  owner: string
  stars: number
  forks: number
  languages: Record<string, number> | null
  defaultBranch: string
  watchers: number
  size: number
}

/**
 * Commit information returned by the GitHub API
 * 
 * @interface Commit
 * @property {string} sha - Commit hash
 * @property {string} message - Commit message
 * @property {object} author - Commit author information
 * @property {string} author.name - Author's name
 * @property {string} author.email - Author's email
 * @property {string} date - Commit date in ISO format
 * @property {string} url - HTML URL of the commit
 */
export interface Commit {
  sha: string
  message: string
  author: {
    name: string
    email: string
  }
  date: string
  url: string
}

/**
 * GitHub API client for fetching repository and commit information
 * 
 * @class GitHubClient
 * @description Provides methods to interact with GitHub repositories and commits
 * using an authenticated Octokit client.
 * 
 * @example
 * ```ts
 * const client = new GitHubClient('github_pat_...')
 * const repos = await client.listRepositories()
 * const commits = await client.listCommits('owner', 'repo')
 * ```
 */
export class GitHubClient {
  private octokit: Octokit

  /**
   * Create a new GitHub client
   * 
   * @param {string} [token] - GitHub personal access token
   */
  constructor(token?: string) {
    this.octokit = new Octokit({
      auth: token,
    })
  }

  /**
   * List repositories for the authenticated user
   * 
   * @returns {Promise<Repository[]>} List of repositories
   * @throws {Error} If the request fails or authentication is invalid
   * 
   * @example
   * ```ts
   * const repos = await client.listRepositories()
   * console.log(repos[0].fullName) // => 'owner/repo'
   * ```
   */
  async listRepositories(): Promise<Repository[]> {
    const response = await this.octokit.repos.listForAuthenticatedUser({
      visibility: 'all',
      sort: 'updated',
      per_page: 100,
    })

    const repositories = await Promise.all(
      response.data.map(async (repo) => {
        let languages = null
        try {
          const languagesResponse = await this.octokit.repos.listLanguages({
            owner: repo.owner.login,
            repo: repo.name,
          })
          languages = languagesResponse.data
        } catch (error) {
          // If languages request fails, continue with null languages
        }

        return {
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          url: repo.html_url,
          description: repo.description,
          language: repo.language,
          languagesUrl: repo.languages_url,
          owner: repo.owner.login,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          languages,
          defaultBranch: repo.default_branch,
          watchers: repo.watchers_count,
          size: repo.size,
        }
      })
    )

    return repositories
  }

  /**
   * List commits for a repository
   * 
   * @param {string} owner - Repository owner
   * @param {string} repo - Repository name
   * @returns {Promise<Commit[]>} List of commits
   * @throws {Error} If the request fails or repository is not found
   * 
   * @example
   * ```ts
   * const commits = await client.listCommits('owner', 'repo')
   * console.log(commits[0].message) // => 'Initial commit'
   * ```
   */
  async listCommits(owner: string, repo: string): Promise<Commit[]> {
    const response = await this.octokit.repos.listCommits({
      owner,
      repo,
      per_page: 100,
    })

    return response.data.map(commit => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: {
        name: commit.commit.author?.name || 'Unknown',
        email: commit.commit.author?.email || 'unknown@example.com',
      },
      date: commit.commit.author?.date || new Date().toISOString(),
      url: commit.html_url,
    }))
  }
}

export const createGitHubClient = (token?: string) => new GitHubClient(token) 