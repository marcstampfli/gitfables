/**
 * @module app/docs/features/integrations/page
 * @description Integrations feature documentation
 */

import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'
import { PageHeader } from '@/components/marketing/page-header'
import { ArrowRight, GitBranch, MessageSquare, Webhook, Settings, Bell, Trello, Slack } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Integrations - GitFables Documentation',
  description: 'Learn how to integrate GitFables with your existing tools and workflows.'
}

const versionControlTools = [
  {
    name: 'GitHub',
    description: 'Enterprise and Cloud',
    icon: GitBranch
  },
  {
    name: 'GitLab',
    description: 'Self-hosted and Cloud',
    icon: GitBranch
  },
  {
    name: 'Bitbucket',
    description: 'Server and Cloud',
    icon: GitBranch
  },
  {
    name: 'Azure DevOps',
    description: 'Server and Cloud',
    icon: GitBranch
  }
]

const projectTools = [
  {
    name: 'Jira',
    description: 'Issue tracking',
    icon: Trello
  },
  {
    name: 'Trello',
    description: 'Project boards',
    icon: Trello
  },
  {
    name: 'Asana',
    description: 'Task management',
    icon: Trello
  },
  {
    name: 'Linear',
    description: 'Project tracking',
    icon: Trello
  }
]

const communicationTools = [
  {
    name: 'Slack',
    description: 'Team chat',
    icon: Slack
  },
  {
    name: 'Discord',
    description: 'Community chat',
    icon: MessageSquare
  },
  {
    name: 'Microsoft Teams',
    description: 'Team collaboration',
    icon: MessageSquare
  }
]

export default function IntegrationsPage() {
  return (
    <DocLayout>
      <div className="relative">
        <PageHeader
          title="Integrations"
          titleGradient="Integrations"
          description="Learn how to integrate GitFables with your existing tools and workflows."
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
                    <h2 className="text-2xl font-bold tracking-tight">Version Control</h2>
                    <p className="text-muted-foreground text-lg">
                      Connect with your preferred version control system.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {versionControlTools.map((tool) => (
                        <div key={tool.name} className="bg-background border rounded-lg p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                              <tool.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm mb-1">{tool.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {tool.description}
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
                    <span className="text-primary font-semibold">2</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Project Management</h2>
                    <p className="text-muted-foreground text-lg">
                      Integrate with your project management tools.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {projectTools.map((tool) => (
                        <div key={tool.name} className="bg-background border rounded-lg p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                              <tool.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm mb-1">{tool.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {tool.description}
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
                    <h2 className="text-2xl font-bold tracking-tight">Communication</h2>
                    <p className="text-muted-foreground text-lg">
                      Connect with your team communication platforms.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {communicationTools.map((tool) => (
                        <div key={tool.name} className="bg-background border rounded-lg p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                              <tool.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm mb-1">{tool.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {tool.description}
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
                    <h2 className="text-2xl font-bold tracking-tight">Integration Setup</h2>
                    <p className="text-muted-foreground text-lg">
                      Configure your integrations with these settings.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <ol className="list-decimal list-inside space-y-3 text-sm">
                        <li>Go to Integrations in your dashboard</li>
                        <li>Select the service to integrate</li>
                        <li>Authorize GitFables</li>
                        <li>Configure integration settings</li>
                      </ol>
                      <div className="mt-4 bg-muted rounded-md p-4 font-mono text-sm">
                        {`{
  "integration": "github",
  "settings": {
    "repositories": ["org/*"],
    "events": [
      "push",
      "pull_request"
    ],
    "notifications": {
      "slack": "#engineering",
      "email": "team@company.com"
    }
  }
}`}
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
                    <h2 className="text-2xl font-bold tracking-tight">Webhooks</h2>
                    <p className="text-muted-foreground text-lg">
                      Set up webhooks to automate your workflows.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold text-sm mb-2">Event Types</h3>
                          <ul className="list-disc list-inside space-y-2 text-sm">
                            <li>Story generation on push</li>
                            <li>Notifications on updates</li>
                            <li>Analytics reporting</li>
                            <li>Custom event handling</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm mb-2">Features</h3>
                          <ul className="list-disc list-inside space-y-2 text-sm">
                            <li>Secure signatures</li>
                            <li>Retry mechanism</li>
                            <li>Event filtering</li>
                            <li>Custom payloads</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 bg-muted rounded-md p-4 font-mono text-sm">
                        {`POST https://api.gitfables.com/webhooks
Content-Type: application/json
X-GitFables-Signature: sha256=...

{
  "event": "story.generated",
  "repository": "org/repo",
  "story": {
    "id": "story-123",
    "title": "Sprint Review"
  }
}`}
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