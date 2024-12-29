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
 * Supported social media platforms for sharing.
 * Used to track which platforms users share stories on.
 */
export type SharePlatform = 'twitter' | 'linkedin' | 'facebook'

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
  totalShares: number
  platformBreakdown: Record<SharePlatform, number>
  topStories: Array<{
    id: string
    shares: number
  }>
  periodStart: string
  periodEnd: string
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
} 