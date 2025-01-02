import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'

export const metadata: Metadata = {
  title: 'AI Configuration - Coderabbit Documentation',
  description: 'Learn how to configure AI settings and behaviors in Coderabbit'
}

export default function AIConfigDoc() {
  return (
    <DocLayout>
      <div className="container">
        <div className="prose">
          <h1>AI Configuration</h1>
          <p>
            Learn how to customize and configure AI behavior in Coderabbit to match your project needs.
          </p>
          
          {/* Main content sections would go here */}
          <section>
            <h2>Configuration Options</h2>
            <p>Configure how the AI analyzes and responds to your code.</p>
          </section>

          <section>
            <h2>Example Settings</h2>
            <p>Common configuration patterns and their use cases.</p>
          </section>
        </div>
      </div>
    </DocLayout>
  )
}