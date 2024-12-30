/**
 * @module components/dashboard/settings/account-tab
 * @description Account settings tab with security and privacy settings
 */

'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Shield } from 'lucide-react'
import { useSettings } from '@/hooks/use-settings'
import type { SettingsTabProps } from './types'

export function AccountTab({ settings: initialSettings }: SettingsTabProps) {
  const { settings, updateSettings, isLoading } = useSettings(initialSettings)
  const [shareAnalytics, setShareAnalytics] = React.useState(settings?.privacy?.shareAnalytics ?? false)
  const [shareUsage, setShareUsage] = React.useState(settings?.privacy?.shareUsage ?? false)

  const handleAnalyticsToggle = async (enabled: boolean) => {
    setShareAnalytics(enabled)
    await updateSettings({
      privacy: {
        ...settings?.privacy,
        shareAnalytics: enabled
      }
    })
  }

  const handleUsageToggle = async (enabled: boolean) => {
    setShareUsage(enabled)
    await updateSettings({
      privacy: {
        ...settings?.privacy,
        shareUsage: enabled
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">Account</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Privacy Settings</h4>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Share Analytics</Label>
                <p className="text-sm text-muted-foreground">
                  Allow us to collect anonymous usage data to improve our services
                </p>
              </div>
              <Switch
                checked={shareAnalytics}
                onCheckedChange={handleAnalyticsToggle}
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Share Usage Data</Label>
                <p className="text-sm text-muted-foreground">
                  Share your usage patterns to help us improve the user experience
                </p>
              </div>
              <Switch
                checked={shareUsage}
                onCheckedChange={handleUsageToggle}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 