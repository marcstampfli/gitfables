/**
 * @module app/docs/features/repositories/page
 * @description Repository analysis feature documentation
 */

import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'
import { PageHeader } from '@/components/marketing/page-header'
import { ArrowRight, GitBranch, GitCommit, GitPullRequest, Settings, Terminal, BarChart } from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'

export const metadata: Metadata = {
  title: 'Repository Analysis - GitFables Documentation',
  description: 'Learn how GitFables analyzes and processes your Git repositories.'
}

const providers = [
  {
    name: 'GitHub',
    description: 'Including Enterprise',
    icon: GitBranch
  },
  {
    name: 'GitLab',
    description: 'Including self-hosted',
    icon: GitBranch
  },
  {
    name: 'Bitbucket',
    description: 'Cloud and Server',
    icon: GitBranch
  },
  {
    name: 'Azure DevOps',
    description: 'Cloud and Server',
    icon: GitBranch
  }
]

const analysisFeatures = [
  {
    title: 'Commit Analysis',
    description: 'Patterns and frequency',
    icon: GitCommit
  },
  {
    title: 'Code Metrics',
    description: 'Complexity trends',
    icon: BarChart
  },
  {
    title: 'Team Insights',
    description: 'Collaboration metrics',
    icon: GitPullRequest
  },
  {
    title: 'Performance',
    description: 'Development velocity',
    icon: Settings
  }
]

export default function RepositoriesPage() {
  return (
    <DocLayout>
      <div className="relative">
        <PageHeader
          title="Repository Analysis"
          titleGradient="Analysis"
          description="Learn how GitFables analyzes and processes your Git repositories."
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
                    <h2 className="text-2xl font-bold tracking-tight">Supported Providers</h2>
                    <p className="text-muted-foreground text-lg">
                      GitFables supports repositories from major Git providers.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {providers.map((provider) => (
                        <div key={provider.name} className="bg-background border rounded-lg p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                              <provider.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm mb-1">{provider.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {provider.description}
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
                    <h2 className="text-2xl font-bold tracking-tight">Analysis Process</h2>
                    <p className="text-muted-foreground text-lg">
                      GitFables follows a comprehensive analysis process.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <ol className="list-decimal list-inside space-y-3 text-sm">
                        <li>Clones or fetches the repository</li>
                        <li>Analyzes commit history and patterns</li>
                        <li>Processes branch structures</li>
                        <li>Examines code changes and diffs</li>
                        <li>Identifies key contributors</li>
                        <li>Maps development timelines</li>
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
                    <h2 className="text-2xl font-bold tracking-tight">Repository Settings</h2>
                    <p className="text-muted-foreground text-lg">
                      Configure how GitFables analyzes your repository.
                    </p>
                    <CodeBlock
                      language="json"
                      fileName="gitfables.config.json"
                      caption="Configuration file for repository analysis"
                      code={`{
  "analysis": {
    "depth": "full", // or "shallow"
    "includeBranches": ["main", "develop", "feature/*"],
    "excludeBranches": ["temp/*", "wip/*"],
    "ignorePatterns": [
      "node_modules",
      "dist",
      "*.log"
    ],
    "focusAreas": {
      "paths": ["src/", "docs/"],
      "authors": ["alice", "bob"],
      "timeframe": {
        "start": "2024-01-01",
        "end": "2024-02-01"
      }
    }
  }`}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">4</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Analysis Features</h2>
                    <p className="text-muted-foreground text-lg">
                      GitFables provides detailed insights into your repository.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {analysisFeatures.map((feature) => (
                        <div key={feature.title} className="bg-background border rounded-lg p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                              <feature.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
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
                    <span className="text-primary font-semibold">5</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Repository Management</h2>
                    <p className="text-muted-foreground text-lg">
                      Manage your repositories through multiple interfaces.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-background border rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                            <Settings className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm mb-1">Web Interface</h3>
                            <ul className="list-disc list-inside space-y-2 text-sm">
                              <li>Web dashboard</li>
                              <li>Visual analytics</li>
                              <li>Team management</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="bg-background border rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                            <Terminal className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm mb-1">Developer Tools</h3>
                            <ul className="list-disc list-inside space-y-2 text-sm">
                              <li>CLI commands</li>
                              <li>API endpoints</li>
                              <li>CI/CD integrations</li>
                            </ul>
                          </div>
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