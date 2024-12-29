/**
 * @module hooks/use-activity
 * @description Hook for tracking and fetching user activity
 */

'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import { logError } from '@/lib/utils/logger'
import type { ActivityType, ActivityDetails } from '@/types/activity'

export interface Activity {
  id: string
  type: ActivityType
  details: ActivityDetails
  created_at: string
}

export interface ActivitySummary {
  total_activities: number
  activities_by_type: Record<ActivityType, number>
  recent_activities: Activity[]
}

export function useActivity() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  const trackActivity = useCallback(async (
    type: ActivityType,
    details: ActivityDetails = {}
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await supabase
        .from('user_activity')
        .insert({
          user_id: user.id,
          activity_type: type,
          details
        })
    } catch (error) {
      logError('Failed to track activity', { 
        metadata: { 
          error,
          activityType: type,
          details 
        }
      })
    }
  }, [supabase])

  const getActivitySummary = useCallback(async (
    startDate: Date,
    endDate: Date = new Date()
  ): Promise<ActivitySummary | null> => {
    try {
      setLoading(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const { data, error } = await supabase
        .rpc('get_user_activity_summary', {
          p_user_id: user.id,
          p_start_date: startDate.toISOString(),
          p_end_date: endDate.toISOString()
        })

      if (error) throw error

      return data as ActivitySummary
    } catch (error) {
      logError('Failed to fetch activity summary', { 
        metadata: { 
          error,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString() 
        }
      })
      toast({
        title: 'Error',
        description: 'Failed to fetch activity summary',
        variant: 'destructive'
      })
      return null
    } finally {
      setLoading(false)
    }
  }, [supabase, toast])

  const getRecentActivity = useCallback(async (
    days: number = 30
  ): Promise<ActivitySummary | null> => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    return getActivitySummary(startDate)
  }, [getActivitySummary])

  return {
    loading,
    trackActivity,
    getActivitySummary,
    getRecentActivity
  }
} 