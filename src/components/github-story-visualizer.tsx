/**
 * @module GitHubStoryVisualizer
 * @description A component that transforms GitHub commit data into engaging narrative stories.
 * Visualizes commit patterns and generates contextual stories based on developer activity.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <GitHubStoryVisualizer />
 * 
 * // With custom data source
 * <GitHubStoryVisualizer dataSource={customDataFetcher} />
 * ```
 */

'use client'

import { useState, useCallback, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Calendar, Book, Activity } from 'lucide-react'
import { ErrorBoundary } from '@/components/error-boundary'

// Types and Interfaces
export interface CommitData {
  date: string
  commits: number
  message: string | null
  time?: string
  language?: string
  linesAdded?: number
  linesRemoved?: number
}

export type DeveloperPersona = '🦉 Night Owl' | '🌅 Early Bird' | '⌨️ Steady Coder' | '🌙 Evening Developer'

export interface StoryGenerationOptions {
  includeTimeContext?: boolean
  includeLanguageContext?: boolean
  includeLineChanges?: boolean
}

// Type Guards
export const isValidCommitData = (data: unknown): data is CommitData => {
  const commit = data as CommitData
  return (
    typeof commit?.date === 'string' &&
    typeof commit?.commits === 'number' &&
    (commit?.message === null || typeof commit?.message === 'string')
  )
}

// Error Types
export class StoryGenerationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'StoryGenerationError'
  }
}

/**
 * GitHubStoryVisualizer Component
 * 
 * @component
 * @description Transforms GitHub commit data into narrative stories with visual representations
 * 
 * @param {Object} props - Component props
 * @param {Function} [props.dataSource] - Optional custom data source function
 * @param {StoryGenerationOptions} [props.options] - Story generation options
 * 
 * @example
 * ```tsx
 * <GitHubStoryVisualizer 
 *   options={{ 
 *     includeTimeContext: true,
 *     includeLanguageContext: true 
 *   }} 
 * />
 * ```
 */
export function GitHubStoryVisualizer() {
  // State Management
  const [selectedDay, setSelectedDay] = useState<CommitData | null>(null)
  const [error, setError] = useState<Error | null>(null)

  // Sample data - In production, this would come from an API
  const sampleData: CommitData[] = [
    { 
      date: '2024-01-01', 
      commits: 5, 
      time: '09:00',
      message: "Initialized new project structure",
      language: "JavaScript",
      linesAdded: 120,
      linesRemoved: 0
    },
    { 
      date: '2024-01-02', 
      commits: 15, 
      time: '23:30',
      message: "Implemented core authentication system",
      language: "TypeScript",
      linesAdded: 450,
      linesRemoved: 20
    },
    { 
      date: '2024-01-03', 
      commits: 3, 
      time: '14:15',
      message: "Fixed navigation bugs",
      language: "CSS",
      linesAdded: 45,
      linesRemoved: 12
    },
    { 
      date: '2024-01-04', 
      commits: 0, 
      message: null,
      language: undefined,
      linesAdded: 0,
      linesRemoved: 0
    },
    { 
      date: '2024-01-05', 
      commits: 8, 
      time: '16:20',
      message: "Added responsive design",
      language: "CSS",
      linesAdded: 230,
      linesRemoved: 45
    }
  ]

  /**
   * Determines the developer persona based on commit time
   * @param {string} time - The commit time in HH:mm format
   * @returns {DeveloperPersona | null} The determined developer persona
   */
  const getDeveloperPersona = useCallback((time: string | undefined): DeveloperPersona | null => {
    if (!time) return null
    try {
      const hour = parseInt(time.split(':')[0])
      if (hour < 6 || hour >= 22) return '🦉 Night Owl'
      if (hour >= 6 && hour < 12) return '🌅 Early Bird'
      if (hour >= 12 && hour < 17) return '⌨️ Steady Coder'
      return '🌙 Evening Developer'
    } catch (error) {
      console.error('Error parsing time:', error)
      return null
    }
  }, [])

  /**
   * Generates a story fragment based on commit data
   * @param {CommitData} day - The commit data for a specific day
   * @returns {string} The generated story fragment
   * @throws {StoryGenerationError} If the commit data is invalid
   */
  const getStoryFragment = useCallback((day: CommitData): string => {
    try {
      if (!isValidCommitData(day)) {
        throw new StoryGenerationError('Invalid commit data')
      }

      if (day.commits === 0) {
        return "Our developer took a well-deserved break today. Sometimes, the best code is the code not written."
      }

      const persona = getDeveloperPersona(day.time)
      const intensity = day.commits > 10 ? 'furiously' : day.commits > 5 ? 'steadily' : 'carefully'
      
      return `
        ${persona} was at it again! The keyboard clicked ${intensity} as ${day.linesAdded} lines of fresh ${day.language} 
        code came to life. ${day.linesRemoved && day.linesRemoved > 0 ? `Some spring cleaning was also in order, as ${day.linesRemoved} lines bid farewell.` : ''} 
        The commit message tells us: "${day.message}"
      `.trim()
    } catch (error) {
      console.error('Error generating story:', error)
      throw new StoryGenerationError('Failed to generate story')
    }
  }, [getDeveloperPersona])

  /**
   * Determines the color intensity based on commit count
   * @param {number} commits - Number of commits
   * @returns {string} Tailwind CSS class for background color
   */
  const getCommitColor = useCallback((commits: number): string => {
    if (commits === 0) return 'bg-gray-100'
    if (commits > 10) return 'bg-green-700'
    if (commits > 5) return 'bg-green-500'
    return 'bg-green-200'
  }, [])

  // Error handling effect
  useEffect(() => {
    if (error) {
      console.error('Story visualization error:', error)
      // In production, you might want to log to an error tracking service
    }
  }, [error])

  // Cleanup effect
  useEffect(() => {
    return () => {
      // Cleanup any subscriptions or side effects here
      setSelectedDay(null)
      setError(null)
    }
  }, [])

  return (
    <ErrorBoundary fallback={<div>Something went wrong loading the story visualizer.</div>}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="w-6 h-6" />
            The Developer's Tale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Visualization */}
            <div className="flex gap-2 justify-center p-4">
              {sampleData.map((day) => (
                <div
                  key={day.date}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                  onClick={() => setSelectedDay(day)}
                >
                  <div
                    className={`w-8 h-8 rounded-sm ${getCommitColor(day.commits)} hover:ring-2 hover:ring-blue-400
                      ${selectedDay?.date === day.date ? 'ring-2 ring-blue-600' : ''}`}
                    title={`${day.commits} commits`}
                  />
                  <span className="text-xs text-gray-500">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </div>
              ))}
            </div>

            {/* Story Panel */}
            <div className="border rounded-lg p-4 bg-gray-50 min-h-[150px]">
              {selectedDay ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedDay.date).toLocaleDateString()}
                    {selectedDay.commits > 0 && (
                      <>
                        <Activity className="w-4 h-4 ml-2" />
                        {selectedDay.commits} commits
                      </>
                    )}
                  </div>
                  <p className="text-lg leading-relaxed">
                    {getStoryFragment(selectedDay)}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 text-center">
                  Click on a day to reveal its story...
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </ErrorBoundary>
  )
} 