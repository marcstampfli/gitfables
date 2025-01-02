/**
 * @module components/dashboard/stats
 * @description Stats component for displaying dashboard metrics
 */

import { Card } from '@/components/ui/card'
import { 
  BookOpen, 
  GitFork, 
  Share2, 
  TrendingUp, 
  TrendingDown,
  ArrowRight,
  Eye
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface DashboardStatsProps {
  stats?: {
    totalStories: number
    totalRepositories: number
    totalViews: number
    totalShares: number
    previousPeriod?: {
      totalStories: number
      totalRepositories: number
      totalViews: number
      totalShares: number
    }
  }
}

interface StatCardProps {
  label: string
  value: number
  previousValue?: number
  icon: React.ReactNode
  href: string
  trend?: {
    value: number
    label: string
    isPositive?: boolean
  }
}

function StatCard({ label, value, previousValue, icon, href, trend }: StatCardProps) {
  const hasIncreased = previousValue !== undefined ? value > previousValue : undefined
  const changePercent = previousValue !== undefined 
    ? ((value - previousValue) / previousValue * 100).toFixed(1)
    : undefined

  return (
    <Link href={href}>
      <Card className="p-6 hover:shadow-md transition-shadow group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-muted/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-md bg-muted">
              {icon}
            </div>
            {changePercent && (
              <div className={cn(
                "flex items-center text-xs",
                hasIncreased ? "text-green-500" : "text-red-500"
              )}>
                {hasIncreased ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                <span>{Math.abs(Number(changePercent))}% {hasIncreased ? 'increase' : 'decrease'}</span>
              </div>
            )}
          </div>
          <div className="mt-4 space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-bold">{value.toLocaleString()}</h3>
              {changePercent && (
                <span className={cn(
                  "text-xs",
                  hasIncreased ? "text-green-500" : "text-red-500"
                )}>
                  {hasIncreased ? "+" : ""}{changePercent}%
                </span>
              )}
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
            <span>View details</span>
            <ArrowRight className="ml-1 h-3 w-3 transform translate-x-0 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Card>
    </Link>
  )
}

export function DashboardStats({ stats = { 
  totalStories: 0, 
  totalRepositories: 0, 
  totalViews: 0,
  totalShares: 0,
  previousPeriod: {
    totalStories: 0,
    totalRepositories: 0,
    totalViews: 0,
    totalShares: 0
  }
} }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatCard
        label="Total Stories"
        value={stats.totalStories}
        previousValue={stats.previousPeriod?.totalStories}
        icon={<BookOpen className="h-5 w-5 text-primary" />}
        href="/dashboard/stories"
      />
      <StatCard
        label="Connected Repositories"
        value={stats.totalRepositories}
        previousValue={stats.previousPeriod?.totalRepositories}
        icon={<GitFork className="h-5 w-5 text-primary" />}
        href="/dashboard/repositories"
      />
      <StatCard
        label="Story Views"
        value={stats.totalViews}
        previousValue={stats.previousPeriod?.totalViews}
        icon={<Eye className="h-5 w-5 text-primary" />}
        href="/dashboard/analytics"
      />
      <StatCard
        label="Story Shares"
        value={stats.totalShares}
        previousValue={stats.previousPeriod?.totalShares}
        icon={<Share2 className="h-5 w-5 text-primary" />}
        href="/dashboard/analytics"
      />
    </div>
  )
} 