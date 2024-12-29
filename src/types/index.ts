/**
 * @module types
 * @description Re-exports of all type definitions
 */

export * from './api/api'
export * from './api/api-keys'
export type {
  AuthConfig,
  AuthProvider,
  AuthState,
  AuthCredentials,
  Session,
  User
} from './auth'
export * from './components'
export * from './database'
export * from './error'
export * from './forms'
export * from './logger'
export * from './next'
export type {
  StoryStyle,
  StoryTone,
  StoryLength,
  StorySettings,
  StoryEvent,
  StorySegment,
  DeveloperPersona
} from './story'
export type {
  Story,
  SharedStory,
  CreateStoryRequest,
  UpdateStoryRequest,
  ShareStoryRequest
} from './stories'
export * from './ui'
export * from './vcs'
export * from './activity'
export * from './analytics'
export * from './settings'

export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  animations_enabled: boolean
  // ... existing settings ...
} 