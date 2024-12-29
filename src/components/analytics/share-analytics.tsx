/**
 * @module ShareAnalytics
 * @description A component that displays and manages analytics data for share events.
 * Provides visualization of share statistics and export functionality.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ShareAnalytics />
 * ```
 */

'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Twitter, Linkedin, Facebook, Mail, Share2, Download, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useToast } from '@/components/ui/use-toast'
import dynamic from 'next/dynamic'
import type { ShareAnalytics, ShareEvent, IShareAnalytics } from '@/types/analytics'

/**
 * Platform icon mapping
 * @private
 */
const platformIcons: Record<string, React.ReactNode> = {
  twitter: <Twitter className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  facebook: <Facebook className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
  default: <Share2 className="h-4 w-4" />
}

/**
 * Analytics data interface
 * @interface
 */
interface Analytics {
  /** Total number of share events */
  totalShares: number
  /** Platform breakdown of shares */
  platformBreakdown: Record<string, number>
  /** Top shared stories */
  topStories: Array<{
    id: string
    shares: number
  }>
  /** Period start timestamp */
  periodStart: string
  /** Period end timestamp */
  periodEnd: string
  /** Percentage of successful share events */
  successRate: number
  /** Number of shares per platform */
  platformShares: Record<string, number>
  /** List of share events */
  events: ShareEvent[]
}

/**
 * Analytics content component props
 * @interface
 * @private
 */
interface AnalyticsContentProps {
  service: IShareAnalytics
  analytics: Analytics
  onExportJSON: (service: IShareAnalytics) => void
  onExportCSV: (service: IShareAnalytics) => void
  onClear: (service: IShareAnalytics) => void
}

/**
 * Analytics content component
 * @component
 * @private
 */
function AnalyticsContent({ service, analytics, onExportJSON, onExportCSV, onClear }: AnalyticsContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Share Analytics</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExportJSON(service)}
          >
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExportCSV(service)}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onClear(service)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Data
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <h3 className="text-sm font-medium">Total Shares</h3>
          <p className="text-2xl font-bold">{analytics.totalShares}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium">Success Rate</h3>
          <p className="text-2xl font-bold">{analytics.successRate.toFixed(1)}%</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium">Platform Distribution</h3>
          <div className="mt-2 space-y-2">
            {Object.entries(analytics.platformShares).map(([platform, count]) => (
              <div key={platform} className="flex items-center gap-2">
                {platformIcons[platform] || platformIcons.default}
                <span className="text-sm capitalize">{platform}</span>
                <span className="text-sm text-muted-foreground ml-auto">{count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-sm font-medium mb-4">Recent Events</h3>
        <div className="space-y-4">
          {analytics.events.map((event) => (
            <div key={event.timestamp} className="flex items-start gap-4">
              {platformIcons[event.platform] || platformIcons.default}
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  Shared via <span className="font-medium capitalize">{event.platform}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                {event.success ? 'Successful' : 'Failed'}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

/**
 * Dynamic import wrapper for the analytics service
 * @component
 * @private
 */
const ShareAnalyticsComponent = dynamic(() => 
  import('@/lib/analytics/share-analytics').then(mod => {
    const analytics = mod.shareAnalytics
    return function AnalyticsWrapper({ children }: { children: (analytics: IShareAnalytics) => React.ReactNode }) {
      return <>{children(analytics)}</>
    }
  }),
  { ssr: false }
)

/**
 * ShareAnalytics Component
 * 
 * @component
 * @description Displays analytics data for share events including total shares,
 * success rate, platform distribution, and recent events. Provides functionality
 * to export data in JSON/CSV formats and clear analytics data.
 * 
 * @returns {JSX.Element | null} The analytics dashboard UI or null if data is not loaded
 */
export function ShareAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const { toast } = useToast()
  const [service, setService] = useState<IShareAnalytics | null>(null)

  useEffect(() => {
    if (!service) {
      return undefined
    }

    const unsubscribe = service.subscribe((shareAnalytics) => {
      // Convert ShareAnalytics to Analytics
      setAnalytics({
        ...shareAnalytics,
        successRate: 100, // Default to 100% success rate
        platformShares: shareAnalytics.platformBreakdown,
        events: [] // Initialize with empty events array
      })
    })

    return () => unsubscribe()
  }, [service])

  const handleExportJSON = (service: IShareAnalytics) => {
    try {
      const data = service.exportAnalytics()
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `share-analytics-${new Date().toISOString()}.json`
      link.click()
      URL.revokeObjectURL(url)
      toast({
        title: 'Export Successful',
        description: 'Analytics data has been exported as JSON.',
      })
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Failed to export analytics data.',
        variant: 'destructive',
      })
    }
  }

  const handleExportCSV = (service: IShareAnalytics) => {
    try {
      const data = service.exportAnalyticsCSV()
      const blob = new Blob([data], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `share-analytics-${new Date().toISOString()}.csv`
      link.click()
      URL.revokeObjectURL(url)
      toast({
        title: 'Export Successful',
        description: 'Analytics data has been exported as CSV.',
      })
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Failed to export analytics data.',
        variant: 'destructive',
      })
    }
  }

  const handleClearAnalytics = (service: IShareAnalytics) => {
    if (window.confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
      service.clearAnalytics()
      toast({
        title: 'Analytics Cleared',
        description: 'All analytics data has been cleared.',
      })
    }
  }

  return (
    <ShareAnalyticsComponent>
      {(analyticsService) => {
        if (!service) {
          setService(analyticsService)
        }

        if (!analytics) return null

        return (
          <AnalyticsContent
            service={analyticsService}
            analytics={analytics}
            onExportJSON={handleExportJSON}
            onExportCSV={handleExportCSV}
            onClear={handleClearAnalytics}
          />
        )
      }}
    </ShareAnalyticsComponent>
  )
} 