/**
 * @module components/marketing/process-steps
 * @description A component that displays a step-by-step process with visual elements
 */

import { GitBranch, Sparkles, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProcessStepsProps {
  className?: string
}

export function ProcessSteps({ className }: ProcessStepsProps) {
  return (
    <div className={cn('relative py-24', className)}>
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)] opacity-[0.03]" />
      </div>

      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          {/* Steps */}
          <div className="relative grid gap-12 lg:gap-20">
            {/* Connecting Line */}
            <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-primary/10 via-primary/5 to-transparent hidden lg:block" />

            {/* Step 1 */}
            <div className="relative grid lg:grid-cols-[theme(spacing.16),1fr] gap-8 items-center">
              <div className="relative flex">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-xl opacity-20" />
                <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center border border-primary/10 shadow-sm">
                  <GitBranch className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-primary">Step 1</div>
                    <h3 className="text-2xl font-semibold">Connect Your Repository</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Link your Git repository to GitFables with a single click. We support GitHub, GitLab, and Bitbucket, making it easy to get started with your existing projects.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative grid lg:grid-cols-[theme(spacing.16),1fr] gap-8 items-center">
              <div className="relative flex">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-xl opacity-20" />
                <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center border border-primary/10 shadow-sm">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-primary">Step 2</div>
                    <h3 className="text-2xl font-semibold">Generate Your Story</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Our AI analyzes your commit history and transforms it into an engaging narrative. Choose from different story styles and customize the tone to match your project&apos;s personality.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative grid lg:grid-cols-[theme(spacing.16),1fr] gap-8 items-center">
              <div className="relative flex">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-xl opacity-20" />
                <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center border border-primary/10 shadow-sm">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-primary">Step 3</div>
                    <h3 className="text-2xl font-semibold">Share Your Journey</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Share your development story with the world. Export as a blog post, documentation, or presentation. Perfect for portfolios, team updates, or project documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 