/**
 * @module lib/config
 * @description Application configuration and environment variable management.
 * Provides centralized configuration with validation for required environment variables.
 * 
 * @example
 * ```ts
 * import { config } from '@/lib/config'
 * 
 * // Access GitHub configuration
 * const { clientId, redirectUri } = config.github
 * ```
 */

/**
 * Application configuration object
 * 
 * @const
 * @property {object} github - GitHub OAuth configuration
 * @property {string} github.clientId - GitHub OAuth client ID
 * @property {string} github.clientSecret - GitHub OAuth client secret
 * @property {string} github.redirectUri - OAuth callback URL
 */
export const config = {
  github: {
    clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    redirectUri: process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI || 'http://localhost:3000/api/auth/callback',
  }
}

// Only validate in server context
if (typeof window === 'undefined') {
  /**
   * Required environment variables
   * @const
   * @type {readonly ['NEXT_PUBLIC_GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET']}
   */
  const requiredEnvVars = [
    'NEXT_PUBLIC_GITHUB_CLIENT_ID',
    'GITHUB_CLIENT_SECRET',
  ] as const

  // Validate required environment variables
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`)
    }
  }
} 