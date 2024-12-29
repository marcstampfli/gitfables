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
import { 
  Bell,
  MessageSquare,
  Heart,
  AtSign,
  Mail
} from 'lucide-react'
import type { SettingsTabProps } from './types'
import { useSettings } from '@/hooks/use-settings'
import { toast } from '@/hooks/use-toast'

type EmailFrequency = 'daily' | 'weekly' | 'never'

const EMAIL_FREQUENCIES: Array<{ value: EmailFrequency; label: string }> = [
  { value: 'daily', label: 'Daily digest' },
  { value: 'weekly', label: 'Weekly digest' },
  { value: 'never', label: 'Never' }
]

export function NotificationsTab({ settings: initialSettings }: SettingsTabProps) {
  const { settings, updateSettings, isLoading } = useSettings(initialSettings)
  const [emailEnabled, setEmailEnabled] = React.useState(settings.notifications.email)
  const [emailFrequency, setEmailFrequency] = React.useState<EmailFrequency>(settings.notifications.digest)
  const [notifications, setNotifications] = React.useState({
    comments: true,
    likes: true,
    mentions: true
  })

  const handleEmailToggle = async (checked: boolean) => {
    try {
      await updateSettings({
        settings: {
          notifications: {
            ...settings.notifications,
            email: checked
          }
        }
      })
      setEmailEnabled(checked)
      toast({
        title: 'Email Notifications Updated',
        description: `Email notifications have been ${checked ? 'enabled' : 'disabled'}`
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update email preferences. Please try again.',
        variant: 'destructive'
      })
    }
  }

  const handleFrequencyChange = async (value: EmailFrequency) => {
    try {
      await updateSettings({
        settings: {
          notifications: {
            ...settings.notifications,
            digest: value
          }
        }
      })
      setEmailFrequency(value)
      toast({
        title: 'Email Frequency Updated',
        description: 'Your email notification frequency has been updated'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update email frequency. Please try again.',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Choose how you want to be notified about activity
        </p>
      </div>

      <div className="grid gap-6">
        {/* Email Preferences */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Email Preferences</h4>
              </div>
              <Switch
                checked={emailEnabled}
                onCheckedChange={handleEmailToggle}
                disabled={isLoading}
              />
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email Frequency</Label>
                <Select 
                  value={emailFrequency}
                  onValueChange={handleFrequencyChange}
                  disabled={!emailEnabled || isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMAIL_FREQUENCIES.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose how often you want to receive email notifications
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Activity Notifications */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Activity Notifications</h4>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      When someone comments on your stories
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.comments}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, comments: checked }))
                  }
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Likes</Label>
                    <p className="text-sm text-muted-foreground">
                      When someone likes your stories
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.likes}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, likes: checked }))
                  }
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <AtSign className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Mentions</Label>
                    <p className="text-sm text-muted-foreground">
                      When someone mentions you
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.mentions}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, mentions: checked }))
                  }
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 