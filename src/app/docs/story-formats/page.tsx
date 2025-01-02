import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'

export const metadata: Metadata = {
  title: 'Story Formats - Twine Documentation',
  description: 'Learn about story formats in Twine and how they affect your stories.',
}

export default function StoryFormatsDoc() {
  return (
    <DocLayout>
      <div className="container">
        <div className="prose prose-slate max-w-none">
          <h1>Story Formats</h1>
          
          <section>
            <h2>What are Story Formats?</h2>
            <p>
              Story formats are the templates that determine how your Twine story is
              displayed and behaves in a web browser. They control both the appearance
              and functionality of your published story.
            </p>
          </section>

          <section>
            <h2>Built-in Formats</h2>
            <p>
              Twine comes with several built-in story formats, including:
            </p>
            <ul>
              <li>Harlowe (default)</li>
              <li>Sugarcube</li>
              <li>Chapbook</li>
              <li>Snowman</li>
            </ul>
          </section>

          <section>
            <h2>Managing Story Formats</h2>
            <p>
              You can add, remove, and update story formats through Twine's Story
              Format dialog, accessible from the application menu.
            </p>
          </section>
        </div>
      </div>
    </DocLayout>
  )
}