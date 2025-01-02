/**
 * @module api/story/export
 * @description API route for exporting stories to Markdown format
 */

import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/actions/auth'
import { logError } from '@/lib/utils/logger'

export async function GET(request: Request) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = await createServerClient()

    const { searchParams } = new URL(request.url)
    const storyId = searchParams.get('id')

    if (!storyId) {
      return NextResponse.json({ error: 'Story ID is required' }, { status: 400 })
    }

    const { data: story, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', storyId)
      .eq('user_id', user.id)
      .single()

    if (error || !story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 })
    }

    const content = {
      title: story.title,
      content: story.content,
      metadata: story.metadata,
      exportedAt: new Date().toISOString()
    }

    return NextResponse.json(content)
  } catch (error) {
    logError('Error exporting story:', error, {
      context: 'story-export',
      metadata: {
        timestamp: new Date().toISOString()
      }
    })
    return NextResponse.json(
      { error: 'Failed to export story' },
      { status: 500 }
    )
  }
} 