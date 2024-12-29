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

import type { Story, ShareEvent, ShareAnalytics, IShareAnalytics } from '@/types'

class ShareAnalyticsImpl implements IShareAnalytics {
  private analytics: ShareAnalytics = {
    totalShares: 0,
    platformShares: {},
    successRate: 0,
    events: []
  }
  private listeners: ((analytics: ShareAnalytics) => void)[] = []

  subscribe(listener: (analytics: ShareAnalytics) => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  trackShare(story: Story, platform: 'twitter' | 'linkedin' | 'facebook', success: boolean, error?: string): void {
    const event: ShareEvent = {
      storyId: story.id,
      platform,
      timestamp: new Date().toISOString(),
      success,
      error
    }

    this.analytics.events.push(event)
    this.analytics.totalShares++
    this.analytics.platformShares[platform] = (this.analytics.platformShares[platform] || 0) + 1
    this.analytics.successRate = this.analytics.events.filter(e => e.success).length / this.analytics.totalShares

    this.listeners.forEach(listener => listener(this.analytics))
  }

  getAnalytics(): ShareAnalytics {
    return { ...this.analytics }
  }

  exportAnalytics(): string {
    return JSON.stringify(this.analytics, null, 2)
  }

  exportAnalyticsCSV(): string {
    const headers = ['storyId', 'platform', 'timestamp', 'success', 'error']
    const rows = this.analytics.events.map(event => [
      event.storyId,
      event.platform,
      event.timestamp,
      event.success.toString(),
      event.error || ''
    ])
    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
  }

  clearAnalytics(): void {
    this.analytics = {
      totalShares: 0,
      platformShares: {},
      successRate: 0,
      events: []
    }
    this.listeners.forEach(listener => listener(this.analytics))
  }
}

export const shareAnalytics = new ShareAnalyticsImpl() 