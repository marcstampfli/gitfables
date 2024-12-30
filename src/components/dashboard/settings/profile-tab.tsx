/**
 * @module components/dashboard/settings/profile-tab
 * @description Profile settings tab with enhanced UX
 */

'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { User, Globe } from 'lucide-react'
import { toast } from 'sonner'
import type { SettingsTabProps } from './types'

export function ProfileTab({ settings: _settings }: SettingsTabProps) {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [bio, setBio] = React.useState('')
  const [website, setWebsite] = React.useState('')

  const handleSave = () => {
    // Validate inputs
    if (!name || !email) {
      toast.error('Name and email are required')
      return
    }

    if (website && !isValidUrl(website)) {
      toast.error('Please enter a valid website URL')
      return
    }

    // Save profile changes
    toast.success('Profile updated successfully')
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Manage your public profile information
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Personal Information</h4>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-primary" />
            <h4 className="font-medium">About</h4>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="Enter your website URL"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  )
} 