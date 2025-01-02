import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function MetricSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("p-4", className)}>
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-8 rounded" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  )
}

export function ContentCardSkeleton({ className }: SkeletonProps) {
  return (
    <Skeleton className={cn("w-full rounded-lg", className)} />
  )
}

export function SectionHeaderSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>
  )
}

export function HeaderSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
  )
} 