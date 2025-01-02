import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'

export const metadata: Metadata = {
  title: 'CLI Documentation - Restofire',
  description: 'Learn how to use the Restofire CLI tools and commands',
}

export default function CLIDocumentation() {
  return (
    <DocLayout>
      <div className="container">
        <div className="prose dark:prose-invert max-w-none">
          <h1>CLI Documentation</h1>
          
          <section>
            <h2>Getting Started with the CLI</h2>
            <p>Learn how to use Restofire&apos;s command line interface tools.</p>
          </section>

          <section>
            <h2>Installation</h2>
            <p>Install the Restofire CLI globally using npm:</p>
            <pre><code>npm install -g @restofire/cli</code></pre>
          </section>

          <section>
            <h2>Available Commands</h2>
            {/* Command documentation will go here */}
          </section>
        </div>
      </div>
    </DocLayout>
  )
}