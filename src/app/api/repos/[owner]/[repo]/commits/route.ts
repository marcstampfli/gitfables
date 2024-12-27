import { createGitHubClient } from '@/lib/github-client'
import { logError } from '@/lib/logger'

export const runtime = 'nodejs'

export async function GET(
  request: Request,
  { params: { owner, repo } }: { params: { owner: string; repo: string } }
) {
  try {
    const _url = new URL(request.url)
    const token = request.headers.get('cookie')?.match(/github_token=([^;]+)/)?.[1]

    if (!token) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const github = createGitHubClient(token)
    const commits = await github.listCommits(owner, repo)

    return Response.json(commits)
  } catch (error) {
    logError(error instanceof Error ? error : new Error('Error fetching commits'), {
      context: 'API:commits',
      metadata: { owner, repo }
    })
    return new Response('Error fetching commits', { status: 500 })
  }
} 