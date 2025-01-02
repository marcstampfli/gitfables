/**
 * @module app/dashboard/page
 * @description Main dashboard page component
 */

import { Suspense } from 'react'
import Link from 'next/link'
import { getStats } from '@/lib/actions/stats'
import { getUser } from '@/lib/actions/auth'
import { createServerClient } from '@/lib/supabase/server'
import { StoryList } from '@/components/stories/story-list'
import { RepositoryList } from '@/components/repositories/repository-list'
import { DashboardStats } from '@/components/dashboard/stats'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { ActivityType, ActivityDetails } from '@/types/activity'
import { 
  ArrowRight, 
  BookOpen, 
  GitBranch, 
  History,
  Settings,
  Share2,
  Star,
  Users,
  Zap,
  Keyboard,
  UserCircle2
} from 'lucide-react'

interface UserActivity {
  id: string
  activity_type: ActivityType
  details: ActivityDetails
  created_at: string
  user_id: string
}

// Loading components
function StatsLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="p-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function QuickActionsLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[...Array(2)].map((_, i) => (
        <Skeleton key={i} className="h-20 w-full" />
      ))}
    </div>
  )
}

export default async function DashboardPage() {
  const supabase = await createServerClient()

  // Fetch all data in parallel
  const [stats, user, activityData] = await Promise.all([
    getStats(),
    getUser(),
    supabase
      .from('user_activity')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
  ])

  if (activityData.error) {
    console.error('Failed to fetch activities:', activityData.error)
  }

  const recentActivities = (activityData.data as UserActivity[] || [])
    .filter(activity => {
      // Only include activity types that are supported by the ActivityFeed
      const supportedTypes = [
        'story_created',
        'story_shared',
        'story_published',
        'repository_connected'
      ] as const
      return supportedTypes.includes(activity.activity_type as any)
    })
    .map(activity => ({
      id: activity.id,
      type: activity.activity_type as "story_created" | "story_shared" | "story_published" | "repository_connected",
      title: activity.details.title || '',
      timestamp: activity.created_at
    }))

  const dashboardStats = {
    totalStories: stats.totalStories,
    totalRepositories: stats.totalRepositories,
    totalViews: stats.totalViews,
    totalShares: stats.totalShares
  }

  return (
    <div className="container space-y-8">
      {/* Stats Row */}
      <div className="w-full">
        <Suspense fallback={<StatsLoading />}>
          <DashboardStats stats={dashboardStats} />
        </Suspense>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Column */}
        <div className="space-y-8 lg:col-span-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Transform your code history into engaging stories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button
                  asChild
                  className="h-[100px] flex-col items-start justify-between p-6 relative overflow-hidden bg-primary hover:bg-primary/90 transition-colors group"
                >
                  <Link href="/dashboard/stories/new">
                    <div className="flex flex-col h-full w-full text-primary-foreground">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-5 w-5" />
                        <span className="font-medium">Create Story</span>
                      </div>
                      <p className="text-sm text-primary-foreground/80 mt-2">
                        Transform your commits into an engaging narrative
                      </p>
                      <ArrowRight className="h-5 w-5 transform translate-x-0 group-hover:translate-x-1 transition-transform ml-auto mt-2" />
                    </div>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-[100px] flex-col items-start justify-between p-6 relative overflow-hidden hover:bg-muted/50 transition-colors group"
                >
                  <Link href="/dashboard/repositories/new">
                    <div className="absolute top-2 right-2">
                      <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        Multi-Platform
                      </span>
                    </div>
                    <div className="flex flex-col h-full w-full">
                      <div className="flex items-center space-x-2">
                        <GitBranch className="h-5 w-5" />
                        <span className="font-medium">Connect Repository</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Connect your code repositories from any platform
                      </p>
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Stories */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Recent Stories</CardTitle>
                <CardDescription>
                  Your latest generated stories and drafts
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Stories
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link href="/dashboard/stories">
                    View all
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading stories...</div>}>
                <StoryList />
              </Suspense>
            </CardContent>
          </Card>

          {/* Connected Repositories */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Connected Repositories</CardTitle>
                <CardDescription>
                  Your connected code repositories
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <History className="mr-2 h-4 w-4" />
                  Sync All
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link href="/dashboard/repositories">
                    View all
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading repositories...</div>}>
                <RepositoryList />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Activity Feed */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Activity</CardTitle>
                  <CardDescription>
                    Recent actions and updates
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/activity">
                    View all
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ActivityFeed activities={recentActivities} />
            </CardContent>
          </Card>

          {/* Quick Access */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link href="/docs/pro-features">
                    <Star className="mr-2 h-4 w-4" />
                    Pro Features
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link href="/community">
                    <Users className="mr-2 h-4 w-4" />
                    Community
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link href="/docs/keyboard-shortcuts">
                    <Keyboard className="mr-2 h-4 w-4" />
                    Shortcuts
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 