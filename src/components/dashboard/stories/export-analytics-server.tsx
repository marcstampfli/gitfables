/**
 * @module components/dashboard/stories/export-analytics-server
 * @description Server component for fetching export analytics data
 */

import { createClient } from '@/lib/supabase/server'
import { ExportAnalytics } from '@/components/dashboard/stories/export-analytics'
import type { ActivityType } from '@/types/activity'

async function getExportActivities(days: number) {
  const supabase = await createClient()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data: activities, error } = await supabase
    .from('activities')
    .select('details, created_at')
    .in('type', ['story_exported', 'story_batch_exported'] as ActivityType[])
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: true })

  if (error) throw error
  return activities
}

export async function ExportAnalyticsServer() {
  const activities = await getExportActivities(90) // Fetch 90 days of data

  return (
    <ExportAnalytics initialActivities={activities} />
  )
} 