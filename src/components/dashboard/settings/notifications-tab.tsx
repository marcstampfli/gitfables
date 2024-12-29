/**
 * @module components/dashboard/settings/notifications-tab
 * @description Tab component for managing notification settings
 */

'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSettings } from '@/hooks/use-settings'
import { Loader2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export function NotificationsTab() {
  const { settings, updateSettings } = useSettings()
  const [isSaving, setIsSaving] = useState(false)

  const handleUpdateNotifications = async (updates: {
    notifications?: {
      email?: boolean
      web?: boolean
      digest?: 'daily' | 'weekly' | 'never'
    }
  }) => {
    try {
      setIsSaving(true)
      await updateSettings({
        settings: {
          notifications: {
            ...settings.notifications,
            ...updates.notifications
          }
        }
      })
      toast({
        title: 'Notifications Updated',
        description: 'Your notification preferences have been updated successfully'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update notification settings. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
        <p className="text-muted-foreground">
          Manage how you receive notifications and updates
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications about activity via email
              </p>
            </div>
            <Switch
              checked={settings.notifications.email}
              onCheckedChange={(checked) =>
                handleUpdateNotifications({
                  notifications: { email: checked }
                })
              }
            />
          </div>

          {/* Web Notifications */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Web Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Show browser notifications when you&apos;re using the app
              </p>
            </div>
            <Switch
              checked={settings.notifications.web}
              onCheckedChange={(checked) =>
                handleUpdateNotifications({
                  notifications: { web: checked }
                })
              }
            />
          </div>

          {/* Digest Frequency */}
          <div className="space-y-4">
            <div>
              <Label>Activity Digest</Label>
              <p className="text-sm text-muted-foreground">
                How often you want to receive activity summaries
              </p>
            </div>

            <Select
              value={settings.notifications.digest}
              onValueChange={(value: 'daily' | 'weekly' | 'never') =>
                handleUpdateNotifications({
                  notifications: { digest: value }
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select digest frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isSaving && (
            <div className="flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
        </div>
      </Card>
    </div>
  )
} 