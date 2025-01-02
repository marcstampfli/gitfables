/**
 * @module app/docs/getting-started/page
 * @description Getting started documentation page
 */

import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'
import { PageHeader } from '@/components/marketing/page-header'
import { ArrowRight, Rocket, Terminal, Settings, FileText } from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'

export const metadata: Metadata = {
  title: 'Getting Started - GitFables Documentation',
  description: 'Get started with GitFables and learn how to generate stories from your Git repositories.'
}

const quickLinks = [
  {
    icon: Rocket,
    title: 'Quick Start',
    description: 'Get up and running in minutes.',
    href: '/docs/getting-started/quick-start'
  },
  {
    icon: Terminal,
    title: 'Installation',
    description: 'Install and configure GitFables.',
    href: '/docs/getting-started/installation'
  },
  {
    icon: Settings,
    title: 'Configuration',
    description: 'Configure your settings.',
    href: '/docs/getting-started/configuration'
  },
  {
    icon: FileText,
    title: 'Templates',
    description: 'Create story templates.',
    href: '/docs/features/templates'
  }
]

const installCode = `# Install GitFables
npm install -g gitfables-cli

# Generate a story
gitfables story create --repo ./my-project`

const configCode = `{
  "repository": {
    "url": "https://github.com/user/repo",
    "branch": "main"
  },
  "templates": {
    "default": "technical-journey",
    "customPath": "./templates"
  },
  "output": {
    "format": "markdown",
    "directory": "./stories"
  }
}`

const templateCode = `---
name: Technical Journey
description: A technical narrative of your project
variables:
  timeframe:
    start: "2024-01-01"
    end: "2024-02-01"
  focus:
    - architecture
    - performance
    - security
---

# Project Journey: {{ repository.name }}

## Overview
{{ repository.description }}

## Key Milestones
{{ milestones | format_list }}`

export default function GettingStartedPage() {
  return (
    <DocLayout>
      <div className="relative">
        <PageHeader
          title="Getting Started"
          titleGradient="Getting Started"
          description="Get started with GitFables and learn how to generate stories from your Git repositories."
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
                      GitFables helps you generate engaging stories from your Git repositories.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <p className="text-sm">
                        Key features:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Automated story generation from Git history</li>
                        <li>Customizable story templates</li>
                        <li>Team collaboration tools</li>
                        <li>Integration with popular development tools</li>
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
                    <h2 className="text-2xl font-bold tracking-tight">Quick Links</h2>
                    <p className="text-muted-foreground text-lg">
                      Get started quickly with these guides.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {quickLinks.map((link) => (
                        <Link 
                          key={link.title}
                          href={link.href}
                          className="group relative bg-background hover:bg-muted/50 border rounded-xl p-6 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                              <link.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                                {link.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {link.description}
                              </p>
                            </div>
                          </div>
                        </Link>
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
                    <h2 className="text-2xl font-bold tracking-tight">Basic Usage</h2>
                    <p className="text-muted-foreground text-lg">
                      Generate your first story in minutes.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-6">
                      <ol className="list-decimal list-inside space-y-3 text-sm">
                        <li>Install GitFables</li>
                        <li>Connect your repository</li>
                        <li>Choose a story template</li>
                        <li>Generate your first story</li>
                      </ol>
                      
                      <div>
                        <CodeBlock
                          code={installCode}
                          language="bash"
                          showLineNumbers
                          className="bg-zinc-950"
                          fileName="terminal"
                          caption="Install GitFables CLI and create your first story"
                        />
                      </div>

                      <div>
                        <CodeBlock
                          code={configCode}
                          language="json"
                          showLineNumbers
                          className="bg-zinc-950"
                          fileName="gitfables.config.json"
                          caption="Configure your GitFables project settings"
                        />
                      </div>

                      <div>
                        <CodeBlock
                          code={templateCode}
                          language="yaml"
                          showLineNumbers
                          className="bg-zinc-950"
                          fileName="templates/technical-journey.yaml"
                          caption="Create a custom story template"
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
                    <h2 className="text-2xl font-bold tracking-tight">Requirements</h2>
                    <p className="text-muted-foreground text-lg">
                      Make sure you have these prerequisites installed.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <ul className="list-disc list-inside space-y-3 text-sm">
                        <li>Node.js 18 or higher</li>
                        <li>Git 2.0 or higher</li>
                        <li>A GitFables account</li>
                        <li>Access to a Git repository</li>
                      </ul>
                      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                          ⚠️ Some features may require additional dependencies based on your use case.
                        </p>
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
                    <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
                    <p className="text-muted-foreground text-lg">
                      After getting started, explore these advanced topics.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-background border rounded-lg p-6">
                        <h3 className="font-semibold text-sm mb-2">Advanced Features</h3>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                          <li>Custom templates</li>
                          <li>Team collaboration</li>
                          <li>API integration</li>
                          <li>Automated workflows</li>
                        </ul>
                      </div>
                      <div className="bg-background border rounded-lg p-6">
                        <h3 className="font-semibold text-sm mb-2">Resources</h3>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                          <li>API documentation</li>
                          <li>Example projects</li>
                          <li>Community templates</li>
                          <li>Best practices</li>
                        </ul>
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