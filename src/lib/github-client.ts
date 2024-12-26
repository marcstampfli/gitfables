import { Octokit } from '@octokit/rest'

export function createGitHubClient(token: string) {
  if (!token) {
    throw new Error('GitHub token is required')
  }

  return new Octokit({ auth: token })
}

export type Repository = {
  id: number
  name: string
  full_name: string
  description: string | null
  private: boolean
  html_url: string
  updated_at: string
}

export type Commit = {
  sha: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    message: string
  }
  html_url: string
} 