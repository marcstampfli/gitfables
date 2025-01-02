import { Button } from '@/components/ui/button'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

export function DocFeedback() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Was this page helpful?</h3>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="gap-2">
          <ThumbsUp className="h-4 w-4" />
          Yes
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <ThumbsDown className="h-4 w-4" />
          No
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        <a
          href="https://github.com/gitfables/gitfables/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Suggest improvements →
        </a>
      </p>
    </div>
  )
} 