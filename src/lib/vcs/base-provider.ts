/**
 * @module lib/vcs/base-provider
 * @description Base VCS provider implementation with shared functionality
 */

import type { VCSProvider, VCSConfig, VCSAuthOptions, Repository, Commit } from '@/types/vcs'

/**
 * Base VCS provider implementation
 */
export abstract class BaseVCSProvider implements VCSProvider {
  protected config: VCSConfig

  constructor(config: VCSConfig) {
    this.config = config
  }

  abstract init(config: VCSConfig): Promise<void>
  abstract authenticate(options: VCSAuthOptions): Promise<void>
  abstract listRepositories(): Promise<Repository[]>
  abstract listCommits(owner: string, repo: string): Promise<Commit[]>
} 