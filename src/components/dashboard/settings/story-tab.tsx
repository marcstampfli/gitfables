/**
 * @module components/dashboard/settings/story-tab
 * @description Story settings tab
 */

'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Eye, BookOpen } from 'lucide-react'
import { useSettings } from '@/hooks/use-settings'
import { toast } from '@/components/ui/use-toast'
import type { Visibility } from '@/hooks/use-settings'

export function StoryTab() {
  const { settings, updateSettings, isLoading } = useSettings()
  const [showActivity, setShowActivity] = React.useState(settings.privacy.show_activity)
  const [defaultVisibility, setDefaultVisibility] = React.useState<Visibility>(settings.privacy.default_story_visibility)

  // Update local state when settings change
  React.useEffect(() => {
    setShowActivity(settings.privacy.show_activity)
    setDefaultVisibility(settings.privacy.default_story_visibility)
  }, [settings])

  const handleShowActivityChange = async (enabled: boolean) => {
    try {
      setShowActivity(enabled)
      const { error } = await updateSettings({
        privacy: {
          ...settings.privacy,
          show_activity: enabled
        }
      })
      if (error) throw error
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update activity visibility. Please try again.',
        variant: 'destructive'
      })
      setShowActivity(settings.privacy.show_activity) // Reset on error
    }
  }

  const handleDefaultVisibilityChange = async (visibility: Visibility) => {
    try {
      setDefaultVisibility(visibility)
      const { error } = await updateSettings({
        privacy: {
          ...settings.privacy,
          default_story_visibility: visibility
        }
      })
      if (error) throw error
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update default visibility. Please try again.',
        variant: 'destructive'
      })
      setDefaultVisibility(settings.privacy.default_story_visibility) // Reset on error
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">Story Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure your story preferences and privacy settings
        </p>
      </div>

      {/* Privacy Settings */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Privacy</h4>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Activity</Label>
                <p className="text-sm text-muted-foreground">
                  Show your story activity in your public profile
                </p>
              </div>
              <Switch
                checked={showActivity}
                onCheckedChange={handleShowActivityChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label>Default Visibility</Label>
              <Select
                value={defaultVisibility}
                onValueChange={handleDefaultVisibilityChange}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Public
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Private
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                The default visibility for new stories
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 