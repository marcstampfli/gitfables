/**
 * @module hooks/use-stories
 * @description Hook for managing stories
 */

'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import { useActivity } from '@/hooks/use-activity'
import { useSharedStories } from '@/hooks/story/use-shared-stories'
import type { Story, CreateStoryRequest, UpdateStoryRequest, ShareStoryRequest } from '@/types/stories'
import { logError } from '@/lib/utils/logger'

export function useStories() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { trackActivity } = useActivity()
  const { shareStory } = useSharedStories()
  const supabase = createClient()

  // Load stories
  useEffect(() => {
    async function loadStories() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
          .from('stories')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error

        setStories(data)
      } catch (error) {
        logError('Failed to load stories', { metadata: { error } })
        toast({
          title: 'Error',
          description: 'Failed to load stories',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    loadStories()
  }, [supabase, toast])

  // Create story
  const createStory = useCallback(async (request: CreateStoryRequest): Promise<Story | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const { data, error } = await supabase
        .from('stories')
        .insert({
          user_id: user.id,
          ...request
        })
        .select()
        .single()

      if (error) throw error

      const newStory = data as Story
      setStories(prev => [newStory, ...prev])

      // Track activity
      await trackActivity('story_created', {
        title: request.title
      })

      toast({
        title: 'Story Created',
        description: 'Your story has been created successfully'
      })

      return newStory
    } catch (error) {
      logError('Failed to create story', { metadata: { error } })
      toast({
        title: 'Error',
        description: 'Failed to create story',
        variant: 'destructive'
      })
      return null
    }
  }, [supabase, toast, trackActivity])

  // Update story
  const updateStory = useCallback(async (
    id: string,
    request: UpdateStoryRequest
  ): Promise<Story | null> => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .update(request)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      const updatedStory = data as Story
      setStories(prev => prev.map(story => 
        story.id === id ? updatedStory : story
      ))

      // Track activity
      await trackActivity('story_updated', {
        title: updatedStory.title
      })

      toast({
        title: 'Story Updated',
        description: 'Your story has been updated successfully'
      })

      return updatedStory
    } catch (error) {
      logError('Failed to update story', { metadata: { error } })
      toast({
        title: 'Error',
        description: 'Failed to update story',
        variant: 'destructive'
      })
      return null
    }
  }, [supabase, toast, trackActivity])

  // Delete story
  const deleteStory = useCallback(async (id: string) => {
    try {
      const story = stories.find(s => s.id === id)
      if (!story) return

      const { error } = await supabase
        .from('stories')
        .delete()
        .eq('id', id)

      if (error) throw error

      setStories(prev => prev.filter(story => story.id !== id))

      toast({
        title: 'Story Deleted',
        description: 'Your story has been deleted successfully'
      })
    } catch (error) {
      logError('Failed to delete story', { metadata: { error } })
      toast({
        title: 'Error',
        description: 'Failed to delete story',
        variant: 'destructive'
      })
    }
  }, [supabase, toast, stories])

  // Share story
  const share = useCallback(async (request: ShareStoryRequest) => {
    const story = stories.find(s => s.id === request.story_id)
    if (!story) return null

    const result = await shareStory(request)
    if (result) {
      toast({
        title: 'Story Shared',
        description: `Share code: ${result.share_code}`
      })
    }

    return result
  }, [stories, shareStory, toast])

  return {
    stories,
    loading,
    createStory,
    updateStory,
    deleteStory,
    share
  }
} 