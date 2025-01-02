import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'

export const metadata: Metadata = {
  title: 'Teams Documentation',
  description: 'Learn how to manage and collaborate with teams in our platform',
}

export default function TeamsDoc() {
  return (
    <DocLayout>
      <div className="container">
        <div className="prose dark:prose-invert">
          <h1>Teams</h1>
          <p>
            Learn how to work with teams and manage team collaboration in our platform.
          </p>
          
          <h2>Managing Teams</h2>
          <p>
            Discover how to create, edit, and manage your teams effectively.
          </p>

          <h2>Team Permissions</h2>
          <p>
            Understanding team roles and permission management.
          </p>

          <h2>Team Collaboration</h2>
          <p>
            Best practices for collaborating with team members.
          </p>
        </div>
      </div>
    </DocLayout>
  )
}