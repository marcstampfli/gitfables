/**
 * @module app/dashboard/analytics/page
 * @description Analytics page for stories and shares
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getStats, getWeeklyStats } from '@/lib/actions/stats'
import { getExportHistory } from '@/lib/actions/exports'
import { AnalyticsCharts } from '@/components/dashboard/analytics/analytics-charts'

export default async function AnalyticsPage() {
  const [stats, weeklyStats, exports] = await Promise.all([
    getStats(),
    getWeeklyStats(),
    getExportHistory()
  ])

  return (
    <div className="container space-y-8 py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your story performance and engagement
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Stories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStories}</div>
            {stats.previousPeriod && (
              <p className="text-xs text-muted-foreground">
                {stats.totalStories > stats.previousPeriod.totalStories ? '+' : ''}
                {(((stats.totalStories - stats.previousPeriod.totalStories) / stats.previousPeriod.totalStories) * 100).toFixed(1)}%
                {' from last period'}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews}</div>
            {stats.previousPeriod && (
              <p className="text-xs text-muted-foreground">
                {stats.totalViews > stats.previousPeriod.totalViews ? '+' : ''}
                {(((stats.totalViews - stats.previousPeriod.totalViews) / stats.previousPeriod.totalViews) * 100).toFixed(1)}%
                {' from last period'}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Shares
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalShares}</div>
            {stats.previousPeriod && (
              <p className="text-xs text-muted-foreground">
                {stats.totalShares > stats.previousPeriod.totalShares ? '+' : ''}
                {(((stats.totalShares - stats.previousPeriod.totalShares) / stats.previousPeriod.totalShares) * 100).toFixed(1)}%
                {' from last period'}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Engagement Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((stats.totalViews + stats.totalShares) / stats.totalStories).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Actions per story
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <AnalyticsCharts weeklyStats={weeklyStats} exports={exports} />
    </div>
  )
} 