/**
 * @module components/dashboard/stories/share-dialog
 * @description Dialog for sharing stories
 */

'use client'

import * as React from 'react'
import { useStories } from '@/hooks/story/use-stories'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Share2, Copy, Check } from 'lucide-react'
import type { Story, ShareType } from '@/types/stories'

interface ShareDialogProps {
  story: Story
}

export function ShareDialog({ story }: ShareDialogProps) {
  const { share } = useStories()
  const [shareType, setShareType] = React.useState<ShareType>('private')
  const [expiresIn, setExpiresIn] = React.useState<string>('never')
  const [shareCode, setShareCode] = React.useState<string>('')
  const [copied, setCopied] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  // Handle share
  async function handleShare() {
    try {
      setLoading(true)
      const result = await share({
        story_id: story.id,
        share_type: shareType,
        expires_in_days: expiresIn === 'never' ? undefined : parseInt(expiresIn)
      })

      if (result) {
        setShareCode(result.share_code)
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle copy
  async function handleCopy() {
    const url = `${window.location.origin}/s/${shareCode}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Story</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
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

          {shareCode ? (
            <div className="space-y-2">
              <Label>Share Link</Label>
              <div className="flex space-x-2">
                <Input
                  readOnly
                  value={`${window.location.origin}/s/${shareCode}`}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <Button
              className="w-full"
              onClick={handleShare}
              disabled={loading}
            >
              {loading ? 'Generating Link...' : 'Generate Share Link'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 