/**
 * @module components/dashboard/settings/appearance-tab
 * @description Appearance settings tab with theme and accessibility options
 */

'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useSettings } from '@/hooks/use-settings'
import type { SettingsTabProps } from './types'

type ThemeMode = 'light' | 'dark' | 'system'
type FontSize = 'normal' | 'large' | 'larger'

const THEME_MODES: Array<{ value: ThemeMode; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor }
]

const FONT_SIZES: Array<{ value: FontSize; label: string }> = [
  { value: 'normal', label: 'Normal' },
  { value: 'large', label: 'Large' },
  { value: 'larger', label: 'Larger' }
]

export function AppearanceTab({ settings: initialSettings }: SettingsTabProps) {
  const { settings, updateSettings, isLoading } = useSettings(initialSettings)
  const [themeMode, setThemeMode] = React.useState<ThemeMode>('system')
  const [fontSize, setFontSize] = React.useState<FontSize>('normal')
  const [reduceMotion, setReduceMotion] = React.useState(false)
  const [highContrast, setHighContrast] = React.useState(false)

  // Initialize state from settings
  React.useEffect(() => {
    if (settings) {
      setThemeMode((settings.theme as ThemeMode) ?? 'system')
      setFontSize(settings.accessibility?.largeText ? 'large' : 'normal')
      setReduceMotion(settings.accessibility?.reduceMotion ?? false)
      setHighContrast(settings.accessibility?.highContrast ?? false)
    }
  }, [settings])

  const handleThemeChange = async (mode: ThemeMode) => {
    setThemeMode(mode)
    await updateSettings({
      theme: mode
    })
  }

  const handleFontSizeChange = async (size: FontSize) => {
    setFontSize(size)
    await updateSettings({
      accessibility: {
        largeText: size !== 'normal',
        reduceMotion,
        highContrast
      }
    })
  }

  const handleReduceMotionToggle = async (enabled: boolean) => {
    setReduceMotion(enabled)
    await updateSettings({
      accessibility: {
        largeText: fontSize !== 'normal',
        reduceMotion: enabled,
        highContrast
      }
    })
  }

  const handleHighContrastToggle = async (enabled: boolean) => {
    setHighContrast(enabled)
    await updateSettings({
      accessibility: {
        largeText: fontSize !== 'normal',
        reduceMotion,
        highContrast: enabled
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the application
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Monitor className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Theme</h4>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Mode</Label>
              <Select value={themeMode} onValueChange={handleThemeChange} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme mode" />
                </SelectTrigger>
                <SelectContent>
                  {THEME_MODES.map(({ value, label, icon: Icon }) => (
                    <SelectItem key={value} value={value}>
                      <div className="flex items-center">
                        <Icon className="mr-2 h-4 w-4" />
                        {label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Monitor className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Accessibility</h4>
          </div>
          <Separator />
          <div className="space-y-4">
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
                <Label>Reduce Motion</Label>
                <p className="text-sm text-muted-foreground">
                  Reduce motion in animations
                </p>
              </div>
              <Switch
                checked={reduceMotion}
                onCheckedChange={handleReduceMotionToggle}
                disabled={isLoading}
              />
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
          </div>
        </div>
      </Card>
    </div>
  )
} 