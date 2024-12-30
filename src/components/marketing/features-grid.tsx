/**
 * @module components/marketing/features-grid
 * @description A grid of features with modern design and gradients
 */

import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Feature {
  title: string
  description: string
  icon: LucideIcon
}

interface FeaturesGridProps {
  title: string
  description: string
  features: Feature[]
  className?: string
}

export function FeaturesGrid({
  title,
  description,
  features,
  className
}: FeaturesGridProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="relative">
          <div className="text-center max-w-[800px] mx-auto mb-20">
            <span className="text-sm font-medium text-primary mb-2 block text-purple-600">Features</span>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-x-8 gap-y-16">
            {features.map((feature, index) => (
              <div key={feature.title} className="relative">
                {/* Icon Container */}
                <div className="mb-6 inline-flex">
                  <div className="relative rounded-xl p-3 bg-gradient-to-br from-primary/10 to-purple-600/10">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-purple-600/5" />
                    <feature.icon className="relative h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Connector Lines (for non-last items in each row) */}
                {index % 3 !== 2 && (
                  <div className="absolute top-12 -right-4 w-8 h-px bg-gradient-to-r from-border to-transparent hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 