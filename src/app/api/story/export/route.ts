/**
 * @module api/story/export
 * @description API route for exporting stories to Markdown format
 */

import { type StoryEvent } from '@/types/stories'
import { getStory } from '@/lib/story/story-service'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const story = await getStory(supabase, params.id)
  if (!story) {
    return new Response('Story not found', { status: 404 })
  }

  const markdown = `# ${story.title}

${story.description || 'A story generated from Git commits'}

## Repository Details
- Name: ${story.repository?.name ?? 'Unknown'}
- Description: ${story.repository?.description ?? 'No description'}
- URL: ${story.repository?.html_url ?? 'Not available'}

## Story Details
- Generated: ${story.metadata?.generatedAt ?? new Date().toISOString()}
- Style: ${story.metadata?.style ?? 'standard'}

## Content

${story.content}

## Events

${story.events?.map((event: StoryEvent) => `### ${event.timestamp}
${event.data?.message ?? 'No message'}`).join('\n\n') ?? 'No events recorded'}
`

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown',
      'Content-Disposition': `attachment; filename="${story.title.toLowerCase().replace(/\s+/g, '-')}.md"`
    }
  })
} 