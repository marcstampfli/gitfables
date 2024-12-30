/**
 * @module components/dashboard/settings/settings-content
 * @description Client component for settings page content
 */

'use client'

import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileTab } from './profile-tab'
import { AccountTab } from './account-tab'
import { AppearanceTab } from './appearance-tab'
import { NotificationsTab } from './notifications-tab'
import { AdvancedTab } from './advanced-tab'
import { useSettings } from '@/hooks/use-settings'
import type { SettingsUpdate } from '@/types/settings'

interface SettingsContentProps {
  initialSettings: SettingsUpdate
}

export function SettingsContent({ initialSettings }: SettingsContentProps) {
  const { settings, resetSettings } = useSettings(initialSettings)

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <ProfileTab settings={settings} />
      </TabsContent>
      <TabsContent value="account">
        <AccountTab settings={settings} />
      </TabsContent>
      <TabsContent value="appearance">
        <AppearanceTab settings={settings} />
      </TabsContent>
      <TabsContent value="notifications">
        <NotificationsTab settings={settings} />
      </TabsContent>
      <TabsContent value="advanced">
        <AdvancedTab settings={settings} />
      </TabsContent>
    </Tabs>
  )
} 