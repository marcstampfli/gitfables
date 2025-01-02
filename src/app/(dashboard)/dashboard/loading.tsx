import { MetricSkeleton, ContentCardSkeleton, HeaderSkeleton, SectionHeaderSkeleton } from '@/components/ui/skeletons'

export default function DashboardLoading() {
  return (
    <div className="container space-y-8">
      {/* Stats Loading */}
      <div className="w-full">
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <MetricSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Main Content Loading */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Column */}
        <div className="space-y-8 lg:col-span-2">
          {/* Quick Actions Loading */}
          <ContentCardSkeleton className="h-[280px]" />

          {/* Stories Loading */}
          <div>
            <SectionHeaderSkeleton />
            <div className="mt-4 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <ContentCardSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Repositories Loading */}
          <div>
            <SectionHeaderSkeleton />
            <div className="mt-4 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <ContentCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Activity Feed Loading */}
          <div>
            <SectionHeaderSkeleton />
            <div className="mt-4 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <ContentCardSkeleton key={i} className="h-16" />
              ))}
            </div>
          </div>

          {/* Quick Access Loading */}
          <div>
            <SectionHeaderSkeleton />
            <div className="mt-4 space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <ContentCardSkeleton key={i} className="h-10" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 