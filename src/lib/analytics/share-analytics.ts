/**
 * @module lib/analytics/share-analytics
 * @description Analytics tracking for story sharing events.
 */

'use client'

import type { ShareEvent, ShareAnalytics, IShareAnalytics } from '@/types/analytics'

interface ExtendedShareAnalytics extends IShareAnalytics {
  subscribe(listener: (analytics: ShareAnalytics) => void): () => void
  exportAnalytics(): string
  exportAnalyticsCSV(): string
  clearAnalytics(): void
}

class ShareAnalyticsImpl implements ExtendedShareAnalytics {
  private analytics: ShareAnalytics = {
    totalShares: 0,
    platformBreakdown: {
      twitter: 0,
      linkedin: 0,
      facebook: 0
    },
    topStories: [],
    periodStart: new Date().toISOString(),
    periodEnd: new Date().toISOString()
  }
  private listeners: ((analytics: ShareAnalytics) => void)[] = []

  subscribe(listener: (analytics: ShareAnalytics) => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  async trackShare(event: ShareEvent): Promise<void> {
    this.analytics.totalShares++
    this.analytics.platformBreakdown[event.platform]++
    
    // Update top stories
    const storyIndex = this.analytics.topStories.findIndex(s => s.id === event.storyId)
    if (storyIndex >= 0) {
      this.analytics.topStories[storyIndex].shares++
    } else {
      this.analytics.topStories.push({ id: event.storyId, shares: 1 })
    }

    // Update period end
    this.analytics.periodEnd = new Date().toISOString()

    this.listeners.forEach(listener => listener(this.analytics))
  }

  async getShareAnalytics(_userId: string, _startDate?: string, _endDate?: string): Promise<ShareAnalytics> {
    return { ...this.analytics }
  }

  exportAnalytics(): string {
    return JSON.stringify(this.analytics, null, 2)
  }

  exportAnalyticsCSV(): string {
    const headers = ['id', 'platform', 'shares']
    const rows = this.analytics.topStories.map(story => [
      story.id,
      Object.entries(this.analytics.platformBreakdown)
        .find(([_, count]) => count > 0)?.[0] || 'unknown',
      story.shares.toString()
    ])
    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
  }

  clearAnalytics(): void {
    this.analytics = {
      totalShares: 0,
      platformBreakdown: {
        twitter: 0,
        linkedin: 0,
        facebook: 0
      },
      topStories: [],
      periodStart: new Date().toISOString(),
      periodEnd: new Date().toISOString()
    }
    this.listeners.forEach(listener => listener(this.analytics))
  }
}

export const shareAnalytics = new ShareAnalyticsImpl() 