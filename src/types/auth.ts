/**
 * @module types/auth
 * @description Type definitions for authentication and authorization.
 * These types define the structure of user authentication, sessions,
 * and authorization controls.
 * 
 * @example
 * ```ts
 * import type { User, Session } from '@/types'
 * 
 * // Get current user
 * const user: User = await auth.getUser()
 * 
 * // Check session
 * const session: Session = await auth.getSession()
 * ```
 */

import type { Database } from '@/types/database'

/**
 * User profile information.
 * Contains basic user data and preferences.
 * 
 * @example
 * ```ts
 * const user: User = {
 *   id: 'user-123',
 *   email: 'user@example.com',
 *   name: 'John Doe',
 *   avatarUrl: 'https://example.com/avatar.jpg',
 *   createdAt: '2024-01-01T00:00:00Z'
 * }
 * ```
 */
export interface User {
  id: string
  email: string
  name: string | null
  avatarUrl: string | null
  createdAt: string
  updatedAt: string
}

/**
 * Session information.
 * Contains data about the current user session.
 * 
 * @example
 * ```ts
 * const session: Session = {
 *   id: 'session-123',
 *   userId: 'user-123',
 *   expiresAt: '2024-02-01T00:00:00Z',
 *   token: 'session-token',
 *   refreshToken: 'refresh-token'
 * }
 * ```
 */
export interface Session {
  id: string
  userId: string
  expiresAt: string
  token: string
  refreshToken: string
}

/**
 * Authentication state.
 * Tracks the current authentication status.
 * 
 * @example
 * ```ts
 * const state: AuthState = {
 *   user: currentUser,
 *   session: currentSession,
 *   isLoading: false,
 *   error: null
 * }
 * ```
 */
export interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  error: Error | null
}

/**
 * Authentication provider configuration.
 * Used to configure authentication providers.
 * 
 * @example
 * ```ts
 * const config: AuthConfig = {
 *   providers: ['github', 'gitlab'],
 *   redirectUrl: 'https://example.com/auth/callback',
 *   sessionDuration: 3600
 * }
 * ```
 */
export interface AuthConfig {
  providers: Array<'github' | 'gitlab' | 'bitbucket'>
  redirectUrl: string
  sessionDuration: number
}

/**
 * Authentication provider interface.
 * Defines the contract for auth provider implementations.
 * 
 * @example
 * ```ts
 * class GitHubAuth implements AuthProvider {
 *   async signIn(credentials: AuthCredentials): Promise<Session> {
 *     // Sign in with GitHub
 *   }
 *   
 *   async signOut(): Promise<void> {
 *     // Sign out
 *   }
 * }
 * ```
 */
export interface AuthProvider {
  signIn(credentials: AuthCredentials): Promise<Session>
  signOut(): Promise<void>
  refreshSession(refreshToken: string): Promise<Session>
  getUser(): Promise<User>
  getSession(): Promise<Session | null>
}

/**
 * Authentication credentials.
 * Used for signing in with various providers.
 * 
 * @example
 * ```ts
 * const credentials: AuthCredentials = {
 *   provider: 'github',
 *   token: 'access-token',
 *   scope: ['repo', 'user']
 * }
 * ```
 */
export interface AuthCredentials {
  provider: 'github' | 'gitlab' | 'bitbucket'
  token: string
  scope?: string[]
}

/**
 * Database types for authentication.
 * Provides type-safe database operations.
 */
export type DbUser = Database['public']['Tables']['users']['Row'] 

export interface UserProfile {
  id: string
  email: string | null
  full_name?: string
  username?: string
  avatar_url?: string
  provider?: string
  provider_id?: string
  updated_at?: string
} 