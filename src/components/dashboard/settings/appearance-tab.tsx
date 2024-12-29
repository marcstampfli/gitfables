/**
 * @module components/dashboard/settings/appearance-tab
 * @description Tab component for managing appearance settings
 */

'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useSettings } from '@/hooks/use-settings'
import { useTheme } from '@/hooks/use-theme'
import { logError } from '@/lib/utils/logger'
import { toast } from '@/components/ui/use-toast'
import type { UserSettings } from '@/types/database'

export function AppearanceTab() {
  const { settings, updateSettings } = useSettings()
  const { theme, setTheme } = useTheme()

  // Handle theme change
  const handleThemeChange = async (value: UserSettings['theme']['mode']) => {
    try {
      setTheme(value)
      await updateSettings({ settings: { theme: { ...settings.theme, mode: value } } })
    } catch (error) {
      logError('Failed to update theme', error, {
        context: 'appearance',
        metadata: {
          action: 'update_theme',
          theme: value
        }
      })
      toast({
        title: 'Error',
        description: 'Failed to update theme. Please try again.',
        variant: 'destructive'
      })
    }
  }

  // Handle animation toggle
  const handleAnimationsToggle = async (enabled: boolean) => {
    try {
      await updateSettings({ 
        settings: { 
          accessibility: { 
            ...settings.accessibility, 
            reduce_animations: !enabled 
          } 
        } 
      })
    } catch (error) {
      logError('Failed to update animations setting', error, {
        context: 'appearance',
        metadata: {
          action: 'toggle_animations',
          enabled
        }
      })
      toast({
        title: 'Error',
        description: 'Failed to update animations setting. Please try again.',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the application
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select
              value={settings.theme.mode}
              onValueChange={handleThemeChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Select your preferred theme for the application
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Animations</Label>
              <p className="text-sm text-muted-foreground">
                Enable or disable interface animations
              </p>
            </div>
            <Switch
              checked={!settings.accessibility.reduce_animations}
              onCheckedChange={handleAnimationsToggle}
            />
          </div>
        </div>
      </Card>
    </div>
  )
} 