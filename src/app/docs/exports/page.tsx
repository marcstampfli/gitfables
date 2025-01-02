import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'

export const metadata: Metadata = {
  title: 'Exports - Documentation',
  description: 'Learn about exporting data and configurations in our system.',
}

export default function ExportsDoc() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert">
        <h1>Exports</h1>
        <p>
          Learn how to export your data and configurations from the system.
        </p>
        
        {/* Main content sections would go here */}
        
      </div>
    </DocLayout>
  )
}
