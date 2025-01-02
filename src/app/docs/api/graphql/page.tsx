/**
 * @module app/docs/api/graphql/page
 * @description GraphQL API documentation page
 */

import { Metadata } from 'next'
import { DocLayout } from '@/components/docs/doc-layout'
import { PageHeader } from '@/components/marketing/page-header'
import { ArrowRight, Book, Code, Lock, Database } from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from '@/components/docs/code-block'

export const metadata: Metadata = {
  title: 'GraphQL API - GitFables Documentation',
  description: 'Learn how to use the GitFables GraphQL API for flexible and efficient data querying.'
}

const schemaTypes = [
  {
    name: 'Story',
    description: 'Represents a generated story',
    fields: ['id', 'title', 'content', 'createdAt', 'repository']
  },
  {
    name: 'Repository',
    description: 'Information about a Git repository',
    fields: ['id', 'name', 'url', 'defaultBranch', 'stories']
  },
  {
    name: 'Template',
    description: 'Story generation templates',
    fields: ['id', 'name', 'description', 'format', 'variables']
  },
  {
    name: 'User',
    description: 'User account information',
    fields: ['id', 'email', 'name', 'repositories', 'stories']
  }
]

export default function GraphQLApiPage() {
  return (
    <DocLayout>
      <div className="relative">
        <PageHeader
          title="GraphQL API"
          titleGradient="GraphQL"
          description="Learn how to use our GraphQL API for flexible and efficient data querying."
        />

        {/* Main Content */}
        <section className="py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">1</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
                    <p className="text-muted-foreground text-lg">
                      Our GraphQL API provides a flexible way to query exactly the data you need.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <p className="text-sm">
                        Benefits of using our GraphQL API:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Request exactly the data you need</li>
                        <li>Reduce over-fetching and under-fetching</li>
                        <li>Single endpoint for all operations</li>
                        <li>Strong typing and schema validation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">2</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Authentication</h2>
                    <p className="text-muted-foreground text-lg">
                      All GraphQL requests require authentication using an API key.
                    </p>
                    <div className="bg-background border rounded-lg p-6 space-y-4">
                      <p className="text-sm">Add your API key to the Authorization header:</p>
                      <CodeBlock
                        language="bash"
                        fileName="Authorization Header"
                        caption="API Authentication Example"
                        code="Authorization: Bearer your-api-key"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">3</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Example Queries</h2>
                    <p className="text-muted-foreground text-lg">
                      Common GraphQL queries and mutations.
                    </p>
                    <div className="space-y-6">
                      <div className="bg-background border rounded-lg p-6 space-y-4">
                        <h3 className="font-semibold">Fetch Stories</h3>
                        <CodeBlock
                          code={`query {
  stories {
    id
    title
    content
    createdAt
    repository {
      name
      url
    }
  }
}`}
                          language="graphql"
                          showLineNumbers={true}
                          className="bg-zinc-950"
                          fileName="stories-query.graphql"
                          caption="GraphQL query to fetch all stories"
                        />
                      </div>

                      <div className="bg-background border rounded-lg p-6 space-y-4">
                        <h3 className="font-semibold">Generate Story</h3>
                        <CodeBlock
                          code={`mutation {
  generateStory(input: {
    repositoryUrl: "https://github.com/user/repo"
    templateId: "template-id"
  }) {
    id
    title
    content
  }
}`}
                          language="graphql"
                          showLineNumbers={true}
                          className="bg-zinc-950"
                          fileName="generate-story-mutation.graphql"
                          caption="GraphQL mutation to generate a new story"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">4</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Schema</h2>
                    <p className="text-muted-foreground text-lg">
                      Explore our self-documenting GraphQL schema.
                    </p>
                    <div className="grid gap-4">
                      {schemaTypes.map((type) => (
                        <div key={type.name} className="bg-background border rounded-lg p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                              <Database className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-2">
                                <code className="text-primary">{type.name}</code>
                              </h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                {type.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {type.fields.map((field) => (
                                  <span key={field} className="inline-block px-2 py-1 text-xs bg-muted rounded">
                                    {field}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DocLayout>
  )
}