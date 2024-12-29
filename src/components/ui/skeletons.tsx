import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MetricSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="mt-2 h-8 w-16" />
    </Card>
  )
}

export function ContentCardSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-4 w-4" />
      </div>
    </Card>
  )
}

export function HeaderSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="h-8 w-32" />
    </div>
  )
}

export function SectionHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="h-6 w-32" />
    </div>
  )
} 