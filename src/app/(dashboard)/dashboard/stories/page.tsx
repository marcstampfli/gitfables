/**
 * @module app/dashboard/stories/page
 * @description Stories page
 */

import { StoriesList, ExportAnalyticsServer } from '@/components/dashboard/stories'

export default function StoriesPage() {
  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <StoriesList />
        </div>
        <div>
          <ExportAnalyticsServer />
        </div>
      </div>
    </div>
  )
} 