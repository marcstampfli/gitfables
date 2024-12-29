import { MetricSkeleton, ContentCardSkeleton, HeaderSkeleton, SectionHeaderSkeleton } from '@/components/ui/skeletons'

export default function DashboardLoading() {
  return (
    <div className="container space-y-8 py-8">
      <HeaderSkeleton />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <MetricSkeleton key={i} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <SectionHeaderSkeleton />
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <ContentCardSkeleton key={i} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <SectionHeaderSkeleton />
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <ContentCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 