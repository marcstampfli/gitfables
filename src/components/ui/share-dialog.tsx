'use client'

/**
 * @module components/shared/share-dialog
 * @description A unified share dialog component that supports both simple and advanced sharing options
 */

import { useState } from 'react'
import { Icons } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { logError } from '@/lib/utils/logger'
import type { Story } from '@/types/stories'

type ShareType = 'private' | 'public' | 'team'

interface ShareDialogProps {
  title?: string
  url?: string
  shareCode?: string
  onShare?: (type: ShareType, expiresIn: string) => Promise<string>
  showAdvancedOptions?: boolean
  /** The story being shared. Currently unused but kept for future analytics and metadata purposes */
  _story?: Story
}

export function ShareDialog({ 
  title = 'Share',
  url,
  shareCode: initialShareCode,
  onShare,
  showAdvancedOptions = false,
  _story 
}: ShareDialogProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [shareType, setShareType] = useState<ShareType>('private')
  const [expiresIn, setExpiresIn] = useState('never')
  const [shareCode, setShareCode] = useState(initialShareCode)

  async function handleShare() {
    if (!onShare) return

    try {
      setLoading(true)
      const code = await onShare(shareType, expiresIn)
      setShareCode(code)
    } catch (error) {
      logError('Error generating share link', error instanceof Error ? error : new Error('Error generating share link'), {
        context: 'share_dialog'
      })
      toast({
        title: 'Error',
        description: 'Failed to generate share link',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy() {
    try {
      const textToCopy = shareCode 
        ? `${window.location.origin}/s/${shareCode}`
        : url || window.location.href
      
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      
      toast({
        title: 'Success',
        description: 'Link copied to clipboard',
      })
    } catch (error) {
      logError('Error copying to clipboard', error instanceof Error ? error : new Error('Error copying to clipboard'), {
        context: 'share_dialog'
      })
      toast({
        title: 'Error',
        description: 'Failed to copy link',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Icons.share className="h-4 w-4" />
        <span className="sr-only">Share</span>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {showAdvancedOptions && (
            <>
              <div className="space-y-2">
                <Label>Share Type</Label>
                <Select
                  value={shareType}
                  onValueChange={(value: ShareType) => setShareType(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private Link</SelectItem>
                    <SelectItem value="public">Public Link</SelectItem>
                    <SelectItem value="team">Team Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Expires In</Label>
                <Select
                  value={expiresIn}
                  onValueChange={setExpiresIn}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="1">1 Day</SelectItem>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {(shareCode || url) ? (
            <div className="space-y-2">
              <Label>Share Link</Label>
              <div className="flex space-x-2">
                <Input
                  readOnly
                  value={shareCode ? `${window.location.origin}/s/${shareCode}` : url || window.location.href}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Icons.check className="h-4 w-4" />
                  ) : (
                    <Icons.copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ) : showAdvancedOptions ? (
            <Button
              className="w-full"
              onClick={handleShare}
              disabled={loading}
            >
              {loading ? 'Generating Link...' : 'Generate Share Link'}
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={handleCopy}
            >
              Copy Link
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 