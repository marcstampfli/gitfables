import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'

export const metadata: Metadata = {
  title: 'Templates - Documentation',
  description: 'Learn how to use templates in our framework',
}

export default function TemplatesDoc() {
  return (
    <DocLayout>
      <div className="container">
        <div className="prose">
          <h1>Templates</h1>
          <p>Learn how to use our template system to quickly scaffold your projects.</p>
          
          {/* Main content sections will go here */}
          <section>
            <h2>Getting Started with Templates</h2>
            {/* Template content */}
          </section>
          
          <section>
            <h2>Available Templates</h2>
            {/* Template list content */}
          </section>
        </div>
      </div>
    </DocLayout>
  )
}