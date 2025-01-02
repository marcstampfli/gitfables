/**
 * @module components/dashboard/settings/advanced-tab
 * @description Advanced settings tab component
 */

import { createServerClient } from '@/lib/supabase/server'
import { logError } from '@/lib/utils/logger'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Settings } from '@/types/settings'

interface SettingsTabProps {
  settings: Settings
}

async function getPerformanceMetrics() {
  try {
    const supabase = await createServerClient()
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Get error logs count
    const { data: errorLogs, error: errorLogsError } = await supabase
      .from('error_logs')
      .select('id', { count: 'exact' })
      .gte('created_at', thirtyDaysAgo.toISOString())

    if (errorLogsError) throw errorLogsError

    // Get total requests count
    const { data: requests, error: requestsError } = await supabase
      .from('request_logs')
      .select('response_time')
      .gte('created_at', thirtyDaysAgo.toISOString())

    if (requestsError) throw requestsError

    // Calculate average response time
    const avgResponseTime = requests?.reduce((sum, req) => sum + (req.response_time || 0), 0) / (requests?.length || 1)

    // Calculate error rate
    const errorRate = ((errorLogs?.count || 0) / (requests?.length || 1)) * 100

    return {
      responseTime: Math.round(avgResponseTime),
      uptime: 99.9, // This should come from a monitoring service
      errorRate: errorRate.toFixed(2)
    }
  } catch (error) {
    logError('Failed to fetch performance metrics', error, {
      context: 'settings:performance'
    })
    return {
      responseTime: 0,
      uptime: 0,
      errorRate: 0
    }
  }
}

export async function AdvancedTab({ settings }: SettingsTabProps) {
  const metrics = await getPerformanceMetrics()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Advanced Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure advanced settings for your account
        </p>
      </div>
      <Separator />
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-medium">Developer Options</h4>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable detailed logging and debugging information
                    </p>
                  </div>
                  <Switch checked={settings.debugMode} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>API Access</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable API access for external integrations
                    </p>
                  </div>
                  <Switch checked={settings.apiAccess} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Beta Features</Label>
                    <p className="text-sm text-muted-foreground">
                      Get early access to new features
                    </p>
                  </div>
                  <Switch checked={settings.betaFeatures} />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-4">Performance Metrics</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Response Time</p>
                    <p className="text-2xl font-bold">{metrics.responseTime}ms</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Uptime</p>
                    <p className="text-2xl font-bold">{metrics.uptime}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Error Rate</p>
                    <p className="text-2xl font-bold">{metrics.errorRate}%</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Reset Metrics</Button>
                <Button>Update Settings</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 