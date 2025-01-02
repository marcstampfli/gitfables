import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'

export const metadata: Metadata = {
  title: 'Configuration - Documentation',
  description: 'Learn how to configure and customize your application settings.'
}

export default function ConfigurationPage() {
  return (
    <DocLayout>
      <div className="prose prose-slate max-w-none">
        <h1>Configuration</h1>
        <p>
          Learn how to configure and customize your application settings to match your needs.
        </p>
        
        {/* Main content sections would go here */}
        <section>
          <h2>Basic Configuration</h2>
          <p>
            Configuration options and how to use them effectively.
          </p>
        </section>

        <section>
          <h2>Advanced Settings</h2>
          <p>
            Detailed information about advanced configuration options.
          </p>
        </section>
      </div>
    </DocLayout>
  )
}