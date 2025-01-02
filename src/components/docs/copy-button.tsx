/**
 * @module components/docs/copy-button
 * @description Copy to clipboard button component for code blocks
 */

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8 absolute top-3 right-3 hover:bg-muted/50",
        copied && "text-green-500",
        className
      )}
      onClick={copy}
    >
      {copied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      <span className="sr-only">
        {copied ? 'Copied' : 'Copy to clipboard'}
      </span>
    </Button>
  )
} 