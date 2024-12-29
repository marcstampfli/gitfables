/**
 * @module app/stories/new/page
 * @description Story generator page for creating new stories from repositories
 */

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GitBranch, Settings, Wand2 } from 'lucide-react'
import Link from 'next/link'

const repositories = [
  {
    name: 'my-saas-app',
    description: 'A SaaS application built with Next.js and Supabase',
    lastUpdated: 'March 15, 2024'
  },
  {
    name: 'portfolio-website',
    description: 'My personal portfolio website built with React',
    lastUpdated: 'March 10, 2024'
  }
]

export default function NewStoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {/* Hero */}
        <section className="relative py-20">
          <div className="container relative">
            <div className="max-w-[800px] mx-auto space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Create a New Story
                </h1>
                <p className="text-lg text-muted-foreground">
                  Transform your repository&apos;s commit history into an engaging narrative
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Repository Selection */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <div className="max-w-[800px] mx-auto space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Select Repository</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/repositories">
                    Connect New Repository
                    <GitBranch className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4">
                {repositories.map((repo) => (
                  <label
                    key={repo.name}
                    className="relative flex items-start p-6 bg-card border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="repository"
                      value={repo.name}
                      className="peer sr-only"
                    />
                    <div className="flex items-center h-5">
                      <div className="w-4 h-4 border-2 rounded-full peer-checked:bg-primary peer-checked:border-primary" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">
                          {repo.name}
                        </h3>
                      </div>
                      <p className="mt-1 text-muted-foreground">
                        {repo.description}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Last updated {repo.lastUpdated}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Story Options */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-[800px] mx-auto space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Story Options</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/settings/story-preferences">
                    <Settings className="mr-2 h-4 w-4" />
                    Story Preferences
                  </Link>
                </Button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Story Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a title for your story"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Add a brief description of what this story is about"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Time Range
                  </label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      type="date"
                      name="startDate"
                      placeholder="Start date"
                    />
                    <Input
                      type="date"
                      name="endDate"
                      placeholder="End date"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Optional: Select a date range to focus on specific commits
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <div className="max-w-[800px] mx-auto flex justify-end gap-4">
              <Button variant="outline" size="lg" asChild>
                <Link href="/dashboard">
                  Cancel
                </Link>
              </Button>
              <Button size="lg">
                Generate Story
                <Wand2 className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 