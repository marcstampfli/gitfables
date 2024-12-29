/**
 * @module types/analytics
 * @description Type definitions for analytics tracking and event handling.
 * These types define the structure of analytics events and provide type safety
 * for tracking user interactions and application usage.
 * 
 * @example
 * ```ts
 * import type { ShareEvent, IShareAnalytics } from '@/types'
 * 
 * // Track a share event
 * const event: ShareEvent = {
 *   platform: 'twitter',
 *   storyId: 'story-123',
 *   userId: 'user-456'
 * }
 * 
 * await analytics.trackShare(event)
 * ```
 */

/**
 * Supported platforms for sharing.
 */
export type SharePlatform = 'twitter' | 'linkedin' | 'facebook' | 'email'

/**
 * Analytics event for story sharing.
 * Tracks when and how users share stories.
 * 
 * @example
 * ```ts
 * const event: ShareEvent = {
 *   platform: 'twitter',
 *   storyId: 'story-123',
 *   userId: 'user-456',
 *   metadata: {
 *     url: 'https://example.com/story/123',
 *     title: 'My Story'
 *   }
 * }
 * ```
 */
export interface ShareEvent {
  platform: SharePlatform
  storyId: string
  userId: string
  timestamp: string
  success: boolean
  metadata?: {
    url?: string
    title?: string
    [key: string]: unknown
  }
}

/**
 * Analytics data for story sharing.
 * Contains aggregated metrics about story sharing.
 * 
 * @example
 * ```ts
 * const analytics: ShareAnalytics = {
 *   totalShares: 100,
 *   platformBreakdown: {
 *     twitter: 50,
 *     linkedin: 30,
 *     facebook: 20
 *   },
 *   topStories: [
 *     { id: 'story-123', shares: 30 },
 *     { id: 'story-456', shares: 20 }
 *   ]
 * }
 * ```
 */
export interface ShareAnalytics {
  /** Total number of share events */
  totalShares: number
  /** Platform breakdown of shares */
  platformBreakdown: Record<SharePlatform, number>
  /** Top shared stories */
  topStories: Array<{
    id: string
    shares: number
  }>
  /** Period start timestamp */
  periodStart: string
  /** Period end timestamp */
  periodEnd: string
  /** Percentage of successful share events */
  successRate?: number
  /** Number of shares per platform */
  platformShares?: Record<SharePlatform, number>
  /** List of share events */
  events?: ShareEvent[]
}

/**
 * Interface for analytics tracking implementations.
 * Defines the contract for tracking share events.
 * 
 * @example
 * ```ts
 * class GoogleAnalytics implements IShareAnalytics {
 *   async trackShare(event: ShareEvent): Promise<void> {
 *     // Track share event in Google Analytics
 *   }
 *   
 *   async getShareAnalytics(userId: string): Promise<ShareAnalytics> {
 *     // Fetch share analytics from Google Analytics
 *   }
 * }
 * ```
 */
export interface IShareAnalytics {
  trackShare(event: ShareEvent): Promise<void>
  getShareAnalytics(userId: string, startDate?: string, endDate?: string): Promise<ShareAnalytics>
  subscribe(listener: (analytics: ShareAnalytics) => void): () => void
  exportAnalytics(): string
  exportAnalyticsCSV(): string
  clearAnalytics(): void
} 