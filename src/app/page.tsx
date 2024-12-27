/**
 * @module app/page
 * @description Main page component for story generation and viewing
 */

'use client'

import { useState } from 'react'
import { StoryGenerator } from '@/components/story-generator'
import { StoryViewer } from '@/components/story-viewer'
import { type Story } from '@/lib/story'

export default function HomePage() {
  const [story, setStory] = useState<Story | null>(null)

  const onStoryGenerated = (generatedStory: Story) => {
    setStory(generatedStory)
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-4xl font-bold text-center">RepoTales</h1>
      <p className="text-center text-muted-foreground">
        Transform your GitHub repository into an engaging story
      </p>
      {story ? (
        <StoryViewer story={story} />
      ) : (
        <StoryGenerator onStoryGenerated={onStoryGenerated} />
      )}
    </div>
  )
} 