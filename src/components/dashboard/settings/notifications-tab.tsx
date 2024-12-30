/**
 * @module components/dashboard/settings/notifications-tab
 * @description Notifications settings tab with email and activity preferences
 */

'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Bell } from 'lucide-react'
import { useSettings } from '@/hooks/use-settings'
import type { SettingsTabProps, EmailFrequency } from './types'

export function NotificationsTab({ settings: initialSettings }: SettingsTabProps) {
  const { settings, updateSettings, isLoading } = useSettings(initialSettings)
  const [emailEnabled, setEmailEnabled] = React.useState(settings?.notifications?.email ?? false)
  const [pushEnabled, setPushEnabled] = React.useState(settings?.notifications?.push ?? false)
  const [inAppEnabled, setInAppEnabled] = React.useState(settings?.notifications?.inApp ?? false)

  const handleEmailToggle = async (enabled: boolean) => {
    setEmailEnabled(enabled)
    await updateSettings({
      notifications: {
        ...settings?.notifications,
        email: enabled
      }
    })
  }

  const handlePushToggle = async (enabled: boolean) => {
    setPushEnabled(enabled)
    await updateSettings({
      notifications: {
        ...settings?.notifications,
        push: enabled
      }
    })
  }

  const handleInAppToggle = async (enabled: boolean) => {
    setInAppEnabled(enabled)
    await updateSettings({
      notifications: {
        ...settings?.notifications,
        inApp: enabled
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you want to be notified about updates and activity
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Notification Preferences</h4>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                checked={emailEnabled}
                onCheckedChange={handleEmailToggle}
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications on your devices
                </p>
              </div>
              <Switch
                checked={pushEnabled}
                onCheckedChange={handlePushToggle}
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>In-App Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Show notifications within the application
                </p>
              </div>
              <Switch
                checked={inAppEnabled}
                onCheckedChange={handleInAppToggle}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 