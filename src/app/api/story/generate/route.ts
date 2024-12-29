/**
 * @module api/story/generate
 * @description API route for generating stories from repository commits
 */

import { NextResponse } from 'next/server'
import { getGitHubClient } from '@/lib/github-service'
import { generateStory } from '@/lib/story/generator'
import { type Repository } from '@/lib/github-client'

export async function POST(request: Request) {
  try {
    const { repository } = await request.json() as { repository: Repository }
    const [owner, repo] = repository.full_name.split('/')

    const client = await getGitHubClient()
    const commits = await client.listCommits(owner, repo)

    const story = await generateStory({
      repository,
      commits,
    })

    return NextResponse.json(story)
  } catch (error) {
    if (error instanceof Error && error.message === 'GitHub token not found') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate story' },
      { status: 500 }
    )
  }
} 