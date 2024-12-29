/**
 * @module lib/vcs
 * @description VCS provider factory and utilities
 */

import type { VCSProvider, VCSConfig } from '@/types/vcs'
import { GitHubProvider } from './github-provider'
import { GitLabProvider } from './gitlab-provider'
import { BitbucketProvider } from './bitbucket-provider'

/**
 * Create a VCS provider instance based on the platform
 */
export function createVCSProvider(config: VCSConfig): VCSProvider {
  let provider: VCSProvider

  switch (config.platform) {
    case 'github':
      provider = new GitHubProvider()
      break
    case 'gitlab':
      provider = new GitLabProvider()
      break
    case 'bitbucket':
      provider = new BitbucketProvider()
      break
    default:
      throw new Error(`Unsupported VCS platform: ${config.platform}`)
  }

  provider.init(config)
  return provider
}

/**
 * Initialize and authenticate a VCS provider
 */
export async function initializeVCSProvider(
  provider: VCSProvider,
  config: VCSConfig,
  token: string
): Promise<VCSProvider> {
  await provider.init(config)
  await provider.authenticate({ token })
  return provider
} 