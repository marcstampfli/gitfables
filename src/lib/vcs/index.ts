/**
 * @module lib/vcs
 * @description Version Control System (VCS) module exports and factory
 */

import type { VCSConfig, VCSProvider } from './types'
import { GitHubProvider } from './github-provider'
import { GitLabProvider } from './gitlab-provider'
import { BitbucketProvider } from './bitbucket-provider'

export * from './types'
export * from './github-provider'
export * from './gitlab-provider'
export * from './bitbucket-provider'

/**
 * Create a VCS provider instance based on platform
 * 
 * @param {VCSConfig} config - VCS provider configuration
 * @returns {VCSProvider} VCS provider instance
 * 
 * @example
 * ```ts
 * const provider = createVCSProvider({
 *   platform: 'github',
 *   token: 'your-token'
 * })
 * 
 * await provider.init()
 * await provider.authenticate()
 * ```
 */
export function createVCSProvider(config: VCSConfig): VCSProvider {
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
} 