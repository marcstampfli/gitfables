import { type Repository } from '@/lib/github-client'

interface StatsSectionProps {
  repositories: Repository[]
}

export function StatsSection({ repositories }: StatsSectionProps) {
  const totalRepositories = repositories.length
  const totalStars = repositories.reduce((sum, repo) => sum + repo.stars, 0)
  const totalForks = repositories.reduce((sum, repo) => sum + repo.forks, 0)

  const languages = repositories.reduce((acc, repo) => {
    if (!repo.languages) return acc
    Object.entries(repo.languages).forEach(([lang, bytes]) => {
      acc[lang] = (acc[lang] || 0) + Number(bytes)
    })
    return acc
  }, {} as Record<string, number>)

  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, bytes]) => ({
      name,
      percentage: (bytes / Object.values(languages).reduce((a, b) => a + b, 0)) * 100
    }))

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Repositories</h3>
        <p className="mt-2 text-2xl font-bold">{totalRepositories}</p>
      </div>
      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Total Stars</h3>
        <p className="mt-2 text-2xl font-bold">{totalStars}</p>
      </div>
      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Total Forks</h3>
        <p className="mt-2 text-2xl font-bold">{totalForks}</p>
      </div>
      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Top Languages</h3>
        <div className="mt-2 space-y-1">
          {topLanguages.map(({ name, percentage }) => (
            <div key={name} className="flex items-center justify-between">
              <span className="text-sm">{name}</span>
              <span className="text-sm text-muted-foreground">
                {percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 