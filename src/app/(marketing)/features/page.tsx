/**
 * @module app/features/page
 * @description Features page showcasing GitFables capabilities
 */

import { Button } from '@/components/ui/button'
import { ArrowRight, GitBranch, BookOpen, Share2 } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: GitBranch,
    title: 'Git Integration',
    description: 'Connect your GitHub repositories seamlessly and securely. GitFables analyzes your commit history while maintaining your privacy and security.',
    items: [
      'OAuth-based secure authentication',
      'Granular repository access control',
      'Automatic repository sync',
      'Support for private repositories'
    ]
  },
  {
    icon: BookOpen,
    title: 'Story Generation',
    description: 'Transform your Git history into engaging narratives that showcase your development journey and technical expertise.',
    items: [
      'AI-powered story generation',
      'Customizable story formats',
      'Technical and non-technical versions',
      'Rich markdown formatting'
    ]
  },
  {
    icon: Share2,
    title: 'Sharing & Export',
    description: 'Share your development stories with your team, stakeholders, or the world. Multiple export formats for different use cases.',
    items: [
      'Embeddable story widgets',
      'PDF and markdown export',
      'Team sharing capabilities',
      'Portfolio integration'
    ]
  }
]

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {/* Hero */}
        <section className="relative py-20">
          <div className="container relative">
            <div className="max-w-[800px] mx-auto text-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Powerful Features for
                  <br />
                  <span className="relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 blur-2xl opacity-25" />
                    <span className="relative bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      Developer Stories
                    </span>
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
                  Everything you need to transform your Git history into engaging narratives that showcase your development journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="max-w-[800px] mx-auto">
              <div className="prose prose-gray dark:prose-invert lg:prose-lg max-w-none">
                {features.map((feature, i) => (
                  <div key={feature.title} className="mb-20 last:mb-0">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-3xl font-bold tracking-tight m-0">
                        {feature.title}
                      </h2>
                    </div>
                    <p className="text-lg text-muted-foreground mt-4">
                      {feature.description}
                    </p>
                    <ul className="mt-8 space-y-4">
                      {feature.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-[600px] mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold tracking-tight">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground">
                Transform your Git history into engaging stories today.
              </p>
              <Button size="lg" className="h-12 px-8" asChild>
                <Link href="/login">
                  Try GitFables Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 