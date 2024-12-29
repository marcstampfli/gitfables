/**
 * @module app/api/repos/[owner]/[repo]/commits/route
 * @description API route handler for fetching repository commits
 */

import { NextRequest, NextResponse } from 'next/server'
import { GitHubClient } from '@/lib/vcs/github-client'
import { logError } from '@/lib/utils/logger'

interface RouteContext {
  params: {
    owner: string
    repo: string
  }
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { owner, repo } = params
    const github = await new GitHubClient('token')
    const commits = await github.listCommits(owner, repo)

    return NextResponse.json(commits)
  } catch (error) {
    logError('Failed to fetch commits', error, {
      context: 'api',
      metadata: {
        owner: params.owner,
        repo: params.repo,
        url: request.url
      }
    })
    return NextResponse.json(
      { error: 'Failed to fetch commits' },
      { status: 500 }
    )
  }
} 