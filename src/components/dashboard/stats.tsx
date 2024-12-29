/**
 * @module components/dashboard/stats
 * @description Stats component for displaying dashboard statistics
 */

import { Card } from '@/components/ui/card'
import { GitFork, BookOpen, Share2, Eye } from 'lucide-react'
import type { DashboardStats } from '@/types/dashboard'

interface DashboardStatsProps {
  stats: DashboardStats
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6">
        <div className="flex items-center gap-2">
          <GitFork className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold">Total Repositories</h3>
        </div>
        <p className="mt-2 text-2xl font-bold">{stats.totalRepositories}</p>
      </Card>
      <Card className="p-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold">Total Stories</h3>
        </div>
        <p className="mt-2 text-2xl font-bold">{stats.totalStories}</p>
      </Card>
      <Card className="p-6">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold">Total Views</h3>
        </div>
        <p className="mt-2 text-2xl font-bold">{stats.totalViews}</p>
      </Card>
      <Card className="p-6">
        <div className="flex items-center gap-2">
          <Share2 className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold">Total Shares</h3>
        </div>
        <p className="mt-2 text-2xl font-bold">{stats.totalShares}</p>
      </Card>
    </div>
  )
} 