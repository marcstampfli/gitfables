/**
 * @module types/auth
 * @description Type definitions for authentication and authorization
 */

import type { VCSPlatform } from './vcs'

/**
 * User profile information
 */
export interface UserProfile {
  id: string
  email: string
  name: string
  avatar?: string
  providers: Array<{
    platform: VCSPlatform
    username: string
    avatar?: string
    isConnected: boolean
  }>
  preferences: {
    theme: 'light' | 'dark' | 'system'
    emailNotifications: boolean
    defaultProvider?: VCSPlatform
  }
}

/**
 * Authentication state
 */
export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: UserProfile | null
  error: Error | null
}

/**
 * Authentication provider configuration
 */
export interface AuthProviderConfig {
  platform: VCSPlatform
  clientId: string
  clientSecret?: string
  redirectUri: string
  scope: string[]
}

/**
 * OAuth token response
 */
export interface OAuthToken {
  accessToken: string
  refreshToken?: string
  expiresIn: number
  tokenType: string
  scope: string[]
}

/**
 * Authentication session
 */
export interface AuthSession {
  user: UserProfile
  tokens: Record<VCSPlatform, OAuthToken>
  expiresAt: string
}

/**
 * Authentication events
 */
export type AuthEvent = 
  | { type: 'login'; platform: VCSPlatform }
  | { type: 'logout' }
  | { type: 'connect'; platform: VCSPlatform }
  | { type: 'disconnect'; platform: VCSPlatform }
  | { type: 'refresh'; platform: VCSPlatform }
  | { type: 'error'; error: Error } 