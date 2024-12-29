import { NextResponse } from 'next/server'
import { GitHubClient } from '@/lib/vcs/github-client'

export async function GET(
  request: Request,
  { params }: { params: { owner: string; repo: string } }
) {
  try {
    const { owner, repo } = params
    const github = await new GitHubClient('token')
    const commits = await github.listCommits(owner, repo)

    return NextResponse.json(commits)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch commits' },
      { status: 500 }
    )
  }
} 