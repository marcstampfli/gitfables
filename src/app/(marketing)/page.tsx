/**
 * @module app/(marketing)/page
 * @description Homepage with enhanced sections and features
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github, Star, GitBranch, GitCommit, Share2 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-background" />
        <div className="container relative">
          <div className="flex flex-col items-center text-center space-y-8 max-w-[800px] mx-auto">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold bg-muted">
              🚀 Transforming Git History into Stories
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Your Code Has a
              <br />
              <span className="relative">
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 blur-2xl opacity-25" />
                <span className="relative bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Story to Tell
                </span>
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px]">
              GitFables uses AI to transform your repository&apos;s commit history into engaging, shareable stories that showcase your development journey.
            </p>
            <div className="flex items-center gap-4">
              <Button size="lg" asChild>
                <Link href="/login">
                  Start Your Story <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/features">See Examples</Link>
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                <span>10k+ Repos</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                <span>50k+ Stories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Everything You Need to Tell Your Story
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features to transform your Git history into compelling narratives
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Smart Commit Analysis',
                description: 'AI-powered analysis of your commits to identify key developments and milestones',
                icon: GitCommit
              },
              {
                title: 'Story Generation',
                description: 'Transform technical changes into engaging narratives that anyone can understand',
                icon: Star
              },
              {
                title: 'Branch Visualization',
                description: 'Beautiful visual representations of your development branches and merges',
                icon: GitBranch
              },
              {
                title: 'Custom Templates',
                description: 'Choose from various story templates or create your own to match your style',
                icon: Share2
              },
              {
                title: 'Team Collaboration',
                description: 'Work together with your team to create and edit development stories',
                icon: Github
              },
              {
                title: 'Export & Share',
                description: 'Export your stories in multiple formats and share them anywhere',
                icon: Share2
              }
            ].map((feature) => (
              <div key={feature.title} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 transition-all group-hover:opacity-100" />
                <div className="relative bg-card rounded-xl border p-8 h-full">
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              How GitFables Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Three simple steps to transform your repository into an engaging story
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-[1000px] mx-auto">
            {[
              {
                step: '01',
                title: 'Connect Repository',
                description: 'Link your GitHub repository with a single click'
              },
              {
                step: '02',
                title: 'Generate Story',
                description: 'Our AI analyzes your commits and creates a narrative'
              },
              {
                step: '03',
                title: 'Share & Showcase',
                description: 'Publish and share your story with the world'
              }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-primary/20 text-8xl font-bold absolute -top-8 -left-4">
                  {item.step}
                </div>
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Loved by Developers
            </h2>
            <p className="text-lg text-muted-foreground">
              See what others are saying about GitFables
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {[
              {
                quote: "GitFables has transformed how we showcase our development process to stakeholders.",
                author: "Sarah Chen",
                role: "Lead Developer"
              },
              {
                quote: "The AI-generated stories are surprisingly accurate and engaging. It's like having a technical writer on the team.",
                author: "Michael Rodriguez",
                role: "Open Source Maintainer"
              },
              {
                quote: "Perfect for documenting our development journey and sharing progress with non-technical team members.",
                author: "Emma Thompson",
                role: "Product Manager"
              }
            ].map((testimonial) => (
              <div key={testimonial.author} className="bg-card rounded-xl border p-8">
                <p className="text-lg mb-6">{testimonial.quote}</p>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-purple-600/90" />
            <div className="relative py-16 px-8 text-center text-white">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Ready to Tell Your Story?
              </h2>
              <p className="text-lg opacity-90 max-w-[600px] mx-auto mb-8">
                Join thousands of developers who are already sharing their development journey with GitFables.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/login">
                  Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 