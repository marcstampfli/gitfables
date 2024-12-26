/**
 * @module lib/story/generator
 * @description Story generator implementation for creating narratives from commit data
 */

import type { 
  StoryGenerator,
  StoryGeneratorConfig,
  StoryOptions,
  Story,
  StoryFragment,
  DeveloperPersona,
} from './types'
import type { CommitData } from '@/types'

/**
 * Default story generator configuration
 */
const DEFAULT_CONFIG: StoryGeneratorConfig = {
  maxFragmentsPerStory: 10,
  minCommitsPerFragment: 1,
  maxCommitsPerFragment: 5,
  defaultTheme: 'adventure',
  defaultPersona: 'steady-coder',
  enableStats: true,
  enableMetadata: true,
}

/**
 * Story generator implementation
 * 
 * @example
 * ```ts
 * const generator = new DefaultStoryGenerator()
 * 
 * const story = await generator.generateStory(commits, {
 *   theme: 'adventure',
 *   persona: 'night-owl',
 *   includeStats: true
 * })
 * ```
 */
export class DefaultStoryGenerator implements StoryGenerator {
  private config: StoryGeneratorConfig

  constructor(config: Partial<StoryGeneratorConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }
  }

  /**
   * Generate a complete story from commit data
   */
  async generateStory(commits: CommitData[], options: StoryOptions): Promise<Story> {
    // Sort commits by date
    const sortedCommits = [...commits].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    // Group commits by day
    const commitsByDay = this.groupCommitsByDay(sortedCommits)

    // Generate fragments for each day's commits
    const fragments = await Promise.all(
      Object.entries(commitsByDay)
        .slice(0, this.config.maxFragmentsPerStory)
        .map(([date, dayCommits]) => 
          this.generateFragment(dayCommits, { ...options, date })
        )
    )

    // Calculate story statistics
    const stats = this.calculateStoryStats(sortedCommits)

    // Generate story metadata
    const metadata = this.config.enableMetadata ? {
      repository: this.extractRepositoryInfo(commits),
      persona: this.determinePersona(commits),
      languages: this.extractLanguages(commits),
      contributors: this.extractContributors(commits),
    } : undefined

    return {
      id: this.generateId(),
      title: this.generateTitle(options.theme, metadata?.persona),
      description: this.generateDescription(stats, options),
      author: commits[0]?.author || 'Unknown Developer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fragments,
      theme: options.theme,
      stats,
      metadata,
    }
  }

  /**
   * Generate a story fragment from commits
   */
  async generateFragment(
    commits: CommitData[],
    options: StoryOptions & { date?: string }
  ): Promise<StoryFragment> {
    const stats = this.calculateFragmentStats(commits)
    const intensity = this.calculateIntensity(commits)
    const persona = options.persona || this.determinePersona(commits)

    return {
      id: this.generateId(),
      title: this.generateFragmentTitle(commits, options.theme),
      content: this.generateFragmentContent(commits, options.theme, persona),
      date: options.date || commits[0]?.date || new Date().toISOString(),
      commits,
      stats: this.config.enableStats ? stats : undefined,
      metadata: this.config.enableMetadata ? {
        theme: options.theme,
        persona,
        language: options.language,
        intensity,
      } : undefined,
    }
  }

  /**
   * Get the current configuration
   */
  getConfig(): StoryGeneratorConfig {
    return { ...this.config }
  }

  /**
   * Update the configuration
   */
  updateConfig(config: Partial<StoryGeneratorConfig>): void {
    this.config = { ...this.config, ...config }
  }

  /**
   * Group commits by day
   */
  private groupCommitsByDay(commits: CommitData[]): Record<string, CommitData[]> {
    return commits.reduce((groups, commit) => {
      const date = new Date(commit.date).toISOString().split('T')[0]
      return {
        ...groups,
        [date]: [...(groups[date] || []), commit],
      }
    }, {} as Record<string, CommitData[]>)
  }

  /**
   * Calculate story statistics
   */
  private calculateStoryStats(commits: CommitData[]) {
    return {
      totalCommits: commits.length,
      totalAdditions: commits.reduce((sum, c) => sum + (c.additions || 0), 0),
      totalDeletions: commits.reduce((sum, c) => sum + (c.deletions || 0), 0),
      totalFiles: commits.reduce((sum, c) => sum + (c.files || 0), 0),
      timeSpan: {
        start: commits[0]?.date || new Date().toISOString(),
        end: commits[commits.length - 1]?.date || new Date().toISOString(),
      },
    }
  }

  /**
   * Calculate fragment statistics
   */
  private calculateFragmentStats(commits: CommitData[]) {
    return {
      additions: commits.reduce((sum, c) => sum + (c.additions || 0), 0),
      deletions: commits.reduce((sum, c) => sum + (c.deletions || 0), 0),
      files: commits.reduce((sum, c) => sum + (c.files || 0), 0),
    }
  }

  /**
   * Calculate commit intensity (0-10)
   */
  private calculateIntensity(commits: CommitData[]): number {
    const totalChanges = commits.reduce(
      (sum, c) => sum + (c.additions || 0) + (c.deletions || 0),
      0
    )
    // Scale intensity based on total changes (adjust thresholds as needed)
    return Math.min(Math.floor(totalChanges / 100), 10)
  }

  /**
   * Determine developer persona based on commit times
   */
  private determinePersona(commits: CommitData[]): DeveloperPersona {
    const hours = commits.map(c => new Date(c.date).getHours())
    const avgHour = hours.reduce((sum, h) => sum + h, 0) / hours.length

    if (avgHour >= 22 || avgHour < 5) return 'night-owl'
    if (avgHour >= 5 && avgHour < 12) return 'early-bird'
    if (avgHour >= 12 && avgHour < 17) return 'steady-coder'
    return 'evening-dev'
  }

  /**
   * Extract repository information
   */
  private extractRepositoryInfo(commits: CommitData[]) {
    return {
      name: 'repository-name', // TODO: Extract from commit data
      owner: 'owner-name',     // TODO: Extract from commit data
      url: undefined,          // TODO: Extract from commit data
    }
  }

  /**
   * Extract unique languages from commits
   */
  private extractLanguages(commits: CommitData[]): string[] {
    // TODO: Implement language detection from file extensions or commit messages
    return ['TypeScript', 'JavaScript']
  }

  /**
   * Extract unique contributors from commits
   */
  private extractContributors(commits: CommitData[]): string[] {
    return Array.from(new Set(commits.map(c => c.author).filter(Boolean)))
  }

  /**
   * Determine main language used in commits
   */
  private determineMainLanguage(commits: CommitData[]): string | undefined {
    const languages = this.extractLanguages(commits)
    return languages[0]
  }

  /**
   * Generate a unique ID
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }

  /**
   * Generate a story title
   */
  private generateTitle(theme: string, persona?: DeveloperPersona): string {
    // TODO: Implement more sophisticated title generation
    return `The ${theme.charAt(0).toUpperCase() + theme.slice(1)} of the ${
      persona?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Developer'
    }`
  }

  /**
   * Generate a story description
   */
  private generateDescription(stats: Story['stats'], options: StoryOptions): string {
    // TODO: Implement more sophisticated description generation
    return `A ${options.theme} story spanning ${stats.totalCommits} commits over ${
      Math.ceil((new Date(stats.timeSpan.end).getTime() - new Date(stats.timeSpan.start).getTime()) / (1000 * 60 * 60 * 24))
    } days.`
  }

  /**
   * Generate a fragment title
   */
  private generateFragmentTitle(commits: CommitData[], theme: string): string {
    // TODO: Implement more sophisticated title generation
    return `Chapter ${commits[0]?.message?.split('\n')[0] || 'Untitled'}`
  }

  /**
   * Generate fragment content
   */
  private generateFragmentContent(
    commits: CommitData[],
    theme: string,
    persona: DeveloperPersona
  ): string {
    // TODO: Implement more sophisticated content generation
    return commits
      .map(c => `${c.message}\n${c.additions} additions, ${c.deletions} deletions`)
      .join('\n\n')
  }
} 