import { createClient } from '@/lib/supabase/server'
import { createGitHubClient } from '@/lib/github-client'
import { RepositoryList } from '@/components/dashboard/repository-list'
import { redirect } from 'next/navigation'
import type { Session } from '@supabase/supabase-js'

export default async function RepositoriesPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session?.provider_token) {
    redirect('/auth/signin')
  }

  // After this point, we know session and provider_token exist
  const validSession = session as Session & { provider_token: string }
  const github = createGitHubClient(validSession.provider_token)
  const repositories = await github.listRepositories()

  return <RepositoryList repositories={repositories} />
} 