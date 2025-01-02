/**
 * @module app/features/page
 * @description Features page showcasing GitFables capabilities
 */

import { Button } from '@/components/ui/button'
import { 
  ArrowRight, GitBranch, Sparkles, Users, Zap, BookOpen, Palette, 
  Code2, LineChart, Shield, Workflow, Laptop, Cloud, GitPullRequest,
  Settings, MessageSquare, FileText, Check
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { PageHeader } from '@/components/marketing/page-header'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  title: string
  description: string
  icon: LucideIcon
  image?: string
  imageAlt?: string
  gradient?: string
  demo?: {
    url: string
    caption: string
  }
  benefits?: string[]
}

const mainFeatures: Feature[] = [
  {
    title: 'AI-Powered Story Generation',
    description: 'Transform your Git history into engaging narratives automatically. Our AI understands your development patterns and creates meaningful stories.',
    icon: Sparkles,
    image: '/features/story-generation.jpg',
    imageAlt: 'AI story generation interface',
    gradient: 'from-purple-500/20 via-purple-400/20 to-fuchsia-500/20',
    demo: {
      url: '/demos/story-generation',
      caption: 'See how our AI transforms commit history into engaging stories'
    },
    benefits: [
      'Save hours of documentation time',
      'Maintain consistent narrative quality',
      'Automatic context understanding',
      'Multiple story formats'
    ]
  },
  {
    title: 'Smart Repository Analysis',
    description: 'Deep insights into your development process. Understand patterns, contributions, and project evolution over time.',
    icon: GitBranch,
    image: '/features/repo-analysis.jpg',
    imageAlt: 'Repository analysis dashboard',
    gradient: 'from-blue-500/20 via-cyan-400/20 to-sky-500/20',
    demo: {
      url: '/demos/repo-analysis',
      caption: 'Explore our powerful repository analysis tools'
    },
    benefits: [
      'Track project velocity',
      'Identify bottlenecks',
      'Measure team productivity',
      'Visualize code evolution'
    ]
  },
  {
    title: 'Team Collaboration',
    description: 'Work together seamlessly. Share templates, collaborate on stories, and maintain a shared knowledge base.',
    icon: Users,
    image: '/features/collaboration.jpg',
    imageAlt: 'Team collaboration features',
    gradient: 'from-green-500/20 via-emerald-400/20 to-teal-500/20',
    demo: {
      url: '/demos/collaboration',
      caption: 'See how teams collaborate effectively with GitFables'
    },
    benefits: [
      'Real-time collaboration',
      'Shared templates library',
      'Team permissions',
      'Activity tracking'
    ]
  }
]

const featureCategories = [
  {
    title: 'Development Tools',
    description: 'Essential tools for modern development teams',
    features: [
      {
        title: 'Custom Templates',
        description: 'Create and customize story templates that match your team\'s needs.',
        icon: Palette
      },
      {
        title: 'API Integration',
        description: 'Integrate GitFables into your existing workflow with our robust API.',
        icon: Code2
      },
      {
        title: 'Pull Request Integration',
        description: 'Automatically generate stories from pull requests and code reviews.',
        icon: GitPullRequest
      },
      {
        title: 'Workflow Automation',
        description: 'Automate story generation based on your development workflow.',
        icon: Workflow
      }
    ]
  },
  {
    title: 'Content & Analytics',
    description: 'Tools to create and measure impact',
    features: [
      {
        title: 'Advanced Analytics',
        description: 'Track story performance and engagement with detailed analytics.',
        icon: LineChart
      },
      {
        title: 'Multiple Story Formats',
        description: 'Generate stories in various formats including blog posts, reports, and presentations.',
        icon: BookOpen
      },
      {
        title: 'Rich Text Editor',
        description: 'Edit and enhance generated stories with our powerful editor.',
        icon: FileText
      },
      {
        title: 'Engagement Tracking',
        description: 'Monitor how your stories are being read and shared.',
        icon: MessageSquare
      }
    ]
  }
]

const integrations = [
  {
    title: 'GitHub',
    description: 'Seamless integration with GitHub repositories and workflows',
    icon: GitBranch
  },
  {
    title: 'GitLab',
    description: 'Full support for GitLab projects and CI/CD pipelines',
    icon: GitBranch
  },
  {
    title: 'Bitbucket',
    description: 'Connect and analyze Bitbucket repositories',
    icon: GitBranch
  },
  {
    title: 'Jira',
    description: 'Link stories with Jira issues and projects',
    icon: Laptop
  },
  {
    title: 'Slack',
    description: 'Share and discuss stories directly in Slack',
    icon: MessageSquare
  },
  {
    title: 'Microsoft Teams',
    description: 'Collaborate on stories within Microsoft Teams',
    icon: Users
  }
]

export default function FeaturesPage() {
  return (
    <div className="relative">
      <PageHeader
        title="Powerful Features"
        titleGradient="Features"
        description="Everything you need to transform your Git history into engaging stories"
      />

      {/* Main Features */}
      <section className="py-24">
        <div className="container">
          <div className="space-y-32">
            {mainFeatures.map((feature, i) => (
              <div 
                key={feature.title}
                className={cn(
                  "relative grid md:grid-cols-2 gap-12 items-center",
                  i % 2 === 1 && "md:[&>div:first-child]:order-2"
                )}
              >
                {/* Content */}
                <div className="relative">
                  <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-8">
                    <feature.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Featured</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight mb-4">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    {feature.description}
                  </p>
                  {feature.benefits && (
                    <ul className="space-y-3 mb-8">
                      {feature.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center gap-4">
                    <Button asChild>
                      <Link href="/docs/features">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    {feature.demo && (
                      <Button variant="outline" asChild>
                        <Link href={feature.demo.url}>
                          View Demo
                          <Zap className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Image/Placeholder */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  {/* Gradient Background */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br",
                    feature.gradient
                  )} />
                  
                  {/* Placeholder Grid */}
                  <div className="absolute inset-4 border border-dashed border-primary/20 rounded-lg grid grid-cols-6 grid-rows-4 gap-2 p-4">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div 
                        key={i}
                        className={cn(
                          "rounded bg-primary/5",
                          i % 7 === 0 && "col-span-2 row-span-2",
                          i % 5 === 0 && "col-span-3",
                          i % 3 === 0 && "bg-primary/10"
                        )}
                      />
                    ))}
                  </div>

                  {/* Future Image */}
                  {/* <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    className="object-cover"
                  /> */}

                  {/* Demo Caption */}
                  {feature.demo && (
                    <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-sm text-center">
                        {feature.demo.caption}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      {featureCategories.map((category, i) => (
        <section 
          key={category.title}
          className={cn(
            "py-24",
            i % 2 === 0 ? "bg-muted/30" : "bg-background"
          )}
        >
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                {category.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {category.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {category.features.map((feature) => (
                <div 
                  key={feature.title}
                  className="relative bg-background hover:bg-muted/50 border rounded-xl p-6 transition-colors group"
                >
                  <div className="relative">
                    {/* Icon with animated background */}
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6 text-primary" />
                      <div className="absolute inset-0 bg-primary/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <h3 className="font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Integrations */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Seamless Integrations
            </h2>
            <p className="text-lg text-muted-foreground">
              Connect GitFables with your favorite development tools
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {integrations.map((integration) => (
              <div 
                key={integration.title}
                className="relative bg-background hover:bg-muted/50 border rounded-xl p-6 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <integration.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {integration.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {integration.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="bg-background border rounded-xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="inline-block p-3 rounded-xl bg-primary/10 mb-6">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight mb-4">
                    Enterprise-Grade Security
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    GitFables is built with security and compliance in mind, ensuring your data is always protected.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span>SOC 2 Type II Certified</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span>GDPR Compliant</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span>End-to-end encryption</span>
                    </li>
                  </ul>
                  <Button asChild>
                    <Link href="/security">
                      Learn About Security
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="flex-1 space-y-6">
                  <div className="p-6 bg-muted rounded-lg">
                    <h3 className="font-medium mb-2">Data Protection</h3>
                    <p className="text-sm text-muted-foreground">Industry-standard encryption for all data at rest and in transit</p>
                  </div>
                  <div className="p-6 bg-muted rounded-lg">
                    <h3 className="font-medium mb-2">Access Control</h3>
                    <p className="text-sm text-muted-foreground">Fine-grained permissions and role-based access control</p>
                  </div>
                  <div className="p-6 bg-muted rounded-lg">
                    <h3 className="font-medium mb-2">Compliance</h3>
                    <p className="text-sm text-muted-foreground">Regular security audits and compliance certifications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-[600px] mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground">
              Transform your Git history into engaging stories today.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs">
                  View Documentation
                </Link>
              </Button>
              <Button size="lg" asChild>
                <Link href="/login">
                  Try for Free
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