import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Feature {
  id: string
  title: string
  description: string
  Icon: LucideIcon
}

interface FeaturesGridProps {
  title: string
  description: string
  features: Feature[]
  className?: string
}

export function FeaturesGrid({ features, title, description, className }: FeaturesGridProps) {
  return (
    <section className={cn("py-24 bg-muted/30", className)}>
      <div className="container px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="group relative bg-background hover:bg-muted/50 border rounded-xl p-6 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                  <feature.Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 