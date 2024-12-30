/**
 * @module app/(marketing)/page
 * @description Homepage with enhanced sections and features
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, GitBranch, GitCommit, Share2, Sparkles, Github, Users, Zap, BookOpen, Code2 } from 'lucide-react'
import { PageHeader } from '@/components/marketing/page-header'
import { cn } from '@/lib/utils'
import { CTASection } from '@/components/marketing/cta-section'
import { FeaturesGrid } from '@/components/marketing/features-grid'
import { ProcessSteps } from '@/components/marketing/process-steps'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <PageHeader
            title="Transform Your Git Commits Into Meaningful Stories"
            titleGradient="Meaningful Stories"
            description="Every commit tells a story. GitFables turns your development journey into captivating fables that showcase the magic behind your code."
            size="large"
          >
            <div className="flex items-center gap-4 justify-center pt-10">
              <Button 
                size="lg" 
                asChild 
                className="shadow-lg hover:shadow-xl transition-all duration-200"
                icon={<ArrowRight className="h-4 w-4" />} 
                iconPosition="right"
              >
                <Link href="/login">
                  Start Your Story
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="shadow-md hover:shadow-lg transition-all duration-200"
                icon={<Star className="h-4 w-4" />}
                iconPosition="left"
              >
                <Link href="/features">See Examples</Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-muted-foreground">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border shadow-sm">
                <Code2 className="h-4 w-4 text-primary" />
                <span>Code to Story</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border shadow-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>AI Magic</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border shadow-sm">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>Show Your Work</span>
              </div>
            </div>
          </PageHeader>
        </div>

        {/* Features Grid */}
        <FeaturesGrid
          title="Turn Code Into Stories"
          description="Powerful AI that understands your development process and creates engaging narratives"
          features={[
            {
              title: 'Smart Analysis',
              description: 'Our AI understands your development patterns, milestones, and key changes to craft meaningful stories',
              icon: Sparkles
            },
            {
              title: 'Multiple Styles',
              description: 'Generate stories in different styles - from technical deep-dives to high-level overviews',
              icon: BookOpen
            },
            {
              title: 'Focus Control',
              description: 'Choose what matters - features, fixes, refactoring, or the complete journey',
              icon: GitBranch
            },
            {
              title: 'Rich Content',
              description: 'Include code snippets, statistics, and visualizations to enhance your story',
              icon: Code2
            },
            {
              title: 'Team Stories',
              description: 'Highlight team contributions and collaborative achievements in your narratives',
              icon: Users
            },
            {
              title: 'Easy Sharing',
              description: 'Share your stories in multiple formats - from web links to downloadable documents',
              icon: Share2
            }
          ]}
        />

        {/* Process Steps */}
        <ProcessSteps
          title="Simple Three-Step Process"
          description="From code to story in minutes"
          steps={[
            {
              step: '01',
              title: 'Connect',
              description: 'Connect your repository with a single click'
            },
            {
              step: '02',
              title: 'Customize',
              description: 'Choose your story style and what to highlight'
            },
            {
              step: '03',
              title: 'Share',
              description: 'Generate and share your story with anyone'
            }
          ]}
        />

        {/* CTA Section */}
        <CTASection
          title="Your Code Has a Story"
          titleHighlight="Let's Tell It Together"
          description="Join developers who are turning their Git commits into captivating narratives that showcase their work."
          primaryCta={{
            text: "Start Creating Stories",
            href: "/login"
          }}
          secondaryCta={{
            text: "See Examples",
            href: "/features"
          }}
        />
      </div>
    </div>
  )
} 