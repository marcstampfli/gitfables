/**
 * @module app/docs/page
 * @description Documentation landing page with guides and API references
 */

import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { ArrowRight, Book, Code2, Terminal, Puzzle, GitBranch, Settings, FileText } from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from '@/components/marketing/page-header'
import { DocLayout } from '@/components/docs/doc-layout'

export const metadata: Metadata = {
  title: 'Documentation - GitFables',
  description: 'Everything you need to know about using GitFables effectively.'
}

const guides = [
  {
    icon: GitBranch,
    title: 'Getting Started',
    description: 'Learn how to connect your Git repositories and generate your first story.',
    href: '/docs/getting-started'
  },
  {
    icon: Terminal,
    title: 'CLI Usage',
    description: 'Use our command-line interface for advanced story generation and automation.',
    href: '/docs/cli'
  },
  {
    icon: Settings,
    title: 'Configuration',
    description: 'Customize GitFables to match your workflow and preferences.',
    href: '/docs/configuration'
  },
  {
    icon: Puzzle,
    title: 'Integrations',
    description: 'Connect GitFables with your favorite development tools and platforms.',
    href: '/docs/integrations'
  }
]

const topics = [
  {
    title: 'Story Generation',
    description: 'Learn about different story formats and customization options.',
    items: [
      { title: 'Story Formats', href: '/docs/story-formats' },
      { title: 'Custom Templates', href: '/docs/templates' },
      { title: 'AI Configuration', href: '/docs/ai-config' },
      { title: 'Export Options', href: '/docs/exports' }
    ]
  },
  {
    title: 'API Reference',
    description: 'Detailed documentation for our REST and GraphQL APIs.',
    items: [
      { title: 'Authentication', href: '/docs/api/auth' },
      { title: 'REST API', href: '/docs/api/rest' },
      { title: 'GraphQL API', href: '/docs/api/graphql' },
      { title: 'Webhooks', href: '/docs/api/webhooks' }
    ]
  },
  {
    title: 'Team Features',
    description: 'Collaborate with your team and manage shared resources.',
    items: [
      { title: 'Team Management', href: '/docs/teams' },
      { title: 'Shared Templates', href: '/docs/shared-templates' },
      { title: 'Access Control', href: '/docs/access-control' },
      { title: 'Analytics', href: '/docs/analytics' }
    ]
  }
]

export default function DocsPage() {
  return (
    <DocLayout showNav={false} showFeedback={false}>
      <div className="relative">
        <PageHeader
          title="Documentation"
          titleGradient="Documentation"
          description="Everything you need to know about using GitFables effectively."
        />

        {/* Quick Start Guides */}
        <section className="py-24 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Quick Start Guides
              </h2>
              <p className="text-lg text-muted-foreground">
                Get up and running quickly with our step-by-step guides.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {guides.map((guide) => (
                <Link 
                  key={guide.title}
                  href={guide.href}
                  className="group relative bg-background hover:bg-muted/50 border rounded-xl p-6 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                      <guide.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {guide.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Topics */}
        <section className="py-24">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {topics.map((topic) => (
                <div key={topic.title} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-2">
                      {topic.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {topic.description}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {topic.items.map((item) => (
                      <li key={item.title}>
                        <Link 
                          href={item.href}
                          className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ArrowRight className="h-4 w-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Additional Resources
                </h2>
                <p className="text-lg text-muted-foreground">
                  Explore our collection of resources to help you get the most out of GitFables.
                </p>
              </div>

              <div className="grid gap-6">
                <Link 
                  href="/docs/examples"
                  className="group relative bg-background hover:bg-muted/50 border rounded-xl p-6 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                      <Book className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        Example Stories
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Browse our collection of example stories to see what&apos;s possible.
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </Link>

                <Link 
                  href="/docs/tutorials"
                  className="group relative bg-background hover:bg-muted/50 border rounded-xl p-6 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        Video Tutorials
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Watch step-by-step tutorials on using GitFables effectively.
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </Link>

                <Link 
                  href="/docs/api"
                  className="group relative bg-background hover:bg-muted/50 border rounded-xl p-6 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                      <Code2 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        API Documentation
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Detailed API reference for developers building integrations.
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container">
            <div className="max-w-[600px] mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold tracking-tight">
                Need Help?
              </h2>
              <p className="text-lg text-muted-foreground">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button size="lg" variant="outline" asChild>
                  <Link href="/docs/faq">
                    Browse FAQ
                  </Link>
                </Button>
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Contact Support
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DocLayout>
  )
} 