/**
 * @module app/docs/api/page
 * @description Main API documentation page
 */

import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'
import { PageHeader } from '@/components/marketing/page-header'
import { ArrowRight, Key, Globe, Code, Bell, MessageSquare, FileText } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'API Documentation - GitFables',
  description: 'Complete API reference documentation for GitFables.'
}

const apiResources = [
  {
    icon: Key,
    title: 'Authentication',
    description: 'Learn how to authenticate your API requests and manage API keys.',
    href: '/docs/api/auth'
  },
  {
    icon: Globe,
    title: 'REST API',
    description: 'Explore our REST API endpoints for managing stories and repositories.',
    href: '/docs/api/rest'
  },
  {
    icon: Code,
    title: 'GraphQL API',
    description: 'Use our GraphQL API for flexible and efficient data querying.',
    href: '/docs/api/graphql'
  },
  {
    icon: Bell,
    title: 'Webhooks',
    description: 'Set up webhooks to receive real-time updates and events.',
    href: '/docs/api/webhooks'
  }
]

const supportResources = [
  {
    icon: MessageSquare,
    title: 'Discord Community',
    description: 'Join our community for real-time support and discussions.',
    href: 'https://discord.gg/gitfables'
  },
  {
    icon: FileText,
    title: 'API FAQ',
    description: 'Find answers to commonly asked questions.',
    href: '/docs/api/faq'
  }
]

export default function ApiDocsPage() {
  return (
    <DocLayout>
      <div className="relative">
        <PageHeader
          title="API Documentation"
          titleGradient="API"
          description="Everything you need to integrate GitFables into your applications."
        />

        {/* Getting Started */}
        <section className="py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">1</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Getting Started</h2>
                    <p className="text-muted-foreground text-lg">
                      GitFables provides both REST and GraphQL APIs to help you integrate story generation into your applications.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <ol className="list-decimal list-inside space-y-3 text-sm">
                        <li>Create a GitFables account</li>
                        <li>Generate an API key</li>
                        <li>Choose your preferred API (REST or GraphQL)</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* API Resources */}
        <section className="py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                API Resources
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore our comprehensive API documentation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {apiResources.map((resource) => (
                <Link 
                  key={resource.title}
                  href={resource.href}
                  className="group relative bg-background hover:bg-muted/50 border rounded-xl p-6 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                      <resource.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* API Status & Support */}
        <section className="py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">2</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">API Status</h2>
                    <p className="text-muted-foreground text-lg">
                      Monitor our API performance and uptime.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <p className="text-sm">
                        Check our <a href="https://status.gitfables.com" className="text-primary hover:underline">status page</a> for 
                        real-time and historical uptime information.
                      </p>
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
                    <h2 className="text-2xl font-bold tracking-tight">Support Resources</h2>
                    <p className="text-muted-foreground text-lg">
                      Get help with our API integration.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {supportResources.map((resource) => (
                        <Link 
                          key={resource.title}
                          href={resource.href}
                          className="group bg-background hover:bg-muted/50 border rounded-xl p-6 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                              <resource.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                                {resource.title}
                              </h3>
                              <p className="text-muted-foreground text-sm">
                                {resource.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                      <div className="bg-background border rounded-xl p-6">
                        <h3 className="font-semibold mb-2">Email Support</h3>
                        <p className="text-muted-foreground text-sm">
                          Contact us at <a href="mailto:api@gitfables.com" className="text-primary hover:underline">api@gitfables.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DocLayout>
  )
}