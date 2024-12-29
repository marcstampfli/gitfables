/**
 * @module components/analytics/analytics-metrics
 * @description Metrics cards component showing analytics statistics
 */

import { Card } from '@/components/ui/card'
import { Twitter, Linkedin, Facebook, Mail, Share2 } from 'lucide-react'

/**
 * Platform icon mapping
 */
export const platformIcons: Record<string, React.ReactNode> = {
  twitter: <Twitter className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  facebook: <Facebook className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
  default: <Share2 className="h-4 w-4" />
}

interface AnalyticsMetricsProps {
  totalShares: number
  successRate: number
  platformShares: Record<string, number>
}

export function AnalyticsMetrics({ totalShares, successRate, platformShares }: AnalyticsMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-4">
        <h3 className="text-sm font-medium">Total Shares</h3>
        <p className="text-2xl font-bold">{totalShares}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium">Success Rate</h3>
        <p className="text-2xl font-bold">{successRate.toFixed(1)}%</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium">Platform Distribution</h3>
        <div className="mt-2 space-y-2">
          {Object.entries(platformShares).map(([platform, count]) => (
            <div key={platform} className="flex items-center gap-2">
              {platformIcons[platform] || platformIcons.default}
              <span className="text-sm capitalize">{platform}</span>
              <span className="text-sm text-muted-foreground ml-auto">{count}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 