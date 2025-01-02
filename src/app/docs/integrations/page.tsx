import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'

export const metadata: Metadata = {
  title: 'Integrations - Documentation',
  description: 'Learn about integrating with various platforms and services.',
}

export default function IntegrationsDoc() {
  return (
    <DocLayout>
      <div className="container">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Integrations</h1>
          
          <p>
            Learn how to integrate our platform with various services and tools.
          </p>

          <h2>Available Integrations</h2>
          
          <p>
            Explore our supported integrations and learn how to set them up:
          </p>

          {/* Add integration content sections here */}
        </div>
      </div>
    </DocLayout>
  )
}