'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { GithubIcon, GitlabIcon, CheckCircle2Icon } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useVCSConnections } from '@/hooks/vcs/use-vcs-connections'
import { cn } from '@/lib/utils/styles'
import { logError } from '@/lib/utils/logger'

interface VCSProviderItem {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  isActive: boolean
  comingSoon?: boolean
}

interface VCSConnection {
  id: string
  user_id: string
  provider: 'github' | 'gitlab' | 'bitbucket'
  provider_user_id: string
  provider_username: string
  provider_email: string
  provider_avatar_url: string | null
  access_token: string
  refresh_token: string | null
  expires_at: string | null
  created_at: string
  updated_at: string
}

const providers: VCSProviderItem[] = [
  {
    id: 'github',
    name: 'GitHub',
    icon: GithubIcon,
    isActive: true,
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    icon: GitlabIcon,
    isActive: false,
    comingSoon: true,
  },
  // Temporarily removed Bitbucket until icon is available
]

export function VCSProviderList() {
  const [error, setError] = useState<string | null>(null)
  const { connections, isLoading } = useVCSConnections()
  const supabase = createClient()

  const handleConnect = async (provider: VCSProviderItem) => {
    if (!provider.isActive) return

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider.id as 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'repo read:user user:email',
        },
      })

      if (error) throw error
    } catch (err) {
      logError('Failed to connect to VCS provider', {
        metadata: {
          error: err,
          providerId: provider.id,
          providerName: provider.name
        }
      })
      setError('Failed to connect to provider')
    }
  }

  return (
    <div className="grid gap-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid gap-4">
        {providers.map((provider) => {
          const connection = connections.find((c: VCSConnection) => c.provider === provider.id)
          const isConnected = !!connection

          return (
            <Button
              key={provider.id}
              variant={provider.isActive ? 'outline' : 'secondary'}
              className={cn(
                "justify-start",
                isConnected && "border-green-500"
              )}
              onClick={() => handleConnect(provider)}
              disabled={!provider.isActive || isLoading}
              icon={<provider.icon className="h-5 w-5" />}
            >
              <span className="flex-1 text-left">
                {provider.name}
                {connection?.provider_username && (
                  <span className="text-xs text-muted-foreground ml-2">
                    Connected as {connection.provider_username}
                  </span>
                )}
                {provider.comingSoon && (
                  <span className="text-xs text-muted-foreground ml-2">
                    Coming soon
                  </span>
                )}
              </span>
              {isConnected && (
                <CheckCircle2Icon className="h-4 w-4 text-green-500" />
              )}
            </Button>
          )
        })}
      </div>
    </div>
  )
} 