'use client'

import { Button } from '@/components/ui/button'
import { GithubIcon } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { logError } from '@/lib/utils/logger'

interface GitHubLoginButtonProps {
  className?: string
}

export function GitHubLoginButton({ className }: GitHubLoginButtonProps) {
  const { toast } = useToast()

  const handleGitHubLogin = async () => {
    try {
      window.location.href = '/api/auth/github'
    } catch (error) {
      logError('Failed to initiate GitHub login', { metadata: { error } })
      toast({
        title: 'Error',
        description: 'Failed to connect to GitHub. Please try again.',
        variant: 'destructive'
      })
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleGitHubLogin}
      className={className}
    >
      <GithubIcon className="mr-2 h-4 w-4" />
      Continue with GitHub
    </Button>
  )
} 