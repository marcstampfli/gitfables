/**
 * @module components/repositories/repository-actions
 * @description Repository actions component for syncing and deleting repositories
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { RefreshCw, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { createGitHubClient } from '@/lib/vcs/github-client'
import { useToast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { logError } from '@/lib/utils/logger'

interface Repository {
  id: string
  name: string
  owner: string
  provider: 'github' | 'gitlab' | 'bitbucket'
}

interface RepositoryActionsProps {
  repository: Repository
}

export function RepositoryActions({ repository }: RepositoryActionsProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSyncing, setIsSyncing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleSync = async () => {
    try {
      setIsSyncing(true)
      const supabase = await createClient()
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError || !user) {
        throw new Error('User not authenticated')
      }

      // Create sync record
      const { data: sync, error: syncError } = await supabase
        .from('repository_syncs')
        .insert({
          repository_id: repository.id,
          status: 'in_progress'
        })
        .select()
        .single()

      if (syncError) throw syncError

      // Get provider token
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError || !session?.provider_token) {
        throw new Error('GitHub token not found')
      }

      // Fetch latest commits
      const githubClient = createGitHubClient(session.provider_token)
      const commits = await githubClient.listCommits(repository.owner, repository.name)

      // Store new commits
      const { error: commitsError } = await supabase
        .from('commits')
        .insert(
          commits.map(commit => ({
            repository_id: repository.id,
            sha: commit.sha,
            message: commit.message,
            author_name: commit.author.name,
            author_email: commit.author.email,
            author_date: commit.author.date,
            url: commit.url,
            user_id: user.id
          }))
        )

      if (commitsError) throw commitsError

      // Update sync status
      await supabase
        .from('repository_syncs')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', sync.id)

      // Update repository last_synced_at
      await supabase
        .from('repositories')
        .update({
          last_synced_at: new Date().toISOString()
        })
        .eq('id', repository.id)

      toast({
        title: 'Repository synced',
        description: 'Successfully synced latest commits'
      })

      router.refresh()
    } catch (error) {
      logError('Failed to sync repository', { metadata: { error, repository } })
      toast({
        title: 'Sync failed',
        description: 'Failed to sync repository. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsSyncing(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const supabase = await createClient()
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError || !user) {
        throw new Error('User not authenticated')
      }

      // Delete repository
      const { error: deleteError } = await supabase
        .from('repositories')
        .delete()
        .eq('id', repository.id)
        .eq('user_id', user.id)

      if (deleteError) throw deleteError

      toast({
        title: 'Repository deleted',
        description: 'Successfully deleted repository'
      })

      router.refresh()
      router.push('/dashboard/repositories')
    } catch (error) {
      logError('Failed to delete repository', { metadata: { error, repository } })
      toast({
        title: 'Delete failed',
        description: 'Failed to delete repository. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handleSync}
        disabled={isSyncing}
      >
        <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowDeleteDialog(true)}
        disabled={isDeleting}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Repository</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this repository? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 