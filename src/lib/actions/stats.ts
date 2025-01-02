/**
 * @module lib/actions/stats
 * @description Actions for fetching dashboard statistics
 */

import { createServerClient } from '@/lib/supabase/server'
import { logError } from '@/lib/utils/logger'
import type { DashboardStats } from '@/types/dashboard'

export interface WeeklyStats {
  weekStart: string
  views: number
  shares: number
}

/**
 * Get weekly statistics for views and shares
 */
export async function getWeeklyStats(): Promise<WeeklyStats[]> {
  try {
    const supabase = await createServerClient()
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not found')

    // Get story views by week
    const { data: viewsData, error: viewsError } = await supabase
      .from('stories')
      .select('view_count, created_at')
      .eq('user_id', user.id)
      .gte('created_at', thirtyDaysAgo.toISOString())

    if (viewsError) throw viewsError

    // Get shares by week
    const { data: sharesData, error: sharesError } = await supabase
      .from('story_shares')
      .select('created_at')
      .eq('user_id', user.id)
      .gte('created_at', thirtyDaysAgo.toISOString())

    if (sharesError) throw sharesError

    // Group data by week
    const weeklyData = new Map<string, WeeklyStats>()
    const getWeekStart = (date: Date) => {
      const weekStart = new Date(date)
      weekStart.setDate(weekStart.getDate() - weekStart.getDay())
      weekStart.setHours(0, 0, 0, 0)
      return weekStart.toISOString()
    }

    // Process views
    viewsData.forEach(story => {
      const weekStart = getWeekStart(new Date(story.created_at))
      const existing = weeklyData.get(weekStart) || { weekStart, views: 0, shares: 0 }
      existing.views += story.view_count || 0
      weeklyData.set(weekStart, existing)
    })

    // Process shares
    sharesData.forEach(share => {
      const weekStart = getWeekStart(new Date(share.created_at))
      const existing = weeklyData.get(weekStart) || { weekStart, views: 0, shares: 0 }
      existing.shares += 1
      weeklyData.set(weekStart, existing)
    })

    // Convert to array and sort by week
    return Array.from(weeklyData.values()).sort((a, b) => 
      new Date(a.weekStart).getTime() - new Date(b.weekStart).getTime()
    )
  } catch (error) {
    logError('Failed to fetch weekly stats', error, {
      context: 'dashboard:weekly-stats'
    })
    return []
  }
}

/**
 * Get dashboard statistics
 */
export async function getStats(): Promise<DashboardStats> {
  try {
    const supabase = await createServerClient()
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not found')

    // Current period stats
    const [repoResult, storyResult, viewResult, shareResult] = await Promise.all([
      supabase
        .from('repositories')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id)
        .gte('created_at', thirtyDaysAgo.toISOString()),
      supabase
        .from('stories')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id)
        .gte('created_at', thirtyDaysAgo.toISOString()),
      supabase
        .from('stories')
        .select('view_count')
        .eq('user_id', user.id)
        .gte('created_at', thirtyDaysAgo.toISOString()),
      supabase
        .from('story_shares')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id)
        .gte('created_at', thirtyDaysAgo.toISOString())
    ])

    // Previous period stats
    const [prevRepoResult, prevStoryResult, prevViewResult, prevShareResult] = await Promise.all([
      supabase
        .from('repositories')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id)
        .gte('created_at', sixtyDaysAgo.toISOString())
        .lt('created_at', thirtyDaysAgo.toISOString()),
      supabase
        .from('stories')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id)
        .gte('created_at', sixtyDaysAgo.toISOString())
        .lt('created_at', thirtyDaysAgo.toISOString()),
      supabase
        .from('stories')
        .select('view_count')
        .eq('user_id', user.id)
        .gte('created_at', sixtyDaysAgo.toISOString())
        .lt('created_at', thirtyDaysAgo.toISOString()),
      supabase
        .from('story_shares')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id)
        .gte('created_at', sixtyDaysAgo.toISOString())
        .lt('created_at', thirtyDaysAgo.toISOString())
    ])

    if (repoResult.error) throw repoResult.error
    if (storyResult.error) throw storyResult.error
    if (viewResult.error) throw viewResult.error
    if (shareResult.error) throw shareResult.error

    if (prevRepoResult.error) throw prevRepoResult.error
    if (prevStoryResult.error) throw prevStoryResult.error
    if (prevViewResult.error) throw prevViewResult.error
    if (prevShareResult.error) throw prevShareResult.error

    // Calculate total views by summing view_count from stories
    const totalViews = viewResult.data?.reduce((sum, story) => sum + (story.view_count || 0), 0) ?? 0
    const prevTotalViews = prevViewResult.data?.reduce((sum, story) => sum + (story.view_count || 0), 0) ?? 0

    return {
      totalRepositories: repoResult.count ?? 0,
      totalStories: storyResult.count ?? 0,
      totalViews: totalViews,
      totalShares: shareResult.count ?? 0,
      previousPeriod: {
        totalRepositories: prevRepoResult.count ?? 0,
        totalStories: prevStoryResult.count ?? 0,
        totalViews: prevTotalViews,
        totalShares: prevShareResult.count ?? 0
      }
    }
  } catch (error) {
    logError('Failed to fetch dashboard stats', error, {
      context: 'dashboard:stats'
    })
    return {
      totalRepositories: 0,
      totalStories: 0,
      totalViews: 0,
      totalShares: 0,
      previousPeriod: {
        totalRepositories: 0,
        totalStories: 0,
        totalViews: 0,
        totalShares: 0
      }
    }
  }
} 