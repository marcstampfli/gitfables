/**
 * @module components/dashboard/settings/account-tab
 * @description Account settings tab
 */

'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Palette, Monitor, Moon, Sun, Keyboard, Lock, Shield } from 'lucide-react'
import { useSettings } from '@/hooks/use-settings'
import { toast } from '@/hooks/use-toast'
import type { ThemeMode } from '@/hooks/use-settings'

const THEMES: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: 'Light', icon: <Sun className="h-4 w-4" /> },
  { value: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4" /> },
  { value: 'system', label: 'System', icon: <Monitor className="h-4 w-4" /> }
]

const ACCENT_COLORS: { value: string; label: string }[] = [
  { value: 'default', label: 'Default Purple' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'orange', label: 'Orange' }
]

export function AccountTab() {
  const { settings, updateSettings, isLoading } = useSettings()
  const [theme, setTheme] = React.useState<ThemeMode>(settings.theme.mode)
  const [accentColor, setAccentColor] = React.useState(settings.theme.accent_color)
  const [keyboardShortcuts, setKeyboardShortcuts] = React.useState(settings.accessibility.keyboard_shortcuts)

  // Update local state when settings change
  React.useEffect(() => {
    setTheme(settings.theme.mode)
    setAccentColor(settings.theme.accent_color)
    setKeyboardShortcuts(settings.accessibility.keyboard_shortcuts)
  }, [settings])

  const handleThemeChange = async (newTheme: ThemeMode) => {
    try {
      setTheme(newTheme)
      const { error } = await updateSettings({
        theme: {
          ...settings.theme,
          mode: newTheme
        }
      })
      if (error) throw error
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update theme. Please try again.',
        variant: 'destructive'
      })
      setTheme(settings.theme.mode) // Reset on error
    }
  }

  const handleAccentColorChange = async (color: string) => {
    try {
      setAccentColor(color)
      const { error } = await updateSettings({
        theme: {
          ...settings.theme,
          accent_color: color
        }
      })
      if (error) throw error
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update accent color. Please try again.',
        variant: 'destructive'
      })
      setAccentColor(settings.theme.accent_color) // Reset on error
    }
  }

  const handleKeyboardShortcutsChange = async (enabled: boolean) => {
    try {
      setKeyboardShortcuts(enabled)
      const { error } = await updateSettings({
        accessibility: {
          ...settings.accessibility,
          keyboard_shortcuts: enabled
        }
      })
      if (error) throw error
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update keyboard shortcuts setting. Please try again.',
        variant: 'destructive'
      })
      setKeyboardShortcuts(settings.accessibility.keyboard_shortcuts) // Reset on error
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">Account</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account preferences and security settings
        </p>
      </div>

      {/* Appearance Settings */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Appearance</h4>
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
              <Label>Accent Color</Label>
              <Select value={accentColor} onValueChange={handleAccentColorChange} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select accent color" />
                </SelectTrigger>
                <SelectContent>
                  {ACCENT_COLORS.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Keyboard Shortcuts</Label>
                <p className="text-sm text-muted-foreground">
                  Enable keyboard shortcuts for faster navigation
                </p>
              </div>
              <Switch
                checked={keyboardShortcuts}
                onCheckedChange={handleKeyboardShortcutsChange}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Security</h4>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Password</Label>
                <p className="text-sm text-muted-foreground">
                  Change your account password
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Lock className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive p-6">
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-destructive">Danger Zone</h4>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data
            </p>
          </div>
          <div>
            <Button variant="destructive">
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
} 