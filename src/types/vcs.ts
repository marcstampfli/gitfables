/**
 * @module types/vcs
 * @description Type definitions for version control system (VCS) integration
 */

/**
 * VCS provider platform
 */
export type VCSPlatform = 'github' | 'gitlab' | 'bitbucket'

/**
 * VCS provider configuration
 */
export interface VCSConfig {
  /** The VCS platform */
  platform: VCSPlatform
  /** The base URL for API requests */
  baseUrl?: string
  /** The API version to use */
  apiVersion?: string
}

/**
 * VCS authentication options
 */
export interface VCSAuthOptions {
  /** The authentication token */
  token: string
}

/**
 * Repository interface
 */
export interface Repository {
  /** Unique identifier for the repository */
  id: string
  /** Repository name */
  name: string
  /** Full repository name (owner/name) */
  full_name: string
  /** Repository owner */
  owner: string
  /** Repository description */
  description?: string | null
  /** Repository URL */
  url: string
  /** Whether the repository is private */
  private: boolean
  /** Default branch name */
  default_branch: string
  /** Repository languages */
  languages: Record<string, number>
  /** Number of stargazers */
  stargazers_count: number
  /** Number of forks */
  forks_count: number
  /** Number of watchers */
  watchers_count: number
  /** Repository size in KB */
  size: number
  /** Repository creation date */
  created_at: string
  /** Repository last update date */
  updated_at: string
}

/**
 * Commit interface
 */
export interface Commit {
  /** Commit SHA */
  sha: string
  /** Commit message */
  message: string
  /** Commit author */
  author: {
    /** Author name */
    name: string
    /** Author email */
    email: string
    /** Commit date */
    date: string
  }
  /** Commit URL */
  url: string
}

/**
 * VCS provider interface
 */
export interface VCSProvider {
  /** Initialize the provider with configuration */
  init(config: VCSConfig): Promise<void>
  /** Authenticate with the provider */
  authenticate(options: VCSAuthOptions): Promise<void>
  /** List repositories for the authenticated user */
  listRepositories(): Promise<Repository[]>
  /** List commits for a repository */
  listCommits(owner: string, repo: string): Promise<Commit[]>
} 