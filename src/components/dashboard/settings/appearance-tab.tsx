/**
 * @module components/dashboard/settings/appearance-tab
 * @description Appearance settings tab
 */

'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Moon, Monitor, Sun } from 'lucide-react'
import { useSettings } from '@/hooks/use-settings'
import type { SettingsTabProps } from './types'
import type { Theme, FontSize } from '@/types/settings'

const THEMES: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: 'Light', icon: <Sun className="h-4 w-4" /> },
  { value: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4" /> },
  { value: 'system', label: 'System', icon: <Monitor className="h-4 w-4" /> }
]

const FONT_SIZES: { value: FontSize; label: string }[] = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' }
]

export function AppearanceTab({ settings: initialSettings }: SettingsTabProps) {
  const { settings, updateSettings, isLoading } = useSettings(initialSettings)
  const [theme, setTheme] = React.useState<Theme>(settings?.theme ?? 'system')
  const [fontSize, setFontSize] = React.useState<FontSize>(settings?.accessibility?.font_size ?? 'medium')
  const [reduceMotion, setReduceMotion] = React.useState(settings?.accessibility?.reduce_animations ?? false)
  const [highContrast, setHighContrast] = React.useState(settings?.accessibility?.high_contrast ?? false)

  const handleThemeChange = async (value: Theme) => {
    setTheme(value)
    await updateSettings({ theme: value })
  }

  const handleFontSizeChange = async (value: FontSize) => {
    setFontSize(value)
    await updateSettings({
      accessibility: {
        ...settings?.accessibility,
        font_size: value
      }
    })
  }

  const handleReduceMotionToggle = async (enabled: boolean) => {
    setReduceMotion(enabled)
    await updateSettings({
      accessibility: {
        ...settings?.accessibility,
        reduce_animations: enabled
      }
    })
  }

  const handleHighContrastToggle = async (enabled: boolean) => {
    setHighContrast(enabled)
    await updateSettings({
      accessibility: {
        ...settings?.accessibility,
        high_contrast: enabled
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize how GitFables looks and feels
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Monitor className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Theme & Display</h4>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={handleThemeChange} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  {THEMES.map(({ value, label, icon }) => (
                    <SelectItem key={value} value={value}>
                      <div className="flex items-center gap-2">
                        {icon}
                        {label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Font Size</Label>
              <Select value={fontSize} onValueChange={handleFontSizeChange} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  {FONT_SIZES.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>High Contrast</Label>
                <p className="text-sm text-muted-foreground">
                  Increase contrast for better visibility
                </p>
              </div>
              <Switch
                checked={highContrast}
                onCheckedChange={handleHighContrastToggle}
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Reduce Motion</Label>
                <p className="text-sm text-muted-foreground">
                  Minimize animations and transitions
                </p>
              </div>
              <Switch
                checked={reduceMotion}
                onCheckedChange={handleReduceMotionToggle}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 