/**
 * @module lib/vcs/bitbucket-provider
 * @description Bitbucket VCS provider implementation
 */

import type { VCSProvider, VCSConfig, VCSAuthOptions, Repository, Commit } from '@/types/vcs'
import { BaseVCSProvider } from './base-provider'
import { logDebug } from '@/lib/utils/logger'

interface BitbucketRepository {
  uuid: string
  name: string
  full_name: string
  workspace: {
    slug: string
  }
  description: string | null
  is_private: boolean
  mainbranch?: {
    name: string
  }
  links: {
    html: {
      href: string
    }
  }
  forks_count?: number
  watchers_count?: number
  size?: number
  created_on: string
  updated_on: string
}

interface BitbucketCommit {
  hash: string
  message: string
  author: {
    raw: string
    user?: {
      display_name: string
    }
  }
  date: string
  links: {
    html: {
      href: string
    }
  }
}

/**
 * Bitbucket VCS provider implementation
 */
export class BitbucketProvider extends BaseVCSProvider implements VCSProvider {
  private accessToken: string | null = null
  private apiUrl: string = 'https://api.bitbucket.org/2.0'

  constructor() {
    super({ platform: 'bitbucket' })
  }

  /**
   * Initialize the Bitbucket provider
   */
  async init(config: VCSConfig): Promise<void> {
    if (config.platform !== 'bitbucket') {
      throw new Error('Invalid platform for Bitbucket provider')
    }
    this.config = config
  }

  /**
   * Authenticate with Bitbucket
   */
  async authenticate(options: VCSAuthOptions): Promise<void> {
    this.accessToken = options.token
  }

  /**
   * List repositories for the authenticated user
   */
  async listRepositories(): Promise<Repository[]> {
    if (!this.accessToken) {
      throw new Error('Bitbucket provider not authenticated')
    }

    const url = new URL(`${this.apiUrl}/user/repositories`)
    url.searchParams.append('pagelen', '100')
    url.searchParams.append('sort', '-updated_on')

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.statusText}`)
    }

    const data = await response.json()
    const repositories = await Promise.all(data.values.map(async (repo: BitbucketRepository) => {
      let languages: Record<string, number> = {}

      try {
        const languageUrl = new URL(`${this.apiUrl}/repositories/${repo.workspace.slug}/${repo.name}/languages`)
        const languageResponse = await fetch(languageUrl.toString(), {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Accept': 'application/json'
          }
        })

        if (languageResponse.ok) {
          const languageData = await languageResponse.json()
          languages = languageData
        }
      } catch (error) {
        logDebug('Failed to fetch languages for repository', {
          context: 'bitbucket_provider',
          metadata: { repository: repo.full_name, error: error instanceof Error ? error.message : 'Unknown error' }
        })
      }

      return {
        id: repo.uuid,
        name: repo.name,
        full_name: repo.full_name,
        owner: repo.workspace.slug,
        description: repo.description,
        url: repo.links.html.href,
        private: repo.is_private,
        default_branch: repo.mainbranch?.name ?? 'main',
        languages,
        stargazers_count: 0,
        forks_count: repo.forks_count ?? 0,
        watchers_count: repo.watchers_count ?? 0,
        size: repo.size ?? 0,
        created_at: repo.created_on,
        updated_at: repo.updated_on
      }
    }))

    return repositories
  }

  /**
   * List commits for a repository
   */
  async listCommits(owner: string, repo: string): Promise<Commit[]> {
    if (!this.accessToken) {
      throw new Error('Bitbucket provider not authenticated')
    }

    const url = new URL(`${this.apiUrl}/repositories/${owner}/${repo}/commits`)
    url.searchParams.append('pagelen', '100')

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch commits: ${response.statusText}`)
    }

    const data = await response.json()
    return data.values.map((commit: BitbucketCommit) => ({
      sha: commit.hash,
      message: commit.message,
      author: {
        name: commit.author.user?.display_name || commit.author.raw.split('<')[0].trim(),
        email: commit.author.raw.match(/<(.+)>/)?.[1] || '',
        date: commit.date
      },
      url: commit.links.html.href
    }))
  }
} 