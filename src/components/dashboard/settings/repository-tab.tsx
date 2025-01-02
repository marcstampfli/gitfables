/**
 * @module components/dashboard/settings/repository-tab
 * @description Repository settings tab
 */

'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GitBranch, GitFork, RefreshCw } from 'lucide-react'
import { useSettings } from '@/hooks/use-settings'
import { toast } from '@/components/ui/use-toast'
import type { SyncFrequency } from '@/hooks/use-settings'

const SYNC_FREQUENCIES: { value: SyncFrequency; label: string }[] = [
  { value: 'hourly', label: 'Every Hour' },
  { value: 'daily', label: 'Once a Day' },
  { value: 'weekly', label: 'Once a Week' }
]

export function RepositoryTab() {
  const { settings, updateSettings, isLoading } = useSettings()
  const [autoSync, setAutoSync] = React.useState(settings.repository.auto_sync)
  const [syncFrequency, setSyncFrequency] = React.useState<SyncFrequency>(settings.repository.sync_frequency)
  const [defaultBranch, setDefaultBranch] = React.useState(settings.repository.default_branch)

  // Update local state when settings change
  React.useEffect(() => {
    setAutoSync(settings.repository.auto_sync)
    setSyncFrequency(settings.repository.sync_frequency)
    setDefaultBranch(settings.repository.default_branch)
  }, [settings])

  const handleAutoSyncChange = async (enabled: boolean) => {
    try {
      setAutoSync(enabled)
      const { error } = await updateSettings({
        repository: {
          ...settings.repository,
          auto_sync: enabled
        }
      })
      if (error) throw error
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update auto sync setting. Please try again.',
        variant: 'destructive'
      })
      setAutoSync(settings.repository.auto_sync) // Reset on error
    }
  }

  const handleSyncFrequencyChange = async (frequency: SyncFrequency) => {
    try {
      setSyncFrequency(frequency)
      const { error } = await updateSettings({
        repository: {
          ...settings.repository,
          sync_frequency: frequency
        }
      })
      if (error) throw error
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update sync frequency. Please try again.',
        variant: 'destructive'
      })
      setSyncFrequency(settings.repository.sync_frequency) // Reset on error
    }
  }

  const handleDefaultBranchChange = async (branch: string) => {
    try {
      setDefaultBranch(branch)
      const { error } = await updateSettings({
        repository: {
          ...settings.repository,
          default_branch: branch
        }
      })
      if (error) throw error
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update default branch. Please try again.',
        variant: 'destructive'
      })
      setDefaultBranch(settings.repository.default_branch) // Reset on error
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">Repository Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure how your repositories are synchronized and managed
        </p>
      </div>

      {/* Sync Settings */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Synchronization</h4>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Sync</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically sync your repositories on a schedule
                </p>
              </div>
              <Switch
                checked={autoSync}
                onCheckedChange={handleAutoSyncChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label>Sync Frequency</Label>
              <Select
                value={syncFrequency}
                onValueChange={handleSyncFrequencyChange}
                disabled={isLoading || !autoSync}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {SYNC_FREQUENCIES.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Branch Settings */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <GitBranch className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Branch Settings</h4>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Default Branch</Label>
              <Select
                value={defaultBranch}
                onValueChange={handleDefaultBranchChange}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">main</SelectItem>
                  <SelectItem value="master">master</SelectItem>
                  <SelectItem value="develop">develop</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                The default branch for new repositories
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 