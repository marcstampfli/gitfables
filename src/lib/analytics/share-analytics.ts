/**
 * @module lib/analytics/share-analytics
 * @description Analytics tracking for story sharing events.
 * 
 * @example
 * ```ts
 * import { trackShare, getShareAnalytics } from '@/lib/analytics/share-analytics'
 * import { logDebug } from '@/lib/logger'
 * 
 * // Track a share event
 * await trackShare('twitter', 'story-123')
 * 
 * // Get share analytics
 * const analytics = await getShareAnalytics('story-123')
 * logDebug('Share analytics', {
 *   context: 'analytics:share',
 *   metadata: { totalShares: analytics.totalShares }
 * })
 * ```
 */

'use client'

import type { Story } from '@/lib/story/types'

/**
 * Share event data structure
 * 
 * @interface ShareEvent
 * @property {string} storyId - ID of the shared story
 * @property {string} platform - Platform where story was shared
 * @property {string} timestamp - ISO timestamp of the share event
 * @property {boolean} success - Whether the share was successful
 * @property {string} [error] - Error message if share failed
 */
export type ShareEvent = {
  storyId: string
  platform: string
  timestamp: string
  success: boolean
  error?: string
}

/**
 * Share analytics data structure
 * 
 * @interface ShareAnalytics
 * @property {number} totalShares - Total number of share attempts
 * @property {Record<string, number>} platformShares - Share counts by platform
 * @property {number} successRate - Percentage of successful shares
 * @property {ShareEvent[]} events - List of share events
 */
export type ShareAnalytics = {
  totalShares: number
  platformShares: Record<string, number>
  successRate: number
  events: ShareEvent[]
}

/**
 * Share analytics service interface
 * 
 * @interface IShareAnalytics
 */
export interface IShareAnalytics {
  /**
   * Subscribe to analytics updates
   * @param {function} listener - Callback for analytics updates
   * @returns {function} Unsubscribe function
   */
  subscribe(listener: (analytics: ShareAnalytics) => void): () => void

  /**
   * Track a new share event
   * @param {Story} story - Story being shared
   * @param {string} platform - Platform where story is shared
   * @param {boolean} success - Whether share was successful
   * @param {string} [error] - Error message if share failed
   */
  trackShare(story: Story, platform: string, success: boolean, error?: string): void

  /**
   * Get current analytics data
   * @returns {ShareAnalytics} Current analytics state
   */
  getAnalytics(): ShareAnalytics

  /**
   * Export analytics data as JSON string
   * @returns {string} JSON string of analytics data
   */
  exportAnalytics(): string

  /**
   * Export analytics data as CSV string
   * @returns {string} CSV string of analytics data
   */
  exportAnalyticsCSV(): string

  /**
   * Clear analytics data
   */
  clearAnalytics(): void
}

/**
 * Analytics update listener type
 * @private
 */
type AnalyticsListener = (analytics: ShareAnalytics) => void

/**
 * Mock events for development
 * @private
 */
const MOCK_EVENTS: ShareEvent[] = [
  {
    storyId: 'mock-1',
    platform: 'twitter',
    timestamp: '2023-12-26T10:00:00Z',
    success: true
  },
  {
    storyId: 'mock-2',
    platform: 'linkedin',
    timestamp: '2023-12-26T09:00:00Z',
    success: true
  },
  {
    storyId: 'mock-3',
    platform: 'twitter',
    timestamp: '2023-12-25T15:00:00Z',
    success: false,
    error: 'Network error'
  }
]

/**
 * Share analytics service implementation
 * Implements singleton pattern for client-side analytics tracking
 * 
 * @class ShareAnalyticsService
 * @implements {IShareAnalytics}
 * @private
 */
class ShareAnalyticsService implements IShareAnalytics {
  private static instance: ShareAnalyticsService | null = null
  private events: ShareEvent[] = [...MOCK_EVENTS]
  private listeners: Set<AnalyticsListener> = new Set()

  private constructor() {}

  /**
   * Get the singleton instance of ShareAnalyticsService
   * Returns a mock implementation in server context
   * 
   * @static
   * @returns {IShareAnalytics} ShareAnalyticsService instance
   */
  static getInstance(): IShareAnalytics {
    if (typeof window === 'undefined') {
      return {
        subscribe: () => () => {},
        trackShare: () => {},
        getAnalytics: () => ({
          totalShares: 0,
          platformShares: {},
          successRate: 0,
          events: []
        }),
        exportAnalytics: () => '{}',
        exportAnalyticsCSV: () => '',
        clearAnalytics: () => {}
      }
    }

    if (!ShareAnalyticsService.instance) {
      ShareAnalyticsService.instance = new ShareAnalyticsService()
    }
    return ShareAnalyticsService.instance
  }

  subscribe(listener: AnalyticsListener): () => void {
    this.listeners.add(listener)
    // Immediately call listener with current analytics
    listener(this.getAnalytics())
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener)
    }
  }

  private notifyListeners() {
    const analytics = this.getAnalytics()
    this.listeners.forEach(listener => listener(analytics))
  }

  trackShare(story: Story, platform: string, success: boolean, error?: string) {
    const event: ShareEvent = {
      storyId: story.id,
      platform,
      timestamp: new Date().toISOString(),
      success,
      error
    }

    this.events.push(event)
    this.notifyListeners()
  }

  getAnalytics(): ShareAnalytics {
    const totalShares = this.events.length
    const platformShares: Record<string, number> = {}
    let successfulShares = 0

    this.events.forEach(event => {
      // Count shares by platform
      platformShares[event.platform] = (platformShares[event.platform] || 0) + 1
      
      // Count successful shares
      if (event.success) {
        successfulShares++
      }
    })

    return {
      totalShares,
      platformShares,
      successRate: totalShares > 0 ? (successfulShares / totalShares) * 100 : 0,
      events: [...this.events].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
    }
  }

  exportAnalytics(): string {
    const analytics = this.getAnalytics()
    const exportData = {
      exportedAt: new Date().toISOString(),
      analytics
    }
    return JSON.stringify(exportData, null, 2)
  }

  exportAnalyticsCSV(): string {
    const headers = ['Story ID', 'Platform', 'Timestamp', 'Success', 'Error']
    const rows = this.events.map(event => [
      event.storyId,
      event.platform,
      event.timestamp,
      event.success.toString(),
      event.error || ''
    ])

    return [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')
  }

  clearAnalytics() {
    this.events = [...MOCK_EVENTS] // Reset to mock data instead of clearing
    this.notifyListeners()
  }
}

/**
 * Global share analytics instance
 * Use this to track and analyze story sharing events
 * 
 * @example
 * ```ts
 * // Track successful share
 * shareAnalytics.trackShare(story, 'twitter', true)
 * 
 * // Track failed share
 * shareAnalytics.trackShare(story, 'linkedin', false, 'API error')
 * 
 * // Export analytics
 * const jsonData = shareAnalytics.exportAnalytics()
 * const csvData = shareAnalytics.exportAnalyticsCSV()
 * ```
 */
export const shareAnalytics = ShareAnalyticsService.getInstance() 