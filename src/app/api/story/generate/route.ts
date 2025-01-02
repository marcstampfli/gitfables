/**
 * @module app/api/story/generate/route
 * @description API route for story generation
 */

import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { logError } from '@/lib/utils/logger'
import { createVCSProvider, initializeVCSProvider } from '@/lib/vcs'

export async function POST(request: Request) {
  try {
    const supabase = await createServerClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError) throw authError
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get request body
    const body = await request.json()
    const { owner, repo } = body

    if (!owner || !repo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get provider token
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session?.provider_token) {
      return NextResponse.json(
        { error: 'GitHub token not found' },
        { status: 401 }
      )
    }

    // Initialize VCS provider
    const provider = createVCSProvider({
      platform: 'github'
    })

    await initializeVCSProvider(
      provider,
      { platform: 'github' },
      session.provider_token
    )

    // Get repository commits
    const commits = await provider.listCommits(owner, repo)

    return NextResponse.json({ commits })
  } catch (error) {
    logError('Failed to generate story', { context: 'api:story:generate', error })
    return NextResponse.json(
      { error: 'Failed to generate story' },
      { status: 500 }
    )
  }
} 