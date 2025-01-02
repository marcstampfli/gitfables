/**
 * @module app/docs/getting-started/installation/page
 * @description Installation guide for GitFables
 */

import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'
import { PageHeader } from '@/components/marketing/page-header'
import { ArrowRight, GitBranch, Terminal, Settings, FileText } from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'

export const metadata: Metadata = {
  title: 'Installation - GitFables Documentation',
  description: 'Learn how to install and set up GitFables.'
}

const nextSteps = [
  {
    icon: Terminal,
    title: 'CLI Setup',
    description: 'Set up the GitFables CLI for local development.',
    href: '/docs/cli'
  },
  {
    icon: Settings,
    title: 'Configuration',
    description: 'Configure GitFables for your needs.',
    href: '/docs/configuration'
  },
  {
    icon: GitBranch,
    title: 'Quick Start',
    description: 'Jump into creating your first story.',
    href: '/docs/getting-started/quick-start'
  },
  {
    icon: FileText,
    title: 'API Setup',
    description: 'Set up API access for automation.',
    href: '/docs/api/rest'
  }
]

export default function InstallationPage() {
  return (
    <DocLayout>
      <div className="relative">
        <PageHeader
          title="Installation Guide"
          titleGradient="Installation"
          description="Get GitFables set up on your system."
        />

        {/* Installation Steps */}
        <section className="py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">1</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">System Requirements</h2>
                    <p className="text-muted-foreground text-lg">
                      Ensure your system meets these requirements before installation.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <ul className="list-disc list-inside space-y-3 text-sm">
                        <li>Node.js 18.0.0 or higher</li>
                        <li>Git 2.20.0 or higher</li>
                        <li>npm 7.0.0 or higher (or equivalent package manager)</li>
                        <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
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
                    <h2 className="text-2xl font-bold tracking-tight">Install GitFables CLI</h2>
                    <p className="text-muted-foreground text-lg">
                      Install the GitFables CLI tool globally on your system.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <CodeBlock
                        code="npm install -g @gitfables/cli"
                        language="bash"
                        showLineNumbers={true}
                        className="bg-zinc-950"
                        fileName="terminal"
                        caption="Install GitFables CLI with npm"
                      />
                      <p className="text-sm text-muted-foreground">
                        Or if you prefer yarn:
                      </p>
                      <CodeBlock
                        code="yarn global add @gitfables/cli"
                        language="bash"
                        showLineNumbers={true}
                        className="bg-zinc-950"
                        fileName="terminal"
                        caption="Install GitFables CLI with yarn"
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
                    <h2 className="text-2xl font-bold tracking-tight">Configure Your Environment</h2>
                    <p className="text-muted-foreground text-lg">
                      Set up your environment variables and authentication.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <ol className="list-decimal list-inside space-y-3 text-sm">
                        <li>Create a <code className="text-primary">.env</code> file in your project root</li>
                        <li>Add your GitFables API key:
                          <CodeBlock
                            code="GITFABLES_API_KEY=your_api_key_here"
                            language="bash"
                            showLineNumbers={true}
                            className="bg-zinc-950"
                            fileName=".env"
                            caption="Environment variables configuration"
                          />
                        </li>
                        <li>Configure Git credentials if needed</li>
                      </ol>
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
                    <h2 className="text-2xl font-bold tracking-tight">Verify Installation</h2>
                    <p className="text-muted-foreground text-lg">
                      Verify that GitFables is installed correctly.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <CodeBlock
                        code="gitfables --version"
                        language="bash"
                        showLineNumbers={true}
                        className="bg-zinc-950"
                        fileName="terminal"
                        caption="Check GitFables CLI version"
                      />
                      <p className="text-sm text-muted-foreground mt-4">
                        You should see the current version number displayed.
                      </p>
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
                Now that you&apos;ve installed GitFables, here&apos;s what to do next.
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