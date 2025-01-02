/**
 * @module components/dashboard/settings/notifications-tab
 * @description Notifications settings tab
 */

'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Bell, Mail } from 'lucide-react'
import { useSettings } from '@/hooks/use-settings'
import { toast } from '@/components/ui/use-toast'
import type { NotificationDigest } from '@/hooks/use-settings'

const DIGEST_FREQUENCIES: { value: NotificationDigest; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'never', label: 'Never' }
]

export function NotificationsTab() {
  const { settings, updateSettings, isLoading } = useSettings()
  const [emailEnabled, setEmailEnabled] = React.useState(settings.notifications.email)
  const [webEnabled, setWebEnabled] = React.useState(settings.notifications.web)
  const [digestFrequency, setDigestFrequency] = React.useState<NotificationDigest>(settings.notifications.digest)

  // Update local state when settings change
  React.useEffect(() => {
    setEmailEnabled(settings.notifications.email)
    setWebEnabled(settings.notifications.web)
    setDigestFrequency(settings.notifications.digest)
  }, [settings])

  const handleEmailChange = async (enabled: boolean) => {
    try {
      setEmailEnabled(enabled)
      const { error } = await updateSettings({
        notifications: {
          ...settings.notifications,
          email: enabled
        }
      })
      if (error) throw error
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update email notifications. Please try again.',
        variant: 'destructive'
      })
      setEmailEnabled(settings.notifications.email) // Reset on error
    }
  }

  const handleWebChange = async (enabled: boolean) => {
    try {
      setWebEnabled(enabled)
      const { error } = await updateSettings({
        notifications: {
          ...settings.notifications,
          web: enabled
        }
      })
      if (error) throw error
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update web notifications. Please try again.',
        variant: 'destructive'
      })
      setWebEnabled(settings.notifications.web) // Reset on error
    }
  }

  const handleDigestFrequencyChange = async (frequency: NotificationDigest) => {
    try {
      setDigestFrequency(frequency)
      const { error } = await updateSettings({
        notifications: {
          ...settings.notifications,
          digest: frequency
        }
      })
      if (error) throw error
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update digest frequency. Please try again.',
        variant: 'destructive'
      })
      setDigestFrequency(settings.notifications.digest) // Reset on error
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">Notification Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications and updates
        </p>
      </div>

      {/* Email Notifications */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Email Notifications</h4>
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
                onCheckedChange={handleEmailChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label>Digest Frequency</Label>
              <Select
                value={digestFrequency}
                onValueChange={handleDigestFrequencyChange}
                disabled={isLoading || !emailEnabled}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {DIGEST_FREQUENCIES.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                How often to receive email digests
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Web Notifications */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Web Notifications</h4>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Browser Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications in your browser
                </p>
              </div>
              <Switch
                checked={webEnabled}
                onCheckedChange={handleWebChange}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 