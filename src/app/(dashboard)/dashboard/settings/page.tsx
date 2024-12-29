/**
 * @module app/(dashboard)/dashboard/settings/page
 * @description User settings page
 */

'use client'

import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSettings } from '@/hooks/use-settings'
import { Loader2 } from 'lucide-react'
import { 
  ApiKeysTab, 
  AdvancedTab, 
  ResetSettingsDialog, 
  KeyboardShortcutsDialog,
  AppearanceTab,
  NotificationsTab,
  ProfileTab
} from '@/components/dashboard/settings'

const TABS = [
  { id: 'profile', label: 'Profile', shortcut: '1' },
  { id: 'appearance', label: 'Appearance', shortcut: '2' },
  { id: 'notifications', label: 'Notifications', shortcut: '3' },
  { id: 'api-keys', label: 'API Keys', shortcut: '4' },
  { id: 'advanced', label: 'Advanced', shortcut: '5' }
] as const

type TabId = typeof TABS[number]['id']

export default function SettingsPage() {
  const { isLoading, resetSettings } = useSettings()
  const [activeTab, setActiveTab] = React.useState<TabId>('profile')
  const shortcutsButtonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Don't handle shortcuts when typing in input fields
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return
      }

      // Handle number keys for tab switching
      const num = parseInt(event.key)
      if (num >= 1 && num <= TABS.length) {
        setActiveTab(TABS[num - 1].id)
        return
      }

      // Handle ? key for shortcuts dialog
      if (event.key === '?' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault()
        shortcutsButtonRef.current?.click()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (isLoading) {
    return (
      <div className="container py-6 md:py-10 flex items-center justify-center">
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
        <TabsList className="grid w-full grid-cols-5">
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
            <ProfileTab />
          </TabsContent>
          <TabsContent value="appearance">
            <AppearanceTab />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>
          <TabsContent value="api-keys">
            <ApiKeysTab />
          </TabsContent>
          <TabsContent value="advanced">
            <AdvancedTab />
          </TabsContent>
        </div>
      </Tabs>

      <KeyboardShortcutsDialog ref={shortcutsButtonRef} />
    </div>
  )
} 