/**
 * @module app/docs/getting-started/quick-start/page
 * @description Quick start guide for GitFables
 */

import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'
import { PageHeader } from '@/components/marketing/page-header'
import { ArrowRight, GitBranch, Terminal, Settings, FileText } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Quick Start - GitFables Documentation',
  description: 'Get started quickly with GitFables in just a few minutes.'
}

const nextSteps = [
  {
    icon: GitBranch,
    title: 'Story Generation',
    description: 'Learn about different story generation options and templates.',
    href: '/docs/features/story-generation'
  },
  {
    icon: Terminal,
    title: 'CLI Usage',
    description: 'Use our command-line interface for advanced automation.',
    href: '/docs/cli'
  },
  {
    icon: Settings,
    title: 'Configuration',
    description: 'Customize GitFables to match your workflow.',
    href: '/docs/configuration'
  },
  {
    icon: FileText,
    title: 'Templates',
    description: 'Explore and customize story templates.',
    href: '/docs/features/templates'
  }
]

export default function QuickStartPage() {
  return (
    <DocLayout>
      <div className="relative">
        <PageHeader
          title="Quick Start Guide"
          titleGradient="Quick Start"
          description="Get up and running with GitFables in just a few minutes."
        />

        {/* Steps */}
        <section className="py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">1</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Sign Up</h2>
                    <p className="text-muted-foreground text-lg">
                      Create your GitFables account to get started.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <ol className="list-decimal list-inside space-y-3 text-sm">
                        <li>Visit <a href="https://app.gitfables.com/signup" className="text-primary hover:underline">app.gitfables.com/signup</a></li>
                        <li>Enter your email and password</li>
                        <li>Verify your email address</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">2</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Connect Your Repository</h2>
                    <p className="text-muted-foreground text-lg">
                      Link your Git repository to start generating stories.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <ol className="list-decimal list-inside space-y-3 text-sm">
                        <li>Go to your dashboard</li>
                        <li>Click &quot;Add Repository&quot;</li>
                        <li>Choose your Git provider (GitHub, GitLab, etc.)</li>
                        <li>Select the repository you want to analyze</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">3</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Generate Your First Story</h2>
                    <p className="text-muted-foreground text-lg">
                      Create your first story from your repository.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <ol className="list-decimal list-inside space-y-3 text-sm">
                        <li>Select your connected repository</li>
                        <li>Choose a story template</li>
                        <li>Click &quot;Generate Story&quot;</li>
                        <li>Wait for the AI to analyze your repository</li>
                        <li>Review and customize your generated story</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Next Steps
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore these resources to get the most out of GitFables.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {nextSteps.map((step) => (
                <Link 
                  key={step.title}
                  href={step.href}
                  className="group relative bg-background hover:bg-muted/50 border rounded-xl p-6 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DocLayout>
  )
} 