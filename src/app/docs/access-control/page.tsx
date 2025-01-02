import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'

export const metadata: Metadata = {
  title: 'Access Control - Documentation',
  description: 'Learn about access control and permissions management in our system.'
}

export default function AccessControlDoc() {
  return (
    <DocLayout>
      <div className="container">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Access Control</h1>
          
          <p>
            Learn how to manage permissions and access control in your application.
          </p>

          {/* Main content sections */}
          <section>
            <h2>Overview</h2>
            <p>
              Our access control system provides fine-grained permissions management
              for your application&apos;s resources and features.
            </p>
          </section>

          <section>
            <h2>Getting Started with Access Control</h2>
            <p>
              Configure basic permissions and roles for your application.
            </p>
          </section>
        </div>
      </div>
    </DocLayout>
  )
}