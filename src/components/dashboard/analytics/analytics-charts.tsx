'use client'

/**
 * @module components/dashboard/analytics/analytics-charts
 * @description Client component for rendering analytics charts
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExportAnalyticsClient } from '@/components/dashboard/stories/export-analytics-client'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { format } from 'date-fns'
import type { WeeklyStats } from '@/lib/actions/stats'
import type { ExportRecord } from '@/lib/actions/exports'

interface AnalyticsChartsProps {
  weeklyStats: WeeklyStats[]
  exports: ExportRecord[]
}

export function AnalyticsCharts({ weeklyStats, exports }: AnalyticsChartsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Analytics</CardTitle>
        <CardDescription>
          View detailed analytics about your stories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="exports" className="space-y-4">
          <TabsList>
            <TabsTrigger value="exports">Exports</TabsTrigger>
            <TabsTrigger value="views">Views</TabsTrigger>
            <TabsTrigger value="shares">Shares</TabsTrigger>
          </TabsList>
          <TabsContent value="exports">
            <ExportAnalyticsClient exports={exports} />
          </TabsContent>
          <TabsContent value="views">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyStats.map(stat => ({
                  name: format(new Date(stat.weekStart), 'MMM d'),
                  views: stat.views
                }))}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="shares">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyStats.map(stat => ({
                  name: format(new Date(stat.weekStart), 'MMM d'),
                  shares: stat.shares
                }))}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="shares" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 