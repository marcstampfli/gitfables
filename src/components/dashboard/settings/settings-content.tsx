/**
 * @module components/dashboard/settings/settings-content
 * @description Client component for settings page content
 */

'use client'

import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSettings } from '@/hooks/use-settings'
import { Loader2 } from 'lucide-react'
import { 
  ResetSettingsDialog, 
  KeyboardShortcutsDialog,
  AppearanceTab,
  NotificationsTab,
  ProfileTab,
  AccountTab
} from '@/components/dashboard/settings'
import type { SettingsContentProps } from './types'

const TABS = [
  { id: 'profile', label: 'Profile', shortcut: '1' },
  { id: 'account', label: 'Account', shortcut: '2' },
  { id: 'appearance', label: 'Appearance', shortcut: '3' },
  { id: 'notifications', label: 'Notifications', shortcut: '4' }
] as const

type TabId = typeof TABS[number]['id']

export function SettingsContent({ initialSettings }: SettingsContentProps) {
  const { settings, resetSettings } = useSettings(initialSettings)
  const [activeTab, setActiveTab] = React.useState<TabId>('profile')
  const shortcutsButtonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        shortcutsButtonRef.current?.click()
      }

      if (e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1
        if (index < TABS.length) {
          setActiveTab(TABS[index].id)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!settings) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container py-6 md:py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <ResetSettingsDialog onReset={resetSettings} />
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabId)}>
        <TabsList className="grid w-full grid-cols-4">
          {TABS.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="relative">
              {tab.label}
              <kbd className="absolute top-0 right-1 text-xs text-muted-foreground">
                {tab.shortcut}
              </kbd>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="mt-6">
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
        </div>
      </Tabs>

      <KeyboardShortcutsDialog ref={shortcutsButtonRef} />
    </div>
  )
} 