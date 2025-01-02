/**
 * @module components/dashboard/settings/settings-content
 * @description Client component for settings page content
 */

'use client'

import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileTab } from './profile-tab'
import { AccountTab } from './account-tab'
import { RepositoryTab } from './repository-tab'
import { StoryTab } from './story-tab'
import { NotificationsTab } from './notifications-tab'
import { useSettings } from '@/hooks/use-settings'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export function SettingsContent() {
  const { settings, isLoading } = useSettings()

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-8">
        <Card className="p-6">
          <div className="flex items-center justify-center space-x-4">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p>Loading settings...</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="repositories">Repositories</TabsTrigger>
          <TabsTrigger value="stories">Stories</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-6">
          <ProfileTab />
        </TabsContent>
        <TabsContent value="account" className="space-y-6">
          <AccountTab />
        </TabsContent>
        <TabsContent value="repositories" className="space-y-6">
          <RepositoryTab />
        </TabsContent>
        <TabsContent value="stories" className="space-y-6">
          <StoryTab />
        </TabsContent>
        <TabsContent value="notifications" className="space-y-6">
          <NotificationsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
} 