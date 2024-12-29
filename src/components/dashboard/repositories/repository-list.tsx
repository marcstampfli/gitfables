/**
 * @module components/dashboard/repositories/repository-list
 * @description List component for displaying repositories in the dashboard
 */

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { GitFork } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Repository } from '@/types/dashboard'

interface RepositoryListProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  repositories: Repository[]
}

export function RepositoryList({
  title,
  repositories,
  className,
  ...props
}: RepositoryListProps) {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      <h2 className="text-xl font-semibold">{title}</h2>
      {repositories.length === 0 ? (
        <EmptyState
          icon={GitFork}
          title="No repositories connected"
          description="Connect your first repository to get started."
          action={{
            label: "Connect Repository",
            href: "/dashboard/repositories/new"
          }}
        />
      ) : (
        <div className="grid gap-4">
          {repositories.map((repo) => (
            <Card key={repo.id} className="p-6">
              <div className="space-y-2">
                <h3 className="font-semibold">{repo.name}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>
                    Connected {formatDistanceToNow(new Date(repo.createdAt))} ago
                  </span>
                  <span>•</span>
                  <span>{repo.provider}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 