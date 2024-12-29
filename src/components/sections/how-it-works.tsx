/**
 * @module sections/how-it-works
 * @description Section explaining how GitFables works
 */

import { GitBranch, BookOpen, Share2 } from 'lucide-react'
import { Animated } from '@/components/ui/animated'

const steps = [
  {
    title: 'Connect Your Repository',
    description: 'Link your GitHub account and select a repository to analyze.',
    icon: GitBranch,
  },
  {
    title: 'Generate Your Story',
    description: 'Our AI analyzes your commit history and creates an engaging narrative.',
    icon: BookOpen,
  },
  {
    title: 'Share Your Journey',
    description: 'Share your developer story with your network or use it in your portfolio.',
    icon: Share2,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-muted/50">
      <div className="container">
        <Animated animation="slide-up">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
              Transform your repository history into an engaging story in three simple steps
            </p>
          </div>
        </Animated>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Animated
              key={step.title}
              animation="slide-up"
              delay={200 + index * 100}
            >
              <div
                className="relative flex flex-col items-center text-center p-6 rounded-lg bg-background border"
              >
                <div className="mb-4 p-3 rounded-full bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  Step {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </Animated>
          ))}
        </div>
      </div>
    </section>
  )
} 