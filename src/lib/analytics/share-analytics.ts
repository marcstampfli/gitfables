/**
 * @module lib/analytics/share-analytics
 * @description Analytics tracking for story sharing events.
 */

'use client'

import type { ShareEvent, ShareAnalytics, IShareAnalytics, SharePlatform } from '@/types/analytics'
import { logDebug } from '@/lib/utils/logger'

type PlatformRecord = Record<SharePlatform, number>

const DEFAULT_PLATFORM_STATS: PlatformRecord = {
  twitter: 0,
  linkedin: 0,
  facebook: 0,
  email: 0
}

class ShareAnalyticsImpl implements IShareAnalytics {
  private analytics: Required<ShareAnalytics> = {
    totalShares: 0,
    platformBreakdown: { ...DEFAULT_PLATFORM_STATS },
    topStories: [],
    periodStart: new Date().toISOString(),
    periodEnd: new Date().toISOString(),
    successRate: 100,
    platformShares: { ...DEFAULT_PLATFORM_STATS },
    events: []
  }
  private listeners: ((analytics: ShareAnalytics) => void)[] = []

  subscribe(listener: (analytics: ShareAnalytics) => void): () => void {
    this.listeners.push(listener)
    listener(this.analytics) // Call immediately with current state
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  async trackShare(event: ShareEvent): Promise<void> {
    try {
      // Validate platform
      if (!Object.keys(DEFAULT_PLATFORM_STATS).includes(event.platform)) {
        throw new Error(`Invalid platform: ${event.platform}`)
      }

      this.analytics.totalShares++
      this.analytics.platformBreakdown[event.platform]++
      this.analytics.platformShares[event.platform]++
      
      // Update top stories
      const storyIndex = this.analytics.topStories.findIndex(s => s.id === event.storyId)
      if (storyIndex >= 0) {
        this.analytics.topStories[storyIndex].shares++
      } else {
        this.analytics.topStories.push({ id: event.storyId, shares: 1 })
      }

      // Sort top stories by shares
      this.analytics.topStories.sort((a, b) => b.shares - a.shares)

      // Add to events (keep last 10)
      this.analytics.events = [
        event,
        ...this.analytics.events.slice(0, 9)
      ]

      // Update success rate
      const totalEvents = this.analytics.events.length
      const successfulEvents = this.analytics.events.filter(e => e.success).length
      this.analytics.successRate = totalEvents > 0 
        ? (successfulEvents / totalEvents) * 100 
        : 100

      // Update period end
      this.analytics.periodEnd = new Date().toISOString()

      this.notifyListeners()
    } catch (error) {
      logDebug('Failed to track share event', {
        context: 'share_analytics',
        metadata: { event, error: error instanceof Error ? error.message : 'Unknown error' }
      })
      throw error
    }
  }

  async getShareAnalytics(_userId: string, _startDate?: string, _endDate?: string): Promise<ShareAnalytics> {
    return { ...this.analytics }
  }

  exportAnalytics(): string {
    return JSON.stringify(this.analytics, null, 2)
  }

  exportAnalyticsCSV(): string {
    const headers = ['id', 'platform', 'shares', 'timestamp', 'success', 'metadata']
    const rows = this.analytics.events.map(event => [
      event.storyId,
      event.platform,
      this.analytics.platformBreakdown[event.platform].toString(),
      event.timestamp,
      event.success.toString(),
      event.metadata ? JSON.stringify(event.metadata) : ''
    ])
    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
  }

  clearAnalytics(): void {
    this.analytics = {
      totalShares: 0,
      platformBreakdown: { ...DEFAULT_PLATFORM_STATS },
      topStories: [],
      periodStart: new Date().toISOString(),
      periodEnd: new Date().toISOString(),
      successRate: 100,
      platformShares: { ...DEFAULT_PLATFORM_STATS },
      events: []
    }
    this.notifyListeners()
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.analytics))
  }
}

export const shareAnalytics = new ShareAnalyticsImpl() 