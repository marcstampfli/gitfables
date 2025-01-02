/**
 * @module app/docs/api/auth/page
 * @description API authentication documentation page
 */

import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'
import { PageHeader } from '@/components/marketing/page-header'
import { ArrowRight, Key, Lock, Shield, Gauge } from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'

export const metadata: Metadata = {
  title: 'API Authentication - GitFables Documentation',
  description: 'Learn how to authenticate your API requests with GitFables.'
}

const rateLimits = [
  {
    plan: 'Free',
    limit: '100 requests per hour',
    icon: Gauge
  },
  {
    plan: 'Pro',
    limit: '1,000 requests per hour',
    icon: Gauge
  },
  {
    plan: 'Enterprise',
    limit: 'Custom limits',
    icon: Gauge
  }
]

const securityTips = [
  {
    tip: 'Never share your API key or commit it to version control',
    icon: Lock
  },
  {
    tip: 'Use environment variables to store your API key',
    icon: Shield
  },
  {
    tip: 'Rotate your API keys periodically',
    icon: Key
  },
  {
    tip: 'Use different API keys for development and production',
    icon: Lock
  }
]

export default function ApiAuthPage() {
  return (
    <DocLayout>
      <div className="relative">
        <PageHeader
          title="API Authentication"
          titleGradient="Authentication"
          description="Learn how to authenticate your API requests with GitFables."
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
                    <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
                    <p className="text-muted-foreground text-lg">
                      All API requests to GitFables require authentication using an API key.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <p className="text-sm">
                        API authentication ensures:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Only authorized applications can access your data</li>
                        <li>Secure communication between systems</li>
                        <li>Proper request tracking and rate limiting</li>
                        <li>Access control based on permissions</li>
                      </ul>
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
                    <h2 className="text-2xl font-bold tracking-tight">Getting an API Key</h2>
                    <p className="text-muted-foreground text-lg">
                      Generate your API key through the GitFables dashboard.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <ol className="list-decimal list-inside space-y-3 text-sm">
                        <li>Log in to your GitFables dashboard</li>
                        <li>Go to Settings &gt; API Keys</li>
                        <li>Click &quot;Generate New API Key&quot;</li>
                        <li>Give your key a name and select permissions</li>
                        <li>Copy and securely store your API key</li>
                      </ol>
                      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                          ⚠️ Your API key will only be shown once. If you lose it, you&apos;ll need to generate a new one.
                        </p>
                      </div>
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
                    <h2 className="text-2xl font-bold tracking-tight">Using Your API Key</h2>
                    <p className="text-muted-foreground text-lg">
                      Include your API key in the Authorization header of your requests.
                    </p>
                    <div className="space-y-6">
                      <div className="bg-background border rounded-lg p-6 space-y-4">
                        <p className="text-sm">Authorization Header Format:</p>
                        <CodeBlock
                          code="Authorization: Bearer your-api-key"
                          language="bash"
                          showLineNumbers={true}
                          className="bg-zinc-950"
                          fileName="auth-header.txt"
                          caption="API Authorization Header Format"
                        />
                      </div>

                      <div className="bg-background border rounded-lg p-6 space-y-4">
                        <p className="text-sm">Example Request:</p>
                        <CodeBlock
                          code={`curl -X GET \\
  https://api.gitfables.com/v1/stories \\
  -H "Authorization: Bearer your-api-key"`}
                          language="bash"
                          showLineNumbers={true}
                          className="bg-zinc-950"
                          fileName="curl-example.sh"
                          caption="Example API Request with Authorization"
                        />
                      </div>
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
                    <h2 className="text-2xl font-bold tracking-tight">API Key Security</h2>
                    <p className="text-muted-foreground text-lg">
                      Follow these security best practices to protect your API keys.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {securityTips.map((tip, index) => (
                        <div key={index} className="bg-background border rounded-lg p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                              <tip.icon className="h-5 w-5 text-primary" />
                            </div>
                            <p className="text-sm">
                              {tip.tip}
                            </p>
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
                    <span className="text-primary font-semibold">5</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Rate Limiting</h2>
                    <p className="text-muted-foreground text-lg">
                      API requests are rate limited based on your plan.
                    </p>
                    <div className="space-y-6">
                      <div className="grid sm:grid-cols-3 gap-4">
                        {rateLimits.map((limit) => (
                          <div key={limit.plan} className="bg-background border rounded-lg p-6">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                                <limit.icon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-sm mb-1">{limit.plan}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {limit.limit}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-background border rounded-lg p-6 space-y-4">
                        <p className="text-sm">Rate limit information in response headers:</p>
                        <CodeBlock
                          language="http"
                          fileName="response-headers"
                          caption="Rate limit headers example"
                          code={`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200`}
                        />
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