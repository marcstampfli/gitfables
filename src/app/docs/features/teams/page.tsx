/**
 * @module app/docs/features/teams/page
 * @description Teams feature documentation
 */

import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'
import { PageHeader } from '@/components/marketing/page-header'
import { ArrowRight, Users, Settings, FileText, GitBranch, MessageSquare, Activity } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Teams - GitFables Documentation',
  description: 'Learn how to manage teams and collaborate effectively with GitFables.'
}

const nextSteps = [
  {
    icon: Settings,
    title: 'Integrations',
    description: 'Set up team integrations.',
    href: '/docs/features/integrations'
  },
  {
    icon: FileText,
    title: 'Templates',
    description: 'Create team templates.',
    href: '/docs/features/templates'
  },
  {
    icon: GitBranch,
    title: 'Repositories',
    description: 'Configure repository access.',
    href: '/docs/features/repositories'
  }
]

const teamRoles = [
  {
    role: 'Owner',
    description: 'Full administrative access',
    icon: Users
  },
  {
    role: 'Admin',
    description: 'Manage team settings and members',
    icon: Settings
  },
  {
    role: 'Editor',
    description: 'Create and edit stories',
    icon: FileText
  },
  {
    role: 'Viewer',
    description: 'Read-only access',
    icon: Activity
  }
]

export default function TeamsPage() {
  return (
    <DocLayout>
      <div className="relative">
        <PageHeader
          title="Team Management"
          titleGradient="Teams"
          description="Learn how to manage teams and collaborate effectively with GitFables."
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
                    <h2 className="text-2xl font-bold tracking-tight">Team Features</h2>
                    <p className="text-muted-foreground text-lg">
                      GitFables provides comprehensive team management features.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Role-based access control</li>
                        <li>Team workspaces</li>
                        <li>Shared templates</li>
                        <li>Collaboration tools</li>
                        <li>Activity tracking</li>
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
                    <h2 className="text-2xl font-bold tracking-tight">Team Roles</h2>
                    <p className="text-muted-foreground text-lg">
                      Available team roles and their permissions.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {teamRoles.map((role) => (
                        <div key={role.role} className="bg-background border rounded-lg p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                              <role.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm mb-1">{role.role}</h3>
                              <p className="text-sm text-muted-foreground">
                                {role.description}
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
                    <h2 className="text-2xl font-bold tracking-tight">Team Setup</h2>
                    <p className="text-muted-foreground text-lg">
                      Setting up a new team is quick and easy.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <ol className="list-decimal list-inside space-y-3 text-sm">
                        <li>Go to Team Settings</li>
                        <li>Click &quot;Create New Team&quot;</li>
                        <li>Configure team settings</li>
                        <li>Invite team members</li>
                      </ol>
                      <div className="mt-4 bg-muted rounded-md p-4 font-mono text-sm">
                        {`{
  "name": "Engineering Team",
  "visibility": "private",
  "domains": ["company.com"],
  "settings": {
    "defaultRole": "viewer",
    "requireApproval": true,
    "allowedRepositories": ["org/*"]
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
                    <span className="text-primary font-semibold">4</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Collaboration Features</h2>
                    <p className="text-muted-foreground text-lg">
                      Work together effectively with built-in collaboration tools.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-background border rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm mb-1">Content</h3>
                            <ul className="list-disc list-inside space-y-2 text-sm">
                              <li>Shared story templates</li>
                              <li>Version history</li>
                              <li>Story approvals</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="bg-background border rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                            <MessageSquare className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm mb-1">Communication</h3>
                            <ul className="list-disc list-inside space-y-2 text-sm">
                              <li>Team comments</li>
                              <li>Review system</li>
                              <li>Team analytics</li>
                            </ul>
                          </div>
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
                      Follow these tips for effective team collaboration.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <ul className="list-disc list-inside space-y-3 text-sm">
                        <li>Define clear roles and responsibilities</li>
                        <li>Use team templates for consistency</li>
                        <li>Implement review processes</li>
                        <li>Maintain documentation</li>
                        <li>Regular team sync-ups</li>
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
                Explore these resources to enhance your team collaboration.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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