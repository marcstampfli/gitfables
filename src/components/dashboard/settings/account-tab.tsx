/**
 * @module components/dashboard/settings/account-tab
 * @description Account settings tab with security and privacy settings
 */

'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Shield,
  Key,
  Download,
  Trash2,
  AlertTriangle,
  Mail,
  Globe,
  Eye
} from 'lucide-react'
import type { SettingsTabProps } from './types'
import { useSettings } from '@/hooks/use-settings'
import { toast } from '@/hooks/use-toast'

type PrivacyLevel = 'public' | 'followers' | 'private'
type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ja' | 'ko' | 'zh'

const LANGUAGES: Array<{ value: Language; label: string }> = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'it', label: 'Italiano' },
  { value: 'pt', label: 'Português' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'zh', label: '中文' }
]

export function AccountTab({ settings: initialSettings }: SettingsTabProps) {
  const { settings, updateSettings, isLoading } = useSettings(initialSettings)
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false)
  const [emailVerified, _setEmailVerified] = React.useState(false)
  const [defaultPrivacy, setDefaultPrivacy] = React.useState<PrivacyLevel>('public')

  // Add language state from settings
  const [language, setLanguage] = React.useState<Language>(settings.theme?.language || 'en')

  // Update the handleLanguageChange function
  const handleLanguageChange = async (newLanguage: Language) => {
    try {
      await updateSettings({
        settings: {
          theme: {
            ...settings.theme,
            language: newLanguage
          }
        }
      })
      setLanguage(newLanguage)
      toast({
        title: 'Language Updated',
        description: 'Your language preference has been updated successfully'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update language preference. Please try again.',
        variant: 'destructive'
      })
    }
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password change
  }

  const handleAccountDeletion = () => {
    // Handle account deletion
  }

  const handleDataExport = () => {
    // Handle data export
  }

  const handleVerifyEmail = () => {
    // Handle email verification
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">Account</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and privacy preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Email Verification */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Email Settings</h4>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Email Verification</Label>
                  <p className="text-sm text-muted-foreground">
                    {emailVerified ? 'Your email is verified' : 'Please verify your email address'}
                  </p>
                </div>
                {!emailVerified && (
                  <Button onClick={handleVerifyEmail} size="sm">
                    Verify Email
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Privacy Settings</h4>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Default Story Privacy</Label>
                <Select 
                  value={defaultPrivacy}
                  onValueChange={(value: PrivacyLevel) => setDefaultPrivacy(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose default privacy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="followers">Followers Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  This will be the default privacy setting for new stories
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Allow Comments</Label>
                  <p className="text-sm text-muted-foreground">
                    Let others comment on your public stories
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Security Settings</h4>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Key className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </form>
            </div>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Data Management</h4>
            </div>
            <Separator />
            <div className="space-y-4">
              <Button variant="outline" onClick={handleDataExport} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Export Stories & Data
              </Button>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h4 className="font-medium text-destructive">Danger Zone</h4>
            </div>
            <Separator className="bg-destructive/20" />
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-destructive">Delete Account</Label>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all stories
                </p>
              </div>
              <Button 
                variant="destructive"
                onClick={handleAccountDeletion}
                className="w-full"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </div>
          </div>
        </Card>

        {/* Language Settings */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Language Settings</h4>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Interface Language</Label>
                <Select 
                  value={language}
                  onValueChange={handleLanguageChange}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred interface language
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 