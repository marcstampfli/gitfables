/**
 * @module app/(dashboard)/dashboard/activity/page
 * @description User activity page
 */

'use client'

import { useState, useEffect } from 'react'
import { useActivity, type Activity } from '@/hooks/use-activity'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Activity as ActivityIcon } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

function getActivityIcon(type: Activity['type']) {
  switch (type) {
    case 'story_created':
    case 'story_updated':
    case 'story_shared':
    case 'story_exported':
      return '📖'
    case 'api_key_created':
    case 'api_key_deleted':
      return '🔑'
    case 'settings_updated':
      return '⚙️'
    default:
      return '📝'
  }
}

function getActivityDescription(activity: Activity): string {
  const { type, details } = activity

  switch (type) {
    case 'story_created':
      return `Created story "${details.title}"`
    case 'story_updated':
      return `Updated story "${details.title}"`
    case 'story_shared':
      return `Shared story "${details.title}"`
    case 'story_exported':
      return `Exported story "${details.title}"`
    case 'api_key_created':
      return `Created API key "${details.name}"`
    case 'api_key_deleted':
      return `Deleted API key "${details.name}"`
    case 'settings_updated':
      return 'Updated settings'
    default:
      return 'Unknown activity'
  }
}

export default function ActivityPage() {
  const { loading, getActivitySummary } = useActivity()
  const [timeRange, setTimeRange] = useState('30')
  const [summary, setSummary] = useState<{
    total: number
    byType: Record<string, number>
    recent: Activity[]
  } | null>(null)

  useEffect(() => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(timeRange))

    getActivitySummary(startDate).then((data) => {
      if (data) {
        setSummary({
          total: data.total_activities,
          byType: data.activities_by_type,
          recent: data.recent_activities,
        })
      }
    })
  }, [timeRange, getActivitySummary])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Activity</h3>
          <p className="text-sm text-muted-foreground">
            View your recent activity and usage statistics
          </p>
        </div>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : summary ? (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ActivityIcon className="h-4 w-4" />
                <Label>Total Activities</Label>
              </div>
              <p className="text-2xl font-bold">{summary.total}</p>
            </Card>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Recent Activity</h4>
              <div className="space-y-4">
                {summary.recent.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 text-sm"
                  >
                    <div className="text-2xl">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">
                        {getActivityDescription(activity)}
                      </p>
                      <p className="text-muted-foreground">
                        {formatDistanceToNow(new Date(activity.created_at), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          No activity data available for the selected time range
        </div>
      )}
    </div>
  )
} 