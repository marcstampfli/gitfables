/**
 * @module app/docs/page
 * @description Documentation page with guides and API reference
 */

import { Button } from '@/components/ui/button'
import { ArrowRight, Book, Code2, Rocket, GitBranch, Share2, Settings } from 'lucide-react'
import Link from 'next/link'

const guides = [
  {
    icon: Rocket,
    title: 'Getting Started',
    description: 'Learn how to set up GitFables and create your first story.',
    href: '/docs/getting-started'
  },
  {
    icon: GitBranch,
    title: 'Repository Setup',
    description: 'Connect and configure your GitHub repositories with GitFables.',
    href: '/docs/repository-setup'
  },
  {
    icon: Book,
    title: 'Story Generation',
    description: 'Understand how GitFables transforms your commits into stories.',
    href: '/docs/story-generation'
  },
  {
    icon: Share2,
    title: 'Sharing & Export',
    description: 'Learn about different ways to share and export your stories.',
    href: '/docs/sharing'
  },
  {
    icon: Settings,
    title: 'Configuration',
    description: 'Customize GitFables to match your workflow and preferences.',
    href: '/docs/configuration'
  },
  {
    icon: Code2,
    title: 'API Reference',
    description: 'Detailed documentation for GitFables API integration.',
    href: '/docs/api'
  }
]

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {/* Hero */}
        <section className="relative py-20">
          <div className="container relative">
            <div className="max-w-[800px] mx-auto text-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Documentation &
                  <br />
                  <span className="relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 blur-2xl opacity-25" />
                    <span className="relative bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      Developer Guides
                    </span>
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
                  Everything you need to know about using GitFables effectively. From basic setup to advanced customization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 border-b">
          <div className="container">
            <div className="max-w-[800px] mx-auto">
              <nav className="flex flex-wrap justify-center gap-2">
                {guides.map((guide) => (
                  <a
                    key={guide.title}
                    href={guide.href}
                    className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors inline-flex items-center gap-2"
                  >
                    <guide.icon className="w-4 h-4" />
                    <span>{guide.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-[800px] mx-auto">
              <div className="grid sm:grid-cols-2 gap-8">
                {guides.map((guide) => (
                  <Link
                    key={guide.title}
                    href={guide.href}
                    className="group relative bg-card hover:bg-muted/50 border rounded-xl p-6 transition-colors"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <guide.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                          {guide.title}
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                          {guide.description}
                        </p>
                      </div>
                      <div className="flex items-center text-primary">
                        <span className="text-sm font-medium">Learn more</span>
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Help */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="max-w-[600px] mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold tracking-tight">
                Need More Help?
              </h2>
              <p className="text-lg text-muted-foreground">
                Can&apos;t find what you&apos;re looking for? Get in touch with me for support.
              </p>
              <Button size="lg" asChild icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 