/**
 * @module components/marketing/process-steps
 * @description A section showing process steps with visual connections
 */

import { cn } from '@/lib/utils'

interface Step {
  step: string
  title: string
  description: string
}

interface ProcessStepsProps {
  title: string
  description: string
  steps: Step[]
  className?: string
}

export function ProcessSteps({
  title,
  description,
  steps,
  className
}: ProcessStepsProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="relative">
          <div className="text-center max-w-[800px] mx-auto mb-20">
            <span className="text-sm font-medium text-primary mb-2 block text-purple-600">Process</span>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="relative max-w-[1000px] mx-auto">
            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-16">
              {steps.map((step, index) => (
                <div key={step.step} className="relative">
                  {/* Step Number */}
                  <div className="relative mb-8">
                    <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-600/10 opacity-50" />
                    <div className="relative text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-purple-600">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-12 -right-8 w-16 hidden md:block">
                      <div className="h-px bg-gradient-to-r from-border to-transparent" />
                      <div className="mt-px h-px bg-gradient-to-r from-border/50 to-transparent" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Progress Line */}
            <div className="absolute top-12 left-0 right-0 hidden md:block">
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 