/**
 * @module lib/story/story-service
 * @description Story service for database operations
 */

import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'
import { Story } from '@/types/story'

/**
 * Get a story by its ID
 * 
 * @param supabase - Supabase client instance
 * @param id - Story ID
 * @returns The story if found, null otherwise
 */
export async function getStory(
  supabase: SupabaseClient<Database>,
  id: string
): Promise<Story | null> {
  const { data: story, error } = await supabase
    .from('stories')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !story) {
    return null
  }

  return story as Story
} 