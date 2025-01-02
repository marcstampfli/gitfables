/**
 * @module lib/vcs-providers
 * @description Configuration for supported VCS providers
 */

import type { VCSPlatform } from '@/types/vcs'
import { Github, Gitlab, FileCode2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * VCS provider configuration
 */
export interface VCSProviderConfig {
  id: string
  type: VCSPlatform
  name: string
  icon: LucideIcon
  isActive: boolean
  baseUrl: string
  authUrl: string
  description: string
}

/**
 * List of supported VCS providers
 */
export const SUPPORTED_PROVIDERS: VCSProviderConfig[] = [
  {
    id: 'github',
    type: 'github',
    name: 'GitHub',
    icon: Github,
    isActive: true,
    baseUrl: 'https://github.com',
    authUrl: 'https://github.com/login/oauth/authorize',
    description: 'Connect your GitHub repositories to generate stories from commits and pull requests.'
  },
  {
    id: 'gitlab',
    type: 'gitlab',
    name: 'GitLab',
    icon: Gitlab,
    isActive: false,
    baseUrl: 'https://gitlab.com',
    authUrl: 'https://gitlab.com/oauth/authorize',
    description: 'Support for GitLab repositories is coming soon. Stay tuned for updates!'
  },
  {
    id: 'bitbucket',
    type: 'bitbucket',
    name: 'Bitbucket',
    icon: FileCode2,
    isActive: false,
    baseUrl: 'https://bitbucket.org',
    authUrl: 'https://bitbucket.org/site/oauth2/authorize',
    description: 'Support for Bitbucket repositories is coming soon. Stay tuned for updates!'
  }
]

/**
 * Get a VCS provider by ID
 */
export function getProvider(id: string): VCSProviderConfig | undefined {
  return SUPPORTED_PROVIDERS.find(p => p.id === id)
}

/**
 * Get all active VCS providers
 */
export function getActiveProviders(): VCSProviderConfig[] {
  return SUPPORTED_PROVIDERS.filter(p => p.isActive)
} 