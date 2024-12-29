/**
 * @module lib/vcs-providers
 * @description Configuration for supported VCS providers
 */

import { VCSProvider } from '@/types'

/**
 * List of supported VCS providers
 */
export const SUPPORTED_PROVIDERS: VCSProvider[] = [
  {
    id: 'github',
    name: 'GitHub',
    icon: '/images/providers/github.svg',
    isActive: true,
    baseUrl: 'https://api.github.com',
    authUrl: 'https://github.com/login/oauth/authorize',
    description: 'Connect your GitHub repositories to generate stories from commits and pull requests.'
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    icon: '/images/providers/gitlab.svg',
    isActive: false,
    baseUrl: 'https://gitlab.com/api/v4',
    authUrl: 'https://gitlab.com/oauth/authorize',
    description: 'Support for GitLab repositories is coming soon. Stay tuned for updates!'
  },
  {
    id: 'bitbucket',
    name: 'Bitbucket',
    icon: '/images/providers/bitbucket.svg',
    isActive: false,
    baseUrl: 'https://api.bitbucket.org/2.0',
    authUrl: 'https://bitbucket.org/site/oauth2/authorize',
    description: 'Support for Bitbucket repositories is coming soon. Stay tuned for updates!'
  }
]

/**
 * Get a VCS provider by ID
 */
export function getProvider(id: string): VCSProvider | undefined {
  return SUPPORTED_PROVIDERS.find(p => p.id === id)
}

/**
 * Get all active VCS providers
 */
export function getActiveProviders(): VCSProvider[] {
  return SUPPORTED_PROVIDERS.filter(p => p.isActive)
} 