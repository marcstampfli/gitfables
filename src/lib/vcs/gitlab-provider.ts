/**
 * @module lib/vcs/gitlab-provider
 * @description GitLab VCS provider implementation
 */

import { Gitlab } from '@gitbeaker/node'
import type { VCSProvider, VCSConfig, VCSAuthOptions, Repository, Commit } from '@/types/vcs'
import { BaseVCSProvider } from './base-provider'
import { logDebug } from '@/lib/utils/logger'

interface GitLabProject {
  id: number
  name: string
  path_with_namespace: string
  namespace: {
    name: string | null
  } | null
  description: string | null
  web_url: string
  visibility?: string
  default_branch: string
  star_count: number | null
  forks_count: number | null
  statistics?: {
    repository_size: number | null
  } | null
  created_at: Date | string | null
  last_activity_at: Date | string | null
}

interface GitLabCommit {
  id: string
  message: string
  author_name: string | null
  author_email: string | null
  authored_date: Date | string | null
  web_url: string
}

/**
 * GitLab VCS provider implementation
 */
export class GitLabProvider extends BaseVCSProvider implements VCSProvider {
  private gitlab: InstanceType<typeof Gitlab> | null = null

  constructor() {
    super({ platform: 'gitlab' })
  }

  /**
   * Initialize the GitLab provider
   */
  async init(config: VCSConfig): Promise<void> {
    if (config.platform !== 'gitlab') {
      throw new Error('Invalid platform for GitLab provider')
    }
    this.config = config
  }

  /**
   * Authenticate with GitLab
   */
  async authenticate(options: VCSAuthOptions): Promise<void> {
    this.gitlab = new Gitlab({
      token: options.token,
    })
  }

  /**
   * List repositories for the authenticated user
   */
  async listRepositories(): Promise<Repository[]> {
    if (!this.gitlab) {
      throw new Error('GitLab provider not authenticated')
    }

    const projects = (await this.gitlab.Projects.all({
      membership: true,
      maxPages: 1,
      perPage: 100
    })) as unknown as GitLabProject[]

    const repositories = await Promise.all(projects.map(async (project) => {
      let languages: Record<string, number> = {}

      try {
        const languageData = await this.gitlab!.Projects.languages(project.id)
        languages = languageData
      } catch (error) {
        logDebug('Failed to fetch languages for repository', {
          context: 'gitlab_provider',
          metadata: { repository: project.path_with_namespace, error: error instanceof Error ? error.message : 'Unknown error' }
        })
      }

      const createdAt = project.created_at instanceof Date 
        ? project.created_at.toISOString()
        : typeof project.created_at === 'string'
          ? project.created_at
          : new Date().toISOString()

      const updatedAt = project.last_activity_at instanceof Date
        ? project.last_activity_at.toISOString()
        : typeof project.last_activity_at === 'string'
          ? project.last_activity_at
          : new Date().toISOString()

      return {
        id: project.id.toString(),
        name: project.name,
        full_name: project.path_with_namespace,
        owner: project.namespace?.name ?? 'Unknown',
        description: project.description,
        url: project.web_url,
        private: project.visibility !== 'public',
        default_branch: project.default_branch || 'main',
        languages,
        stargazers_count: project.star_count ?? 0,
        forks_count: project.forks_count ?? 0,
        watchers_count: project.star_count ?? 0,
        size: project.statistics?.repository_size ?? 0,
        created_at: createdAt,
        updated_at: updatedAt
      }
    }))

    return repositories
  }

  /**
   * List commits for a repository
   */
  async listCommits(owner: string, repo: string): Promise<Commit[]> {
    if (!this.gitlab) {
      throw new Error('GitLab provider not authenticated')
    }

    const projectPath = `${owner}/${repo}`
    const commits = (await this.gitlab.Commits.all(projectPath, {
      maxPages: 1,
      perPage: 100
    })) as unknown as GitLabCommit[]

    return commits.map((commit) => ({
      sha: commit.id,
      message: commit.message,
      author: {
        name: commit.author_name ?? 'Unknown',
        email: commit.author_email ?? '',
        date: commit.authored_date instanceof Date
          ? commit.authored_date.toISOString()
          : typeof commit.authored_date === 'string'
            ? commit.authored_date
            : new Date().toISOString()
      },
      url: commit.web_url
    }))
  }
} 