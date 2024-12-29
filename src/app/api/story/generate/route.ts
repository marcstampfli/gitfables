/**
 * @module app/api/story/generate/route
 * @description Story generation API route
 */

import { NextResponse } from 'next/server'
import { createVCSProvider, initializeVCSProvider } from '@/lib/vcs'
import { logError } from '@/lib/utils/logger'
import { createClient } from '@/lib/supabase/server'

/**
 * Generate a story from repository commits
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.provider_token) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const data = await request.json()
    const { owner, repo } = data

    if (!owner || !repo) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const provider = createVCSProvider({
      platform: 'github'
    })

    await initializeVCSProvider(
      provider,
      { platform: 'github' },
      session.provider_token
    )

    const commits = await provider.listCommits(owner, repo)

    return NextResponse.json({ commits })
  } catch (error) {
    logError('Failed to generate story', { metadata: { error } })
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 