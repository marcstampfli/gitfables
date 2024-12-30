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
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.provider_token) {
        throw new Error('GitHub token not found')
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
            user_id: session.user.id
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
          last_synced_at: new Date().toISOString(),
          commit_count: commits.length
        })
        .eq('id', repository.id)

      toast({
        title: 'Repository synced',
        description: `Successfully synced ${commits.length} commits from ${repository.name}`
      })

      router.refresh()
    } catch (error) {
      logError('Failed to sync repository', {
        metadata: {
          error,
          repositoryId: repository.id,
          repositoryName: repository.name
        }
      })

      toast({
        title: 'Sync failed',
        description: error instanceof Error ? error.message : 'Failed to sync repository',
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

      const { error } = await supabase
        .from('repositories')
        .delete()
        .eq('id', repository.id)

      if (error) throw error

      toast({
        title: 'Repository removed',
        description: `Successfully removed ${repository.name}`
      })

      router.refresh()
    } catch (error) {
      logError('Failed to delete repository', {
        metadata: {
          error,
          repositoryId: repository.id,
          repositoryName: repository.name
        }
      })

      toast({
        title: 'Delete failed',
        description: error instanceof Error ? error.message : 'Failed to delete repository',
        variant: 'destructive'
      })
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSync}
          disabled={isSyncing}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span className="sr-only">Sync repository</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDeleteDialog(true)}
          disabled={isDeleting}
          className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remove repository</span>
        </Button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Repository</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {repository.name}? This will delete all associated stories and data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove Repository
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
} 