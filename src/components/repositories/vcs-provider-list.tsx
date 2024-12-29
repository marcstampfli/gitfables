'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { GithubIcon, GitlabIcon, CheckCircle2Icon } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useVCSConnections, type VCSConnection } from '@/hooks/vcs/use-vcs-connections'
import { cn } from '@/lib/utils/styles'
import { logError } from '@/lib/utils/logger'

interface VCSProviderItem {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  isActive: boolean
  comingSoon?: boolean
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
            >
              <provider.icon className="mr-2 h-5 w-5" />
              <span className="flex-1 text-left">
                {provider.name}
                {connection?.username && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    Connected as {connection.username}
                  </span>
                )}
                {provider.comingSoon && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    Coming soon
                  </span>
                )}
              </span>
              {isConnected && (
                <CheckCircle2Icon className="ml-2 h-4 w-4 text-green-500" />
              )}
            </Button>
          )
        })}
      </div>
    </div>
  )
} 