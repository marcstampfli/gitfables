/**
 * @module lib/actions/stats
 * @description Actions for fetching dashboard statistics
 */

import { createClient } from '@/lib/supabase/server'
import { logError } from '@/lib/utils/logger'
import type { DashboardStats } from '@/types/dashboard'

/**
 * Get dashboard statistics
 */
export async function getStats(): Promise<DashboardStats> {
  try {
    const supabase = await createClient()

    // Get repository count
    const repoResult = await supabase
      .from('repositories')
      .select('id', { count: 'exact' })

    if (repoResult.error) {
      throw repoResult.error
    }

    // Get story count
    const storyResult = await supabase
      .from('stories')
      .select('id', { count: 'exact' })

    if (storyResult.error) {
      throw storyResult.error
    }

    // Get view count
    const viewResult = await supabase
      .from('story_views')
      .select('id', { count: 'exact' })

    if (viewResult.error) {
      throw viewResult.error
    }

    // Get share count
    const shareResult = await supabase
      .from('story_shares')
      .select('id', { count: 'exact' })

    if (shareResult.error) {
      throw shareResult.error
    }

    return {
      totalRepositories: repoResult.count ?? 0,
      totalStories: storyResult.count ?? 0,
      totalViews: viewResult.count ?? 0,
      totalShares: shareResult.count ?? 0
    }
  } catch (error) {
    logError('Failed to fetch dashboard stats', error, {
      context: 'dashboard:stats'
    })
    return {
      totalRepositories: 0,
      totalStories: 0,
      totalViews: 0,
      totalShares: 0
    }
  }
} 