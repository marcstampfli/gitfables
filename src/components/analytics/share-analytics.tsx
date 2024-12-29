/**
 * @module ShareAnalytics
 * @description A component that displays and manages analytics data for share events.
 * Provides visualization of share statistics and export functionality.
 */

'use client'

import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import dynamic from 'next/dynamic'
import type { ShareAnalytics as ShareAnalyticsType, IShareAnalytics } from '@/types/analytics'
import { AnalyticsHeader } from './analytics-header'
import { AnalyticsMetrics } from './analytics-metrics'
import { AnalyticsEvents } from './analytics-events'

/**
 * Analytics data interface
 */
type Analytics = Required<ShareAnalyticsType>

/**
 * Dynamic import wrapper for the analytics service
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
      setAnalytics({
        ...shareAnalytics,
        successRate: shareAnalytics.successRate ?? 100,
        platformShares: shareAnalytics.platformShares ?? shareAnalytics.platformBreakdown,
        events: shareAnalytics.events ?? []
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

  const handleClear = async (service: IShareAnalytics) => {
    try {
      await service.clearAnalytics()
      toast({
        title: 'Success',
        description: 'Analytics data has been cleared.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to clear analytics data.',
        variant: 'destructive',
      })
    }
  }

  return (
    <ShareAnalyticsComponent>
      {(analyticsService) => {
        if (!service) {
          setService(analyticsService)
          return null
        }

        if (!analytics) {
          return <div>Loading analytics...</div>
        }

        return (
          <div className="space-y-6">
            <AnalyticsHeader
              service={service}
              onExportJSON={handleExportJSON}
              onExportCSV={handleExportCSV}
              onClear={handleClear}
            />
            <AnalyticsMetrics
              totalShares={analytics.totalShares}
              successRate={analytics.successRate}
              platformShares={analytics.platformShares}
            />
            <AnalyticsEvents events={analytics.events} />
          </div>
        )
      }}
    </ShareAnalyticsComponent>
  )
} 