/**
 * @module app/(marketing)/about/page
 * @description About page showcasing the story and mission of GitFables
 */

import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Code2, Github, Star, Users, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from '@/components/marketing/page-header'
import { cn } from '@/lib/utils'
import { createServerClient } from '@/lib/supabase/server'
import { logError } from '@/lib/utils/logger'

const values = [
  {
    icon: Code2,
    title: 'Developer First',
    description: 'Built by developers, for developers. We understand your workflow and what makes a great development story.'
  },
  {
    icon: Heart,
    title: 'Open Source Spirit',
    description: 'We believe in the power of open source and giving back to the community that inspires us.'
  },
  {
    icon: Sparkles,
    title: 'AI Innovation',
    description: 'Leveraging cutting-edge AI to transform technical data into engaging, human-readable stories.'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Your feedback shapes our product. We actively listen and evolve based on community needs.'
  }
]

const milestones = [
  {
    year: '2023',
    title: 'The Beginning',
    description: 'GitFables was born from a simple idea: make Git history more accessible and engaging.'
  },
  {
    year: '2024',
    title: 'Public Launch',
    description: 'After months of development and testing, we launched GitFables to the public.'
  },
  {
    year: 'Next',
    title: 'The Future',
    description: 'Continuing to innovate and expand our features based on developer needs.'
  }
]

async function getMarketingStats() {
  try {
    const supabase = await createServerClient()

    const [userCount, storyCount, shareCount] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact', head: true }),
      supabase.from('stories').select('id', { count: 'exact', head: true }),
      supabase.from('story_shares').select('id', { count: 'exact', head: true })
    ])

    if (userCount.error) throw userCount.error
    if (storyCount.error) throw storyCount.error
    if (shareCount.error) throw shareCount.error

    return {
      users: userCount.count ?? 0,
      stories: storyCount.count ?? 0,
      shares: shareCount.count ?? 0
    }
  } catch (error) {
    logError('Failed to fetch marketing stats', { context: 'marketing:stats', error })
    return {
      users: 0,
      stories: 0,
      shares: 0
    }
  }
}

export default async function AboutPage() {
  const stats = await getMarketingStats()

  const formattedStats = [
    { 
      label: 'Active Users', 
      value: stats.users > 1000 
        ? `${Math.floor(stats.users / 1000)}k+` 
        : `${stats.users}+` 
    },
    { 
      label: 'Stories Generated', 
      value: stats.stories > 1000 
        ? `${Math.floor(stats.stories / 1000)}k+` 
        : `${stats.stories}+` 
    },
    { 
      label: 'Stories Shared', 
      value: stats.shares > 1000 
        ? `${Math.floor(stats.shares / 1000)}k+` 
        : `${stats.shares}+` 
    },
    { 
      label: 'Team Members', 
      value: '4' 
    }
  ]

  return (
    <div className="relative">
      <PageHeader
        title="Our Story"
        titleGradient="Story"
        description="Transforming technical achievements into engaging narratives, one commit at a time."
      />

      {/* Mission Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-8">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Our Mission</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              Making Development Stories{' '}
              <span className="text-primary">More Human</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We believe every line of code tells a story. GitFables transforms your technical achievements into engaging narratives that everyone can understand and appreciate. Our mission is to bridge the gap between developers and stakeholders through the power of storytelling.
            </p>
            <div className="grid gap-4 md:grid-cols-4">
              {formattedStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide us in building GitFables.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value) => (
              <div 
                key={value.title}
                className="group relative bg-background hover:bg-muted/50 border rounded-xl p-6 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-primary/5 rounded-lg">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-muted-foreground">
                The story of how GitFables came to be.
              </p>
            </div>

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <div 
                  key={milestone.year}
                  className={cn(
                    "relative pl-12 before:absolute before:left-[7px] before:top-10 before:h-full before:w-[2px]",
                    i === milestones.length - 1 ? "before:hidden" : "before:bg-primary/20"
                  )}
                >
                  <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-primary/10 ring-2 ring-primary" />
                  <div className="text-sm font-medium text-primary mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-[600px] mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Join Our Journey
            </h2>
            <p className="text-lg text-muted-foreground">
              Be part of our story and start transforming your Git history into engaging narratives.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" variant="outline" asChild>
                <Link href="https://github.com/gitfables">
                  <Github className="mr-2 h-4 w-4" />
                  Star on GitHub
                </Link>
              </Button>
              <Button size="lg" asChild>
                <Link href="/login">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 