/**
 * @module app/docs/features/story-generation/page
 * @description Story generation feature documentation
 */

import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'
import { PageHeader } from '@/components/marketing/page-header'
import { ArrowRight, GitBranch, Terminal, Settings, FileText } from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'

export const metadata: Metadata = {
  title: 'Story Generation - GitFables Documentation',
  description: 'Learn how to generate stories from your Git repositories using GitFables.'
}

const nextSteps = [
  {
    icon: FileText,
    title: 'Templates',
    description: 'Create and customize story templates.',
    href: '/docs/features/templates'
  },
  {
    icon: GitBranch,
    title: 'Team Setup',
    description: 'Configure team collaboration features.',
    href: '/docs/features/teams'
  },
  {
    icon: Settings,
    title: 'Integrations',
    description: 'Connect with other tools and services.',
    href: '/docs/features/integrations'
  },
  {
    icon: Terminal,
    title: 'CLI Usage',
    description: 'Generate stories via command line.',
    href: '/docs/cli'
  }
]

export default function StoryGenerationPage() {
  return (
    <DocLayout>
      <div className="relative">
        <PageHeader
          title="Story Generation"
          titleGradient="Story Generation"
          description="Learn how to generate engaging stories from your Git repositories."
        />

        {/* Main Content */}
        <section className="py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">1</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">How It Works</h2>
                    <p className="text-muted-foreground text-lg">
                      GitFables uses advanced AI to analyze your Git repository and generate stories.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <ol className="list-decimal list-inside space-y-3 text-sm">
                        <li>Repository Analysis: We scan your commit history, branches, and code changes</li>
                        <li>Pattern Recognition: Our AI identifies key development patterns and milestones</li>
                        <li>Story Creation: The AI crafts a narrative based on the analysis</li>
                        <li>Review & Customize: You can edit and refine the generated story</li>
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
                    <h2 className="text-2xl font-bold tracking-tight">Story Templates</h2>
                    <p className="text-muted-foreground text-lg">
                      Choose from various story templates to match your needs.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <ul className="list-disc list-inside space-y-3 text-sm">
                        <li><strong>Technical Journey</strong>: Focus on technical decisions and architecture</li>
                        <li><strong>Team Story</strong>: Highlight collaboration and team dynamics</li>
                        <li><strong>Project Timeline</strong>: Chronological development narrative</li>
                        <li><strong>Feature Spotlight</strong>: Deep dive into specific features</li>
                        <li><strong>Custom Templates</strong>: Create your own story format</li>
                      </ul>
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
                    <h2 className="text-2xl font-bold tracking-tight">Generation Options</h2>
                    <p className="text-muted-foreground text-lg">
                      Customize your story generation with these options.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <CodeBlock
                        code={`{
  "template": "technical-journey",
  "timeframe": {
    "start": "2024-01-01",
    "end": "2024-02-01"
  }`}
                        language="json"
                        showLineNumbers={true}
                        className="bg-zinc-950"
                        fileName="story-config.json"
                        caption="Story generation configuration options"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">4</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Story Enhancement</h2>
                    <p className="text-muted-foreground text-lg">
                      After generation, enhance your story with additional content.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Content Types</h4>
                          <ul className="list-disc list-inside space-y-2 text-sm">
                            <li>Code snippets and examples</li>
                            <li>Commit visualizations</li>
                            <li>Team member contributions</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Visual Elements</h4>
                          <ul className="list-disc list-inside space-y-2 text-sm">
                            <li>Technical diagrams</li>
                            <li>Performance metrics</li>
                            <li>Timeline visualizations</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">5</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>
                    <p className="text-muted-foreground text-lg">
                      Follow these tips for better story generation.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <ul className="list-disc list-inside space-y-3 text-sm">
                        <li>Use descriptive commit messages</li>
                        <li>Tag significant milestones</li>
                        <li>Keep branches organized</li>
                        <li>Document major changes</li>
                        <li>Review and refine generated stories</li>
                      </ul>
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
                Explore these resources to enhance your story generation.
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