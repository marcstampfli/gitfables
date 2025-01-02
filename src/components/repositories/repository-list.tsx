/**
 * @module components/repositories/repository-list
 * @description List component for displaying repositories
 */

import { Card } from '@/components/ui/card'
import { GitFork } from 'lucide-react'

interface Repository {
  id: string
  name: string
  provider: string
  url: string
  createdAt: string
}

interface RepositoryListProps {
  repositories?: Repository[]
  className?: string
}

export function RepositoryList({ repositories = [], className }: RepositoryListProps) {
  if (!repositories.length) {
    return (
      <Card className={className}>
        <div className="p-6">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <GitFork className="h-8 w-8 text-muted-foreground" />
            <h3 className="font-semibold">No repositories connected</h3>
            <p className="text-sm text-muted-foreground">
              Connect a GitHub repository to get started
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Connected Repositories</h2>
        <div className="space-y-4">
          {repositories.map((repo) => (
            <div
              key={repo.id}
              className="flex items-start justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <h3 className="font-medium">{repo.name}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="capitalize">{repo.provider}</span>
                  <span>•</span>
                  <span>{new Date(repo.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
} 