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
      <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-background">
        <h1 className="text-4xl font-bold text-center">GitFables</h1>
      </div>
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