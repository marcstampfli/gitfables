/**
 * @module app/docs/api/rest/page
 * @description REST API documentation page
 */

import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'
import { PageHeader } from '@/components/marketing/page-header'
import { ArrowRight, Book, Code, Lock, Gauge } from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'

export const metadata: Metadata = {
  title: 'REST API - GitFables Documentation',
  description: 'Complete reference documentation for the GitFables REST API endpoints, authentication, and usage examples.'
}

const endpoints = {
  stories: [
    { method: 'GET', path: '/api/stories', description: 'List all stories' },
    { method: 'POST', path: '/api/stories', description: 'Generate a new story' },
    { method: 'GET', path: '/api/stories/:id', description: 'Get a specific story' },
    { method: 'PUT', path: '/api/stories/:id', description: 'Update a story' },
    { method: 'DELETE', path: '/api/stories/:id', description: 'Delete a story' }
  ],
  templates: [
    { method: 'GET', path: '/api/templates', description: 'List all templates' },
    { method: 'POST', path: '/api/templates', description: 'Create a new template' },
    { method: 'GET', path: '/api/templates/:id', description: 'Get a specific template' },
    { method: 'PUT', path: '/api/templates/:id', description: 'Update a template' },
    { method: 'DELETE', path: '/api/templates/:id', description: 'Delete a template' }
  ]
}

export default function RestApiPage() {
  return (
    <DocLayout>
      <div className="relative">
        <PageHeader
          title="REST API Documentation"
          titleGradient="REST API"
          description="Complete reference for the GitFables REST API endpoints, authentication, and usage examples."
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
                    <h2 className="text-2xl font-bold tracking-tight">Authentication</h2>
                    <p className="text-muted-foreground text-lg">
                      All API requests require authentication using an API key.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <p className="text-sm">
                        Add your API key to the Authorization header:
                      </p>
                      <CodeBlock
                        code="Authorization: Bearer your-api-key"
                        language="bash"
                        showLineNumbers={true}
                        className="bg-zinc-950"
                        fileName="auth-header.txt"
                        caption="API Authentication Header Example"
                      />
                      <p className="text-sm text-muted-foreground mt-4">
                        You can obtain your API key from your <a href="https://app.gitfables.com/settings/api" className="text-primary hover:underline">GitFables dashboard</a>.
                      </p>
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
                    <h2 className="text-2xl font-bold tracking-tight">Story Endpoints</h2>
                    <p className="text-muted-foreground text-lg">
                      Manage stories through these REST endpoints.
                    </p>
                    <div className="bg-background border rounded-lg divide-y">
                      {endpoints.stories.map((endpoint, index) => (
                        <div key={index} className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                                endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                                endpoint.method === 'POST' ? 'bg-green-100 text-green-700' :
                                endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {endpoint.method}
                              </span>
                            </div>
                            <div>
                              <code className="text-sm font-mono">{endpoint.path}</code>
                              <p className="text-sm text-muted-foreground mt-1">
                                {endpoint.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
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
                    <h2 className="text-2xl font-bold tracking-tight">Template Endpoints</h2>
                    <p className="text-muted-foreground text-lg">
                      Manage story templates through these REST endpoints.
                    </p>
                    <div className="bg-background border rounded-lg divide-y">
                      {endpoints.templates.map((endpoint, index) => (
                        <div key={index} className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                                endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                                endpoint.method === 'POST' ? 'bg-green-100 text-green-700' :
                                endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {endpoint.method}
                              </span>
                            </div>
                            <div>
                              <code className="text-sm font-mono">{endpoint.path}</code>
                              <p className="text-sm text-muted-foreground mt-1">
                                {endpoint.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
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
                    <h2 className="text-2xl font-bold tracking-tight">Rate Limiting</h2>
                    <p className="text-muted-foreground text-lg">
                      The API is rate limited to 100 requests per minute per API key.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <p className="text-sm">
                        Check your current rate limit status in the response headers:
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <code className="text-sm font-mono text-primary">X-RateLimit-Limit</code>
                          <span className="text-sm text-muted-foreground">Maximum number of requests per minute</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <code className="text-sm font-mono text-primary">X-RateLimit-Remaining</code>
                          <span className="text-sm text-muted-foreground">Number of requests remaining in the current window</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <code className="text-sm font-mono text-primary">X-RateLimit-Reset</code>
                          <span className="text-sm text-muted-foreground">Time when the rate limit will reset</span>
                        </div>
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