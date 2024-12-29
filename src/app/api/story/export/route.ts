/**
 * @module api/story/export
 * @description API route for exporting stories to Markdown format
 */

import { type Story } from '@/types/story'

export async function POST(request: Request) {
  try {
    const story = await request.json() as Story

    const markdown = `# ${story.title}

${story.description}

## Repository Information
- Name: ${story.repository.name}
- Description: ${story.repository.description || 'No description'}
- URL: ${story.repository.html_url}

## Story Metadata
- Generated: ${story.metadata.generatedAt}
- Style: ${story.metadata.style}

## Story

${story.content}

## Events

${story.events.map(event => `### ${event.timestamp}
${event.data.message}
By: ${event.data.author}
`).join('\n\n')}
`

    return new Response(markdown, {
      headers: {
        'Content-Type': 'text/markdown',
        'Content-Disposition': `attachment; filename="story-${story.id}.md"`
      }
    })
  } catch (error) {
    return new Response('Error exporting story', { status: 500 })
  }
} 