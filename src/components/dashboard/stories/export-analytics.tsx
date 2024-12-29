/**
 * @module components/dashboard/stories/export-analytics
 * @description Component for displaying export analytics
 */

'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { FileText, FileJson, FileType, Download, TrendingUp } from 'lucide-react'
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { format, subDays, eachDayOfInterval } from 'date-fns'
import { useToast } from '@/components/ui/use-toast'
import { logError } from '@/lib/utils/logger'

interface Activity {
  details: {
    format?: string
    count?: number
  }
  created_at: string
}

interface ExportStats {
  format: string
  count: number
  percentage: number
}

interface DailyStats {
  date: string
  count: number
}

interface TimeRange {
  label: string
  days: number
}

interface ExportAnalyticsProps {
  initialActivities: Activity[]
}

const TIME_RANGES: TimeRange[] = [
  { label: 'Last 7 Days', days: 7 },
  { label: 'Last 30 Days', days: 30 },
  { label: 'Last 90 Days', days: 90 }
]

const CHART_COLORS = ['#0ea5e9', '#f97316', '#8b5cf6', '#84cc16', '#ec4899']

export function ExportAnalytics({ initialActivities }: ExportAnalyticsProps) {
  const [timeRange, setTimeRange] = React.useState<number>(30)
  const [loading, setLoading] = React.useState(false)
  const [stats, setStats] = React.useState<ExportStats[]>([])
  const [dailyStats, setDailyStats] = React.useState<DailyStats[]>([])
  const [totalExports, setTotalExports] = React.useState(0)
  const { toast } = useToast()

  // Process activities data
  React.useEffect(() => {
    function processActivities(activities: Activity[]) {
      const startDate = subDays(new Date(), timeRange)
      const filteredActivities = activities.filter(
        activity => new Date(activity.created_at) >= startDate
      )

      // Calculate format stats
      const formatCounts = new Map<string, number>()
      let total = 0

      filteredActivities.forEach(activity => {
        const format = activity.details.format || 'unknown'
        const count = activity.details.count || 1
        formatCounts.set(format, (formatCounts.get(format) || 0) + count)
        total += count
      })

      // Convert to array with percentages
      const statsArray: ExportStats[] = Array.from(formatCounts.entries())
        .map(([format, count]) => ({
          format,
          count,
          percentage: (count / total) * 100
        }))
        .sort((a, b) => b.count - a.count)

      // Calculate daily stats
      const dailyMap = new Map<string, number>()
      const dateRange = eachDayOfInterval({
        start: startDate,
        end: new Date()
      })

      // Initialize all dates with 0
      dateRange.forEach(date => {
        dailyMap.set(format(date, 'yyyy-MM-dd'), 0)
      })

      // Add activity counts
      filteredActivities.forEach(activity => {
        const date = format(new Date(activity.created_at), 'yyyy-MM-dd')
        const count = activity.details.count || 1
        dailyMap.set(date, (dailyMap.get(date) || 0) + count)
      })

      // Convert to array
      const dailyArray: DailyStats[] = Array.from(dailyMap.entries())
        .map(([date, count]) => ({
          date,
          count
        }))
        .sort((a, b) => a.date.localeCompare(b.date))

      setStats(statsArray)
      setDailyStats(dailyArray)
      setTotalExports(total)
    }

    try {
      setLoading(true)
      processActivities(initialActivities)
    } catch (error) {
      logError('Failed to process export analytics', { 
        metadata: { 
          error,
          timeRange,
          activityCount: initialActivities.length 
        }
      })
      toast({
        title: 'Analytics Error',
        description: 'Failed to process export statistics. Please try again.',
        variant: 'destructive'
      })
      // Set default empty states
      setStats([])
      setDailyStats([])
      setTotalExports(0)
    } finally {
      setLoading(false)
    }
  }, [timeRange, initialActivities, toast])

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'markdown':
        return <FileText className="h-4 w-4" />
      case 'json':
        return <FileJson className="h-4 w-4" />
      case 'pdf':
        return <FileType className="h-4 w-4" />
      default:
        return <Download className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Export Analytics</h3>
        <div className="w-40">
          <Select
            value={timeRange.toString()}
            onValueChange={(value) => setTimeRange(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_RANGES.map(range => (
                <SelectItem key={range.days} value={range.days.toString()}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium">Total Exports</Label>
          <p className="mt-1 text-2xl font-bold">{totalExports}</p>
        </div>

        <Tabs defaultValue="trend">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="trend">
              <TrendingUp className="mr-2 h-4 w-4" />
              Trend
            </TabsTrigger>
            <TabsTrigger value="formats">
              <FileText className="mr-2 h-4 w-4" />
              Formats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trend" className="space-y-4">
            <div className="h-[300px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyStats}>
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => format(new Date(date), 'MMM d')}
                  />
                  <YAxis allowDecimals={false} />
                  <Tooltip
                    labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
                    formatter={(value: number) => [value, 'Exports']}
                  />
                  <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="formats" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats}
                      dataKey="count"
                      nameKey="format"
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {stats.map((entry, index) => (
                        <Cell
                          key={entry.format}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [value, 'Exports']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {stats.map((stat, index) => (
                  <div key={stat.format} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getFormatIcon(stat.format)}
                      <span className="capitalize">{stat.format}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{stat.count}</span>
                      <span className="text-muted-foreground">
                        ({stat.percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
} 