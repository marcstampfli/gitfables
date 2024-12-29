/**
 * @module api/story/generate
 * @description API route for generating stories from repository commits
 */

import { NextResponse } from 'next/server'
import { GitHubProvider } from '@/lib/vcs/github-provider'
import { generateStory } from '@/lib/story/generator'
import { type Repository, type Commit } from '@/types/vcs'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { repository } = await request.json() as { repository: Repository }
    const [owner, repo] = repository.full_name.split('/')

    // Get GitHub token from Supabase auth
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.provider_token) {
      throw new Error('GitHub token not found')
    }

    // Initialize GitHub provider
    const provider = new GitHubProvider()
    await provider.init({ platform: 'github' })
    await provider.authenticate({ token: session.provider_token })

    const commitData = await provider.fetchCommits({ owner, repo })
    
    // Convert CommitData to Commit type
    const commits: Commit[] = commitData.map(data => ({
      sha: data.id,
      message: data.message,
      author: {
        name: data.author,
        email: '', // Not available in CommitData
        date: data.date
      },
      date: data.date,
      url: '' // Not available in CommitData
    }))

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