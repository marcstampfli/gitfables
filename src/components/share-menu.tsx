/**
 * @module ShareMenu
 * @description A dropdown menu component that provides sharing options for a URL.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ShareMenu url="https://example.com/repo" />
 * ```
 */

'use client'

import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logError } from '@/lib/logger'
import { toast } from '@/components/ui/use-toast'

/**
 * Props for the ShareMenu component
 * @interface
 */
interface ShareMenuProps {
  /** The URL to be shared */
  _url: string
}

/**
 * ShareMenu Component
 * 
 * @component
 * @description A dropdown menu that provides options to share a URL via the native share API or copy to clipboard
 * 
 * @param {Object} props - Component props
 * @param {string} props._url - The URL to be shared
 */
export function ShareMenu({ _url }: ShareMenuProps) {
  async function handleShare(platform: string) {
    try {
      const url = window.location.href
      const text = 'Check out this story on RepoTales!'

      switch (platform) {
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`)
          break
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
          break
        default:
          throw new Error(`Unsupported platform: ${platform}`)
      }
    } catch (error) {
      logError(error instanceof Error ? error : new Error('Error sharing'), {
        context: 'ShareMenu:share',
        metadata: { shareUrl: window.location.href }
      })
      toast({
        title: 'Error',
        description: 'Failed to share story',
        variant: 'destructive',
      })
    }
  }

  async function handleCopyLink() {
    try {
      const url = window.location.href
      await navigator.clipboard.writeText(url)
      toast({
        title: 'Success',
        description: 'Link copied to clipboard',
      })
    } catch (error) {
      logError(error instanceof Error ? error : new Error('Error copying to clipboard'), {
        context: 'ShareMenu:copyLink',
        metadata: { shareUrl: window.location.href }
      })
      toast({
        title: 'Error',
        description: 'Failed to copy link',
        variant: 'destructive',
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleShare('twitter')}>
          Share via Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('linkedin')}>
          Share via LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink}>
          Copy link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 