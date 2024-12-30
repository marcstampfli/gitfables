/**
 * @module components/analytics/analytics-header
 * @description Header component for analytics with export and clear actions
 */

import { Button } from '@/components/ui/button'
import { Download, Trash2 } from 'lucide-react'
import type { IShareAnalytics } from '@/types/analytics'

interface AnalyticsHeaderProps {
  onExportJSON: (service: IShareAnalytics) => void
  onExportCSV: (service: IShareAnalytics) => void
  onClear: (service: IShareAnalytics) => void
  service: IShareAnalytics
}

export function AnalyticsHeader({ service, onExportJSON, onExportCSV, onClear }: AnalyticsHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Share Analytics</h2>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onExportJSON(service)}
          icon={<Download className="h-4 w-4" />}
          iconPosition="left"
        >
          Export JSON
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onExportCSV(service)}
          icon={<Download className="h-4 w-4" />}
          iconPosition="left"
        >
          Export CSV
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onClear(service)}
          icon={<Trash2 className="h-4 w-4" />}
          iconPosition="left"
        >
          Clear Data
        </Button>
      </div>
    </div>
  )
} 