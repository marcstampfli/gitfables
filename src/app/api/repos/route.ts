import { NextResponse } from 'next/server'
import { GitHubClient } from '@/lib/vcs/github-client'

export async function GET() {
  try {
    const client = await new GitHubClient('token')

    const repos = await client.listRepositories()

    return NextResponse.json(repos)
  } catch (error) {
    if (error instanceof Error && error.message === 'GitHub token not found') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    )
  }
} 