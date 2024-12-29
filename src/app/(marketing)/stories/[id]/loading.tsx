/**
 * @module app/(marketing)/stories/[id]/loading
 * @description Loading state for the story page
 */

import { Skeleton } from '@/components/ui/skeleton'

export default function StoryLoading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-2 mt-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </main>
  )
} 