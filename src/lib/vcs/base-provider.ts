/**
 * @module lib/vcs/base-provider
 * @description Base VCS provider implementation with shared functionality
 */

import type { VCSProvider, VCSProviderType, VCSConfig } from '@/types/vcs'

export abstract class BaseVCSProvider implements VCSProvider {
  protected config: VCSConfig
  public baseUrl: string
  public id: string
  public name: string
  public icon: string
  public isActive: boolean = true
  abstract description: string
  abstract type: VCSProviderType

  constructor(config: VCSConfig, id: string, name: string, icon: string) {
    this.config = config
    this.baseUrl = config.baseUrl || ''
    this.id = id
    this.name = name
    this.icon = icon
  }
} 