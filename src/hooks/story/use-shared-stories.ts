/**
 * @module hooks/use-shared-stories
 * @description Hook for managing shared stories
 */

'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { useActivity } from '@/hooks/use-activity'
import type { SharedStory, ShareStoryRequest } from '@/types/stories'
import { logError } from '@/lib/utils/logger'

export function useSharedStories() {
  const [sharedStories, setSharedStories] = useState<SharedStory[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { trackActivity } = useActivity()
  const supabase = createClient()

  // Load shared stories
  useEffect(() => {
    async function loadSharedStories() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
          .from('story_shares')
          .select(`
            *,
            story:stories(*)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error

        setSharedStories(data)
      } catch (error) {
        logError('Failed to load shared stories', { metadata: { error } })
        toast({
          title: 'Error',
          description: 'Failed to load shared stories',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    loadSharedStories()
  }, [supabase, toast])

  // Share story
  const shareStory = useCallback(async (request: ShareStoryRequest): Promise<SharedStory | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      // Generate share code
      const { data: shareCode, error: codeError } = await supabase
        .rpc('generate_share_code')

      if (codeError) throw codeError

      // Calculate expiration date
      const expiresAt = request.expires_in_days
        ? new Date(Date.now() + request.expires_in_days * 24 * 60 * 60 * 1000).toISOString()
        : null

      // Create shared story
      const { data, error } = await supabase
        .from('story_shares')
        .insert({
          user_id: user.id,
          story_id: request.story_id,
          share_type: request.share_type,
          share_code: shareCode,
          expires_at: expiresAt
        })
        .select(`
          *,
          story:stories(*)
        `)
        .single()

      if (error) throw error

      // Update local state
      const newSharedStory = data as SharedStory
      setSharedStories(prev => [newSharedStory, ...prev])

      // Track activity
      await trackActivity('story_shared', {
        title: newSharedStory.story?.title,
        share_type: request.share_type
      })

      toast({
        title: 'Story Shared',
        description: 'Your story has been shared successfully'
      })

      return newSharedStory
    } catch (error) {
      logError('Failed to share story', { metadata: { error } })
      toast({
        title: 'Error',
        description: 'Failed to share story',
        variant: 'destructive'
      })
      return null
    }
  }, [supabase, toast, trackActivity])

  // Delete shared story
  const deleteSharedStory = useCallback(async (id: string) => {
    try {
      const story = sharedStories.find(s => s.id === id)
      if (!story) return

      const { error } = await supabase
        .from('story_shares')
        .delete()
        .eq('id', id)

      if (error) throw error

      setSharedStories(prev => prev.filter(s => s.id !== id))

      toast({
        title: 'Share Deleted',
        description: 'The shared story has been deleted'
      })
    } catch (error) {
      logError('Failed to delete shared story', { metadata: { error } })
      toast({
        title: 'Error',
        description: 'Failed to delete shared story',
        variant: 'destructive'
      })
    }
  }, [supabase, toast, sharedStories])

  // Get shared story by code
  const getSharedStory = useCallback(async (
    shareCode: string
  ): Promise<SharedStory | null> => {
    try {
      // Get story
      const { data, error } = await supabase
        .from('story_shares')
        .select(`
          *,
          story:stories(*)
        `)
        .eq('share_code', shareCode)
        .single()

      if (error) throw error

      // Increment view count
      await supabase.rpc('increment_story_views', {
        p_share_code: shareCode
      })

      return data as SharedStory
    } catch (error) {
      logError('Failed to get shared story', { metadata: { error } })
      return null
    }
  }, [supabase])

  return {
    sharedStories,
    loading,
    shareStory,
    deleteSharedStory,
    getSharedStory
  }
} 