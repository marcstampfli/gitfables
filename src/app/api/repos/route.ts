import { NextResponse } from 'next/server'
import { createGitHubClient } from '@/lib/github-client'
import { logError } from '@/lib/logger'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const client = await createGitHubClient()
    const repos = await client.listRepositories()
    return NextResponse.json(repos)
  } catch (error) {
    if (error instanceof Error) {
      logError(error, { context: 'API:repos' })
      return new Response('Error fetching repositories', { status: 500 })
    }
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    )
  }
} 