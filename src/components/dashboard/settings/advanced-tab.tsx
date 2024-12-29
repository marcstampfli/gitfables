/**
 * @module components/dashboard/settings/advanced-tab
 * @description Advanced settings tab with data management and account settings
 */

'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { createClient } from '@/lib/supabase/client'
import { Download, AlertTriangle, LogOut, Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { logError } from '@/lib/utils/logger'

export function AdvancedTab() {
  const [isExporting, setIsExporting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()

  const handleExportData = async () => {
    try {
      setIsExporting(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No authenticated user')

      // Fetch user data
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (userError) throw userError

      // Fetch stories
      const { data: stories, error: storiesError } = await supabase
        .from('stories')
        .select('*')
        .eq('user_id', user.id)

      if (storiesError) throw storiesError

      // Fetch settings
      const { data: settings, error: settingsError } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (settingsError) throw settingsError

      // Create export data
      const exportData = {
        profile: userData,
        stories,
        settings,
        exported_at: new Date().toISOString()
      }

      // Create and download file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `gitfables-export-${new Date().toISOString()}.json`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: 'Data Exported',
        description: 'Your data has been exported successfully.'
      })
    } catch (error) {
      logError('Failed to export data', error, {
        context: 'advanced_settings',
        metadata: {
          action: 'export_data'
        }
      })
      toast({
        title: 'Error',
        description: 'Failed to export data. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No authenticated user')

      if (deleteConfirmation !== user.email) {
        throw new Error('Email confirmation does not match')
      }

      // Delete user data
      const { error: deleteError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id)

      if (deleteError) throw deleteError

      // Delete user auth
      const { error: authError } = await supabase.auth.admin.deleteUser(user.id)
      if (authError) throw authError

      await supabase.auth.signOut()
      router.push('/auth/login')
    } catch (error) {
      logError('Failed to delete account', error, {
        context: 'advanced_settings',
        metadata: {
          action: 'delete_account'
        }
      })
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete account. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsDeleting(false)
      setDeleteConfirmation('')
    }
  }

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/auth/login')
    } catch (error) {
      logError('Failed to sign out', error, {
        context: 'advanced_settings',
        metadata: {
          action: 'sign_out'
        }
      })
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Advanced Settings</h2>
        <p className="text-muted-foreground">
          Manage your data, sessions, and account
        </p>
      </div>

      {/* Data Management */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-1">Data Management</h3>
            <p className="text-sm text-muted-foreground">
              Export or delete your account data
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={handleExportData}
              disabled={isExporting}
              className="flex items-center gap-2"
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Export Data
            </Button>
          </div>
        </div>
      </Card>

      {/* Session Management */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-1">Session Management</h3>
            <p className="text-sm text-muted-foreground">
              Manage your current session
            </p>
          </div>

          <Button
            variant="outline"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="flex items-center gap-2"
          >
            {isSigningOut ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            Sign Out
          </Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-1 flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              Danger Zone
            </h3>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove all associated data from our servers.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="confirm-email">
                    Please type your email to confirm
                  </Label>
                  <Input
                    id="confirm-email"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Delete Account'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  )
} 