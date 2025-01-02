/**
 * @module app/docs/getting-started/configuration/page
 * @description Configuration guide for GitFables
 */

import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'
import { PageHeader } from '@/components/marketing/page-header'
import { ArrowRight, GitBranch, Terminal, Settings, FileText } from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'

export const metadata: Metadata = {
  title: 'Configuration - GitFables Documentation',
  description: 'Learn how to configure GitFables for your needs.'
}

const nextSteps = [
  {
    icon: Terminal,
    title: 'CLI Reference',
    description: 'Learn about CLI commands and options.',
    href: '/docs/cli'
  },
  {
    icon: Settings,
    title: 'Advanced Config',
    description: 'Explore advanced configuration options.',
    href: '/docs/configuration/advanced'
  },
  {
    icon: GitBranch,
    title: 'Story Generation',
    description: 'Configure story generation settings.',
    href: '/docs/features/story-generation'
  },
  {
    icon: FileText,
    title: 'Templates',
    description: 'Customize story templates.',
    href: '/docs/features/templates'
  }
]

export default function ConfigurationPage() {
  return (
    <DocLayout>
      <div className="relative">
        <PageHeader
          title="Configuration Guide"
          titleGradient="Configuration"
          description="Configure GitFables to match your workflow."
        />

        {/* Configuration Steps */}
        <section className="py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">1</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Basic Configuration</h2>
                    <p className="text-muted-foreground text-lg">
                      Set up your basic GitFables configuration.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <p className="text-sm">Create a <code className="text-primary">gitfables.config.js</code> file in your project root:</p>
                      <CodeBlock
                        code={`module.exports = {
  projectName: 'My Project',
  repository: {
    provider: 'github',
    url: 'https://github.com/username/repo'
  },
  defaultBranch: 'main',
  storyFormat: 'markdown'
}`}
                        language="javascript"
                        showLineNumbers={true}
                        className="bg-zinc-950"
                        fileName="gitfables.config.js"
                        caption="Basic GitFables configuration file"
                      />
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
                    <h2 className="text-2xl font-bold tracking-tight">Environment Variables</h2>
                    <p className="text-muted-foreground text-lg">
                      Configure environment-specific settings.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <p className="text-sm">Add these variables to your <code className="text-primary">.env</code> file:</p>
                      <CodeBlock
                        code={`GITFABLES_API_KEY=your_api_key_here
GITFABLES_ENVIRONMENT=development
GITFABLES_LOG_LEVEL=debug`}
                        language="bash"
                        showLineNumbers={true}
                        className="bg-zinc-950"
                        fileName=".env"
                        caption="Environment variables configuration"
                      />
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
                    <h2 className="text-2xl font-bold tracking-tight">Story Templates</h2>
                    <p className="text-muted-foreground text-lg">
                      Configure your story generation templates.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <p className="text-sm">Create a <code className="text-primary">templates</code> directory with your custom templates:</p>
                      <CodeBlock
                        code={`templates/
├── commit-story.md
├── release-notes.md
└── weekly-summary.md`}
                        language="bash"
                        showLineNumbers={true}
                        className="bg-zinc-950"
                        fileName="project-structure"
                        caption="Template directory structure"
                      />
                      <p className="text-sm text-muted-foreground mt-4">
                        Templates support variables and custom formatting options.
                      </p>
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
                    <h2 className="text-2xl font-bold tracking-tight">Advanced Settings</h2>
                    <p className="text-muted-foreground text-lg">
                      Fine-tune GitFables behavior.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <CodeBlock
                        code={`{
  "ai": {
    "model": "gpt-4",
    "temperature": 0.7,
    "maxTokens": 2048
}`}
                        language="json"
                        showLineNumbers={true}
                        className="bg-zinc-950"
                        fileName="advanced-settings.json"
                        caption="Advanced AI configuration settings"
                      />
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
                Explore these resources to customize GitFables further.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
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