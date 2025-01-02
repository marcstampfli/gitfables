/**
 * @module app/docs/api/webhooks/page
 * @description Webhooks API documentation page
 */

import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'
import { PageHeader } from '@/components/marketing/page-header'
import { ArrowRight, Bell, Shield, Code, Zap } from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'

export const metadata: Metadata = {
  title: 'Webhooks - GitFables Documentation',
  description: 'Learn how to use webhooks to receive real-time updates from GitFables.'
}

const eventTypes = [
  {
    name: 'story.generated',
    description: 'When a new story is generated',
    icon: Zap
  },
  {
    name: 'story.updated',
    description: 'When a story is updated',
    icon: Code
  },
  {
    name: 'template.created',
    description: 'When a new template is created',
    icon: Bell
  },
  {
    name: 'template.updated',
    description: 'When a template is updated',
    icon: Bell
  }
]

export default function WebhooksPage() {
  return (
    <DocLayout>
      <div className="relative">
        <PageHeader
          title="Webhooks"
          titleGradient="Webhooks"
          description="Learn how to use webhooks to receive real-time updates from GitFables."
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
                      Webhooks allow your application to receive automatic notifications and data updates.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <p className="text-sm">
                        Benefits of using webhooks:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Real-time updates without polling</li>
                        <li>Automatic notifications for important events</li>
                        <li>Efficient integration with your systems</li>
                        <li>Reduced API calls and latency</li>
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
                    <h2 className="text-2xl font-bold tracking-tight">Setting Up Webhooks</h2>
                    <p className="text-muted-foreground text-lg">
                      Configure webhooks through your GitFables dashboard.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <ol className="list-decimal list-inside space-y-3 text-sm">
                        <li>Go to your GitFables dashboard</li>
                        <li>Navigate to Settings &gt; Webhooks</li>
                        <li>Click &quot;Add Webhook&quot;</li>
                        <li>Enter your endpoint URL and select events</li>
                        <li>Save your webhook configuration</li>
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
                    <h2 className="text-2xl font-bold tracking-tight">Event Types</h2>
                    <p className="text-muted-foreground text-lg">
                      Available webhook events you can subscribe to.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {eventTypes.map((event) => (
                        <div key={event.name} className="bg-background border rounded-lg p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                              <event.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <code className="text-sm font-mono text-primary">{event.name}</code>
                              <p className="text-sm text-muted-foreground mt-2">
                                {event.description}
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
                    <h2 className="text-2xl font-bold tracking-tight">Webhook Payload</h2>
                    <p className="text-muted-foreground text-lg">
                      Example webhook payload structure.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <CodeBlock
                        code={`{
  "event": "story.generated",
  "timestamp": "2024-01-01T00:00:00Z",
  "data": {
    "id": "story-id",
    "title": "Story Title",
    "content": "Story content...",
    "repository": {
      "name": "repo-name",
      "url": "https://github.com/user/repo"
    }
  }
}`}
                        language="json"
                        showLineNumbers={true}
                        className="bg-zinc-950"
                        fileName="webhook-payload.json"
                        caption="Example webhook payload structure"
                      />
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
                    <h2 className="text-2xl font-bold tracking-tight">Security</h2>
                    <p className="text-muted-foreground text-lg">
                      Verify webhook signatures to ensure authenticity.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <p className="text-sm">
                        Each webhook request includes a signature in the <code className="text-primary">X-GitFables-Signature</code> header.
                      </p>
                      <CodeBlock
                        code={`// Example signature verification in Node.js
const crypto = require('crypto');`}
                        language="javascript"
                        showLineNumbers={true}
                        className="bg-zinc-950"
                        fileName="verify-signature.js"
                        caption="Webhook signature verification example"
                      />
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