/**
 * @module components/dashboard/settings/profile-tab
 * @description Tab component for managing user profile settings
 */

'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSettings } from '@/hooks/use-settings'
import { createClient } from '@/lib/supabase/client'
import { toast } from '@/components/ui/use-toast'
import { Loader2, Camera, Github, Twitter, Linkedin, Globe, MapPin, Clock, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { logError } from '@/lib/utils/logger'

interface ProfileData {
  username: string
  full_name: string
  bio: string
  location: string
  website: string
  timezone: string
  avatar_url: string | null
  social_links: {
    github?: string
    twitter?: string
    linkedin?: string
  }
}

const TIMEZONES = [
  'UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00', 'UTC-07:00',
  'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:00', 'UTC-02:00', 'UTC-01:00',
  'UTC+00:00', 'UTC+01:00', 'UTC+02:00', 'UTC+03:00', 'UTC+04:00', 'UTC+05:00',
  'UTC+06:00', 'UTC+07:00', 'UTC+08:00', 'UTC+09:00', 'UTC+10:00', 'UTC+11:00',
  'UTC+12:00'
]

export function ProfileTab() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  const [isUploading, setIsUploading] = React.useState(false)
  const [errors, setErrors] = React.useState<Partial<Record<keyof ProfileData, string>>>({})
  const supabase = createClient()
  const [email, setEmail] = React.useState('')
  const [profile, setProfile] = React.useState<ProfileData>({
    username: '',
    full_name: '',
    bio: '',
    location: '',
    website: '',
    timezone: 'UTC+00:00',
    avatar_url: null,
    social_links: {}
  })

  // Load user profile data
  React.useEffect(() => {
    let isMounted = true
    async function loadProfile() {
      try {
        setIsLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return
        
        if (isMounted) setEmail(user.email || '')
        
        const { data, error } = await supabase
          .from('users')
          .select('username, full_name, bio, location, website, timezone, avatar_url, social_links')
          .eq('id', user.id)
          .single()
          
        if (error) throw error
        if (isMounted && data) {
          setProfile({
            username: data.username || '',
            full_name: data.full_name || '',
            bio: data.bio || '',
            location: data.location || '',
            website: data.website || '',
            timezone: data.timezone || 'UTC+00:00',
            avatar_url: data.avatar_url,
            social_links: data.social_links || {}
          })
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
        logError('Failed to load profile', error, {
          context: 'profile',
          metadata: {
            action: 'load',
            timestamp: new Date().toISOString()
          }
        })
        if (isMounted) {
          toast({
            title: 'Error',
            description: 'Failed to load profile data',
            variant: 'destructive'
          })
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    loadProfile()
    return () => { isMounted = false }
  }, [supabase])

  const validateProfile = () => {
    const newErrors: Partial<Record<keyof ProfileData, string>> = {}

    if (!profile.username) {
      newErrors.username = 'Username is required'
    } else if (!/^[a-zA-Z0-9_-]{3,20}$/.test(profile.username)) {
      newErrors.username = 'Username must be 3-20 characters and can only contain letters, numbers, underscores, and hyphens'
    }

    if (!profile.full_name) {
      newErrors.full_name = 'Full name is required'
    }

    if (profile.website && !/^https?:\/\/.+/.test(profile.website)) {
      newErrors.website = 'Website must be a valid URL starting with http:// or https://'
    }

    if (profile.social_links.github && !/^https:\/\/github\.com\/.+/.test(profile.social_links.github)) {
      newErrors['social_links'] = 'GitHub URL must be a valid GitHub profile URL'
    }

    if (profile.social_links.twitter && !/^https:\/\/twitter\.com\/.+/.test(profile.social_links.twitter)) {
      newErrors['social_links'] = 'Twitter URL must be a valid Twitter profile URL'
    }

    if (profile.social_links.linkedin && !/^https:\/\/linkedin\.com\/in\/.+/.test(profile.social_links.linkedin)) {
      newErrors['social_links'] = 'LinkedIn URL must be a valid LinkedIn profile URL'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleUpdateProfile = async () => {
    if (!validateProfile()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form',
        variant: 'destructive'
      })
      return
    }

    try {
      setIsSaving(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No authenticated user')

      // Update user profile
      const { error } = await supabase
        .from('users')
        .update({
          username: profile.username,
          full_name: profile.full_name,
          bio: profile.bio,
          location: profile.location,
          website: profile.website,
          timezone: profile.timezone,
          social_links: profile.social_links
        })
        .eq('id', user.id)

      if (error) throw error

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully'
      })
    } catch (error) {
      logError('Failed to update profile', error, {
        context: 'profile',
        metadata: {
          action: 'update',
          timestamp: new Date().toISOString()
        }
      })
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true)
      const file = event.target.files?.[0]
      if (!file) return

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No authenticated user')

      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file')
      }
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image size should be less than 5MB')
      }

      const fileExt = file.name.split('.').pop()
      const filePath = `${user.id}/avatar.${fileExt}`

      // Upload image
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id)

      if (updateError) throw updateError

      setProfile((prev: ProfileData) => ({ ...prev, avatar_url: publicUrl }))
      toast({
        title: 'Avatar Updated',
        description: 'Your profile picture has been updated successfully'
      })
    } catch (error) {
      logError('Failed to upload avatar', error, {
        context: 'profile',
        metadata: {
          action: 'upload_avatar',
          timestamp: new Date().toISOString()
        }
      })
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to upload avatar',
        variant: 'destructive'
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Manage your profile information and settings
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }}>
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profile.username}
                  onChange={(e) => setProfile((prev: ProfileData) => ({ ...prev, username: e.target.value }))}
                  className="mt-1"
                />
                {errors.username && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.username}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={profile.full_name}
                  onChange={(e) => setProfile((prev: ProfileData) => ({ ...prev, full_name: e.target.value }))}
                  className="mt-1"
                />
                {errors.full_name && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.full_name}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile((prev: ProfileData) => ({ ...prev, bio: e.target.value }))}
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <div className="flex mt-1">
                  <MapPin className="mr-2 h-4 w-4 opacity-70" />
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile((prev: ProfileData) => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <div className="flex mt-1">
                  <Globe className="mr-2 h-4 w-4 opacity-70" />
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => setProfile((prev: ProfileData) => ({ ...prev, website: e.target.value }))}
                  />
                </div>
                {errors.website && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.website}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <div className="flex mt-1">
                  <Clock className="mr-2 h-4 w-4 opacity-70" />
                  <Select
                    value={profile.timezone}
                    onValueChange={(value) => setProfile((prev: ProfileData) => ({ ...prev, timezone: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMEZONES.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Social Links</Label>
                <div className="space-y-4 mt-1">
                  <div className="flex">
                    <Github className="mr-2 h-4 w-4 opacity-70" />
                    <Input
                      placeholder="GitHub Profile URL"
                      value={profile.social_links.github || ''}
                      onChange={(e) => setProfile((prev: ProfileData) => ({
                        ...prev,
                        social_links: { ...prev.social_links, github: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="flex">
                    <Twitter className="mr-2 h-4 w-4 opacity-70" />
                    <Input
                      placeholder="Twitter Profile URL"
                      value={profile.social_links.twitter || ''}
                      onChange={(e) => setProfile((prev: ProfileData) => ({
                        ...prev,
                        social_links: { ...prev.social_links, twitter: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="flex">
                    <Linkedin className="mr-2 h-4 w-4 opacity-70" />
                    <Input
                      placeholder="LinkedIn Profile URL"
                      value={profile.social_links.linkedin || ''}
                      onChange={(e) => setProfile((prev: ProfileData) => ({
                        ...prev,
                        social_links: { ...prev.social_links, linkedin: e.target.value }
                      }))}
                    />
                  </div>
                  {errors.social_links && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.social_links}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <div>
                <Label>Profile Picture</Label>
                <div className="mt-1 flex items-center space-x-4">
                  {profile.avatar_url && (
                    <img
                      src={profile.avatar_url}
                      alt="Profile"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  )}
                  <Label
                    htmlFor="avatar"
                    className="flex cursor-pointer items-center space-x-2 rounded-md border px-3 py-2 hover:bg-accent"
                  >
                    <Camera className="h-4 w-4" />
                    <span>Change</span>
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                      disabled={isUploading}
                    />
                  </Label>
                  {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isSaving}>
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </form>
      )}
    </div>
  )
} 