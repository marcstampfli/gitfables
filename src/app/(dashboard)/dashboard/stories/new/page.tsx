/**
 * @module app/stories/new/page
 * @description Create new story page
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createServerClient } from '@/lib/supabase/server'
import { GitBranch, ArrowLeft, Wand2, GitFork } from 'lucide-react'

async function getRepositories() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data: repositories } = await supabase
    .from('repositories')
    .select('*')
    .eq('user_id', user.id)
    .order('name', { ascending: true })

  return repositories || []
}

export default async function NewStoryPage() {
  const repositories = await getRepositories()

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/stories" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Create Story</h1>
          </div>
          <p className="text-muted-foreground">
            Transform your code history into an engaging narrative
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6">
        {/* Repository Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <GitFork className="h-5 w-5 text-primary" />
              Select Repository
            </CardTitle>
            <CardDescription>
              Choose the repository you want to create a story from
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {repositories.length > 0 ? (
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a repository" />
                </SelectTrigger>
                <SelectContent>
                  {repositories.map((repo) => (
                    <SelectItem key={repo.id} value={repo.id}>
                      <div className="flex items-center gap-2">
                        <GitBranch className="h-4 w-4" />
                        <span>{repo.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground mb-4">
                  No repositories connected. Connect a repository first to create a story.
                </p>
                <Button asChild variant="outline">
                  <Link href="/dashboard/repositories/new">
                    Connect Repository
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Story Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wand2 className="h-5 w-5 text-primary" />
              Story Details
            </CardTitle>
            <CardDescription>
              Configure how your story will be generated
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter story title"
                  className="max-w-xl"
                />
                <p className="text-sm text-muted-foreground">
                  A descriptive title for your story
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter story description"
                  className="max-w-xl resize-none"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  A brief description of what this story is about
                </p>
              </div>

              <div className="space-y-2">
                <Label>Time Range</Label>
                <div className="grid gap-4 sm:grid-cols-2 max-w-xl">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-xs text-muted-foreground">Start Date</Label>
                    <Input
                      type="date"
                      id="startDate"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-xs text-muted-foreground">End Date</Label>
                    <Input
                      type="date"
                      id="endDate"
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Optional: Select a date range to focus on specific commits
                </p>
              </div>

              <div className="space-y-2">
                <Label>Story Type</Label>
                <Select defaultValue="technical">
                  <SelectTrigger className="max-w-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Documentation</SelectItem>
                    <SelectItem value="narrative">Narrative Story</SelectItem>
                    <SelectItem value="changelog">Changelog</SelectItem>
                    <SelectItem value="release-notes">Release Notes</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose how you want your story to be presented
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard/stories">
              Cancel
            </Link>
          </Button>
          <Button>
            <Wand2 className="mr-2 h-4 w-4" />
            Generate Story
          </Button>
        </div>
      </div>
    </div>
  )
} 