/**
 * @module lib/vcs
 * @description Version Control System (VCS) module exports and factory
 */

import type { VCSConfig, VCSProviderImpl } from '@/types/vcs'
import { GitHubProvider } from './github-provider'
import { GitLabProvider } from './gitlab-provider'
import { BitbucketProvider } from './bitbucket-provider'

export * from '@/types/vcs'
export * from './github-provider'
export * from './gitlab-provider'
export * from './bitbucket-provider'

/**
 * Create a VCS provider instance based on platform
 */
export function createVCSProvider(config: VCSConfig): VCSProviderImpl {
  const provider = (() => {
    switch (config.platform) {
      case 'github':
        return new GitHubProvider()
      case 'gitlab':
        return new GitLabProvider()
      case 'bitbucket':
        return new BitbucketProvider()
      default:
        throw new Error(`Unsupported VCS platform: ${config.platform}`)
    }
  })()

  provider.init(config)
  return provider
} 