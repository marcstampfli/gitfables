import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'

export const metadata: Metadata = {
  title: 'Shared Templates - Documentation',
  description: 'Learn how to use shared templates to create reusable content across your projects',
}

export default function SharedTemplatesDoc() {
  return (
    <DocLayout>
      <div className="container">
        <div className="prose prose-slate max-w-none">
          <h1>Shared Templates</h1>
          <p>
            Learn how to create and use shared templates to maintain consistent content
            across multiple projects.
          </p>
          
          {/* Main content sections would go here */}
          <section>
            <h2>What are Shared Templates?</h2>
            <p>
              Shared templates allow you to create reusable content structures that can
              be shared across different projects and teams.
            </p>
          </section>
        </div>
      </div>
    </DocLayout>
  )
}
