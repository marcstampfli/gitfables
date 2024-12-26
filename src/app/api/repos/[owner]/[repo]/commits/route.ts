import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createGitHubClient } from '@/lib/github-client'

export async function GET(
  request: Request,
  { params }: { params: { owner: string; repo: string } }
) {
  try {
    const token = cookies().get('github_token')
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const github = createGitHubClient(token.value)
    const { data: commits } = await github.repos.listCommits({
      owner: params.owner,
      repo: params.repo,
      per_page: 100,
    })

    return NextResponse.json(commits)
  } catch (error) {
    console.error('Failed to fetch commits:', error)
    return NextResponse.json(
      { error: 'Failed to fetch commits' },
      { status: 500 }
    )
  }
} 