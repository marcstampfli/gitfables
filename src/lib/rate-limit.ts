/**
 * @module lib/rate-limit
 * @description Rate limiting implementation for API requests to various providers.
 * Handles request counting, window tracking, and automatic retries.
 * 
 * @example
 * ```ts
 * import { withRateLimit, rateLimiter } from '@/lib/rate-limit'
 * import { logDebug } from '@/lib/logger'
 * 
 * // Wrap an API call with rate limiting
 * const data = await withRateLimit(() => api.getData())
 * 
 * // Check rate limit status
 * const status = rateLimiter.getRateLimitStatus('github')
 * logDebug('Rate limit status', {
 *   context: 'rate-limit',
 *   metadata: { remaining: status.remaining, total: status.total }
 * })
 * ```
 */

/**
 * Supported API providers
 * 
 * @typedef {'github' | 'gitlab' | 'supabase'} Provider
 */
type Provider = 'github' | 'gitlab' | 'supabase'

/**
 * Rate limit configuration for a provider
 * 
 * @interface RateLimitConfig
 * @property {number} maxRequests - Maximum number of requests allowed in the window
 * @property {number} windowMs - Time window in milliseconds
 */
interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

/**
 * Internal rate limit state tracking
 * 
 * @interface RateLimitState
 * @property {number} requests - Number of requests made in current window
 * @property {number} resetAt - Timestamp when the current window resets
 */
interface RateLimitState {
  requests: number
  resetAt: number
}

/**
 * Rate limit status information
 * 
 * @interface RateLimitStatus
 * @property {number} remaining - Remaining requests in current window
 * @property {number} total - Total requests allowed per window
 * @property {number} resetsIn - Minutes until window resets
 */
interface RateLimitStatus {
  remaining: number
  total: number
  resetsIn: number
}

/**
 * Rate limit headers from API responses
 * 
 * @interface RateLimitHeaders
 * @property {string} [x-ratelimit-limit] - Total requests allowed
 * @property {string} [x-ratelimit-remaining] - Remaining requests
 * @property {string} [x-ratelimit-reset] - Reset timestamp
 */
interface RateLimitHeaders {
  'x-ratelimit-limit'?: string
  'x-ratelimit-remaining'?: string
  'x-ratelimit-reset'?: string
}

/**
 * Default rate limit configurations for supported providers
 * 
 * @const {Record<Provider, RateLimitConfig>}
 */
const RATE_LIMITS: Record<Provider, RateLimitConfig> = {
  github: {
    maxRequests: 5000, // GitHub API allows 5000 requests per hour for authenticated users
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  gitlab: {
    maxRequests: 2000, // GitLab API allows 2000 requests per hour
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  supabase: {
    maxRequests: 1000, // Adjust based on your Supabase plan
    windowMs: 60 * 1000, // 1 minute
  },
}

/**
 * Rate limiter class for tracking and enforcing API rate limits
 * 
 * @class RateLimiter
 * @description Manages rate limiting for multiple providers, tracking request counts
 * and enforcing limits based on configured windows.
 * 
 * @example
 * ```ts
 * const limiter = new RateLimiter()
 * await limiter.checkRateLimit('github')
 * const status = limiter.getRateLimitStatus('github')
 * ```
 */
class RateLimiter {
  private states: Map<Provider, RateLimitState>
  private configs: typeof RATE_LIMITS

  /**
   * Create a new rate limiter instance
   * 
   * @param {typeof RATE_LIMITS} [configs] - Custom rate limit configurations
   */
  constructor(configs = RATE_LIMITS) {
    this.states = new Map()
    this.configs = configs
  }

  /**
   * Get current state for a provider
   * 
   * @private
   * @param {Provider} provider - API provider
   * @returns {RateLimitState} Current rate limit state
   */
  private getState(provider: Provider): RateLimitState {
    const now = Date.now()
    let state = this.states.get(provider)

    // Initialize or reset state if window has passed
    if (!state || now >= state.resetAt) {
      state = {
        requests: 0,
        resetAt: now + this.configs[provider].windowMs,
      }
      this.states.set(provider, state)
    }

    return state
  }

  /**
   * Check if a request can be made to a provider
   * 
   * @param {Provider} provider - API provider
   * @throws {Error} If rate limit is exceeded
   */
  async checkRateLimit(provider: Provider): Promise<void> {
    const config = this.configs[provider]
    if (!config) {
      throw new Error(`Unknown provider: ${provider}`)
    }

    const state = this.getState(provider)
    
    if (state.requests >= config.maxRequests) {
      const waitMs = state.resetAt - Date.now()
      const waitMinutes = Math.ceil(waitMs / 1000 / 60)
      
      throw new Error(
        `Rate limit exceeded for ${provider}. ` +
        `${state.requests}/${config.maxRequests} requests made. ` +
        `Please wait ${waitMinutes} minutes before trying again.`
      )
    }

    state.requests++
  }

  /**
   * Update rate limit state from API response headers
   * 
   * @param {Provider} provider - API provider
   * @param {Partial<RateLimitHeaders>} headers - Response headers
   */
  updateFromHeaders(provider: Provider, headers: Partial<RateLimitHeaders>): void {
    const remaining = headers['x-ratelimit-remaining']
    const reset = headers['x-ratelimit-reset']
    const limit = headers['x-ratelimit-limit']

    if (remaining && reset && limit) {
      const state = this.getState(provider)
      state.requests = Number(limit) - Number(remaining)
      state.resetAt = Number(reset) * 1000 // Convert to milliseconds
      this.states.set(provider, state)
    }
  }

  /**
   * Get current rate limit status for a provider
   * 
   * @param {Provider} provider - API provider
   * @returns {RateLimitStatus} Current rate limit status
   * 
   * @example
   * ```ts
   * const status = rateLimiter.getRateLimitStatus('github')
   * console.log(`${status.remaining}/${status.total} requests remaining`)
   * ```
   */
  getRateLimitStatus(provider: Provider): RateLimitStatus {
    const state = this.getState(provider)
    const config = this.configs[provider]
    
    return {
      remaining: config.maxRequests - state.requests,
      total: config.maxRequests,
      resetsIn: Math.max(0, Math.ceil((state.resetAt - Date.now()) / 1000 / 60)),
    }
  }
}

/**
 * Global rate limiter instance
 */
export const rateLimiter = new RateLimiter()

/**
 * Options for rate limited function calls
 * 
 * @interface RateLimitOptions
 * @property {number} [maxRetries=3] - Maximum number of retry attempts
 * @property {number} [retryDelay=1000] - Delay between retries in milliseconds
 */
interface RateLimitOptions {
  maxRetries?: number
  retryDelay?: number
}

/**
 * Extended error type for rate limit errors
 * 
 * @interface RateLimitError
 * @extends Error
 * @property {number} [status] - HTTP status code
 * @property {Headers} [headers] - Response headers
 */
interface RateLimitError extends Error {
  status?: number
  headers?: Headers
}

/**
 * Execute a function with rate limiting and automatic retries
 * 
 * @template T
 * @param {() => Promise<T>} fn - Function to execute
 * @param {RateLimitOptions} [options] - Rate limit options
 * @returns {Promise<T>} Function result
 * @throws {Error} If rate limit is exceeded and max retries reached
 * 
 * @example
 * ```ts
 * const data = await withRateLimit(
 *   () => api.getData(),
 *   { maxRetries: 5, retryDelay: 2000 }
 * )
 * ```
 */
export async function withRateLimit<T>(
  fn: () => Promise<T>,
  options: RateLimitOptions = {}
): Promise<T> {
  const maxRetries = options.maxRetries ?? 3
  const retryDelay = options.retryDelay ?? 1000
  let retries = 0

  do {
    try {
      return await fn()
    } catch (error) {
      const err = error as RateLimitError
      if (err.status === 403 && err.headers?.get('x-ratelimit-remaining') === '0') {
        if (retries >= maxRetries) {
          throw new Error('Rate limit exceeded and max retries reached')
        }
        retries++
        await new Promise(resolve => setTimeout(resolve, retryDelay))
        continue
      }
      throw error
    }
  } while (retries < maxRetries)

  throw new Error('Rate limit exceeded and max retries reached')
} 