/**
 * @module lib/actions/exports
 * @description Actions for handling story exports
 */

import { createServerClient } from '@/lib/supabase/server'
import { type ActivityType } from '@/types/activity'

export interface ExportRecord {
  id: string
  storyTitle: string
  format: string
  status: 'completed' | 'failed' | 'processing'
  createdAt: string
}

/**
 * Fetches the export history for stories
 * @returns Array of export records
 */
export async function getExportHistory(): Promise<ExportRecord[]> {
  const supabase = await createServerClient()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 90) // Last 90 days

  const { data: activities, error } = await supabase
    .from('activities')
    .select('id, details, created_at')
    .in('type', ['story_exported', 'story_batch_exported'] as ActivityType[])
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: false })

  if (error) throw error

  return activities.map(activity => ({
    id: activity.id,
    storyTitle: activity.details.storyTitle || 'Untitled Story',
    format: activity.details.format || 'Unknown',
    status: activity.details.status || 'completed',
    createdAt: activity.created_at
  }))
} 