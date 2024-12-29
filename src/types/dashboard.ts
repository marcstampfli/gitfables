/**
 * @module types/dashboard
 * @description Type definitions for dashboard components and data
 */

/**
 * Story type for dashboard display
 */
export interface Story {
  id: string
  title: string
  description: string
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  repository: {
    id: string
    name: string
    provider: string
  } | null
}

/**
 * Repository type for dashboard display
 */
export interface Repository {
  id: string
  name: string
  provider: string
  url: string
  createdAt: string
}

/**
 * Dashboard statistics
 */
export interface DashboardStats {
  totalStories: number
  totalRepositories: number
  totalViews: number
  totalShares: number
}

/**
 * Dashboard activity item
 */
export interface ActivityItem {
  id: string
  type: 'story_created' | 'story_published' | 'repository_connected' | 'story_shared'
  title: string
  description: string
  timestamp: string
  metadata?: Record<string, unknown>
} 