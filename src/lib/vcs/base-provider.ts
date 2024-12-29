/**
 * @module lib/vcs/base-provider
 * @description Base VCS provider implementation with shared functionality
 */

import { VCSProvider, VCSConfig } from '@/types'

export abstract class BaseVCSProvider implements VCSProvider {
  protected config: VCSConfig
  public baseUrl: string
  public id: string
  public name: string
  public icon: string
  public isActive: boolean = true

  constructor(config: VCSConfig, id: string, name: string, icon: string) {
    this.config = config
    this.baseUrl = config.baseUrl || ''
    this.id = id
    this.name = name
    this.icon = icon
  }
} 