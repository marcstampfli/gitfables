/**
 * @module FeaturesSection
 * @description A component that displays the main features of the application
 * in a responsive grid of cards.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <FeaturesSection />
 * ```
 */

'use client'

import { Card } from '@/components/ui/card'
import { BookOpen, GitBranch, LineChart, Users } from 'lucide-react'

/**
 * Feature data structure
 * @interface
 * @private
 */
interface Feature {
  /** Title of the feature */
  title: string
  /** Description of the feature */
  description: string
  /** Icon component for the feature */
  icon: React.ComponentType<{ className?: string }>
}

/**
 * Array of features with their details
 * @const
 * @private
 */
const features: Feature[] = [
  {
    title: 'Repository Analysis',
    description: 'Deep analysis of your commit history, code patterns, and development style',
    icon: GitBranch,
  },
  {
    title: 'Story Generation',
    description: 'Transform your coding journey into engaging narratives with different styles',
    icon: BookOpen,
  },
  {
    title: 'Development Insights',
    description: 'Discover patterns and trends in your coding habits and project contributions',
    icon: LineChart,
  },
  {
    title: 'Team Collaboration',
    description: 'Share your stories with team members and showcase your development journey',
    icon: Users,
  },
]

/**
 * FeaturesSection Component
 * 
 * @component
 * @description Displays a responsive grid of feature cards, each containing an icon,
 * title, and description. The grid adapts to different screen sizes.
 * 
 * @returns {JSX.Element} A grid of feature cards
 */
export function FeaturesSection() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => (
        <Card key={feature.title} className="p-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <feature.icon className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">{feature.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  )
} 