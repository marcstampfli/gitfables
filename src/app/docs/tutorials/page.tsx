import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'

export const metadata: Metadata = {
  title: 'Tutorials | Documentation',
  description: 'Step-by-step tutorials and guides for using our platform.',
}

export default function TutorialsPage() {
  return (
    <DocLayout>
      <div className="container">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Tutorials</h1>
          <p>
            Learn how to make the most of our platform with these step-by-step tutorials.
          </p>
          
          {/* Tutorial sections can be added here */}
          <section>
            <h2>Getting Started Tutorials</h2>
            <p>Basic tutorials to help you get up and running quickly.</p>
          </section>

          <section>
            <h2>Advanced Tutorials</h2>
            <p>Detailed guides for more complex use cases and features.</p>
          </section>
        </div>
      </div>
    </DocLayout>
  )
}