/**
 * @module components/analytics/analytics-events
 * @description Component for displaying recent share events
 */

import { Card } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import type { ShareEvent } from '@/types/analytics'
import { platformIcons } from './analytics-metrics'

interface AnalyticsEventsProps {
  events: ShareEvent[]
}

export function AnalyticsEvents({ events }: AnalyticsEventsProps) {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-4">Recent Events</h3>
      <div className="space-y-4">
        {events.map((event) => (
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
  )
} 