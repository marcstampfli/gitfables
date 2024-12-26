import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createGitHubClient } from '@/lib/github-client'

export async function GET() {
  try {
    const token = cookies().get('github_token')
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const github = createGitHubClient(token.value)
    const { data: repos } = await github.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100,
      visibility: 'all'
    })

    return NextResponse.json(repos)
  } catch (error) {
    console.error('Failed to fetch repositories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    )
  }
} 