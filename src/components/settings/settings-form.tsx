'use client'

import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { updateSettings, type Settings } from '@/lib/settings'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { logError } from '@/lib/logger'

interface SettingsFormProps {
  settings: Settings
}

export function SettingsForm({ settings: initialSettings }: SettingsFormProps) {
  const [settings, setSettings] = useState<Settings>(initialSettings)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      await updateSettings({
        theme: settings.theme,
        default_story_style: settings.default_story_style,
        email_notifications: settings.email_notifications,
      })
      toast({
        title: 'Success',
        description: 'Settings updated successfully',
      })
    } catch (error) {
      logError(error instanceof Error ? error : new Error('Failed to update settings'), {
        context: 'SettingsForm:updateSettings',
        metadata: { settings: settings }
      })
      toast({
        title: 'Error',
        description: 'Failed to update settings',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Appearance</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium">Theme</label>
            <Select
              value={settings.theme}
              onValueChange={(value) => setSettings({ ...settings, theme: value as Settings['theme'] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Story Settings</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium">Default Story Style</label>
            <Select
              value={settings.default_story_style}
              onValueChange={(value) => setSettings({ ...settings, default_story_style: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="narrative">Narrative</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Email Notifications</label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications about your stories
              </p>
            </div>
            <Switch
              checked={settings.email_notifications}
              onCheckedChange={(checked) => setSettings({ ...settings, email_notifications: checked })}
            />
          </div>
        </div>

        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </Card>
    </form>
  )
} 