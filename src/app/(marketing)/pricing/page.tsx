/**
 * @module app/pricing/page
 * @description Pricing page with plan comparison and billing options
 */

'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Check, X, Building2, Zap, Users, Lock } from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from '@/components/marketing/page-header'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const plans = [
  {
    name: 'Free',
    description: 'Perfect for trying out GitFables',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      'Up to 3 repositories',
      'Basic story templates',
      'Public repositories only',
      'Community support',
      'Basic analytics'
    ],
    limits: {
      repositories: 3,
      templates: 5,
      storiesPerMonth: 50,
      teamMembers: 1
    },
    cta: 'Get Started',
    href: '/login',
    featured: false,
    icon: Zap
  },
  {
    name: 'Pro',
    description: 'Best for individual developers',
    monthlyPrice: 15,
    annualPrice: 144, // $12/mo when paid annually
    features: [
      'Unlimited repositories',
      'All story templates',
      'Private repositories',
      'Priority support',
      'Advanced analytics',
      'Custom branding',
      'API access',
      'Export options'
    ],
    limits: {
      repositories: 'Unlimited',
      templates: 'Unlimited',
      storiesPerMonth: 500,
      teamMembers: 1
    },
    cta: 'Start Free Trial',
    href: '/login?plan=pro',
    featured: true,
    icon: Users
  },
  {
    name: 'Team',
    description: 'Perfect for development teams',
    monthlyPrice: 39,
    annualPrice: 384, // $32/mo when paid annually
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Shared templates',
      'Team analytics',
      'SSO authentication',
      'Audit logs',
      'Custom integrations',
      'Dedicated support'
    ],
    limits: {
      repositories: 'Unlimited',
      templates: 'Unlimited',
      storiesPerMonth: 2000,
      teamMembers: 10
    },
    cta: 'Contact Sales',
    href: '/contact?topic=team',
    featured: false,
    icon: Building2
  }
]

const featureComparison = {
  categories: [
    {
      name: 'Core Features',
      features: [
        { name: 'Story Generation', free: true, pro: true, team: true },
        { name: 'Repository Integration', free: true, pro: true, team: true },
        { name: 'Custom Templates', free: 'Limited', pro: true, team: true },
        { name: 'Private Repositories', free: false, pro: true, team: true }
      ]
    },
    {
      name: 'Team Features',
      features: [
        { name: 'Team Collaboration', free: false, pro: false, team: true },
        { name: 'Shared Templates', free: false, pro: false, team: true },
        { name: 'Role-Based Access', free: false, pro: false, team: true },
        { name: 'SSO Authentication', free: false, pro: false, team: true }
      ]
    },
    {
      name: 'Advanced Features',
      features: [
        { name: 'API Access', free: false, pro: true, team: true },
        { name: 'Custom Branding', free: false, pro: true, team: true },
        { name: 'Advanced Analytics', free: false, pro: true, team: true },
        { name: 'Audit Logs', free: false, pro: false, team: true }
      ]
    }
  ]
}

const testimonials = [
  {
    quote: "GitFables has transformed how we document our development process. The AI-generated stories are engaging and insightful.",
    author: "Sarah Chen",
    role: "Engineering Lead",
    company: "TechCorp"
  },
  {
    quote: "The Team plan's collaboration features have made it easy to maintain consistent documentation across our entire organization.",
    author: "Michael Rodriguez",
    role: "CTO",
    company: "DevFlow"
  },
  {
    quote: "The Pro plan gives me everything I need as a solo developer. The custom templates are a game-changer.",
    author: "Alex Kim",
    role: "Independent Developer",
    company: "CodeCraft"
  }
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true)
  const [showComparison, setShowComparison] = useState(false)
  const discount = 'Save 20%'

  const formatPrice = (price: number) => {
    if (price === 0) return 'Free'
    return `$${price}`
  }

  return (
    <div className="relative">
      <PageHeader
        title="Simple, Transparent Pricing"
        titleGradient="Pricing"
        description="Choose the perfect plan for your development needs"
      />

      {/* Billing Toggle */}
      <section className="py-8">
        <div className="container">
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-4">
              <span className={cn(
                "text-lg font-medium transition-colors",
                !isAnnual ? "text-primary" : "text-muted-foreground"
              )}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative h-8 w-14 rounded-full bg-primary/10 transition-colors hover:bg-primary/20"
              >
                <div className={cn(
                  "absolute h-6 w-6 rounded-full bg-primary transition-all top-1",
                  isAnnual ? "right-1" : "left-1"
                )} />
              </button>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-lg font-medium transition-colors",
                  isAnnual ? "text-primary" : "text-muted-foreground"
                )}>
                  Annual
                </span>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {discount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "relative bg-background border rounded-xl overflow-hidden",
                  plan.featured && "border-primary shadow-lg scale-[1.02]"
                )}
              >
                {plan.featured && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <plan.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                  <div className="mt-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">
                        {formatPrice(isAnnual ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice)}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    {isAnnual && plan.annualPrice > 0 && (
                      <div className="text-sm text-muted-foreground mt-1">
                        ${plan.annualPrice} billed annually
                      </div>
                    )}
                  </div>
                  <div className="mt-6 py-4 border-y">
                    <h4 className="text-sm font-medium mb-2">Plan Limits</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Repositories</span>
                        <span className="font-medium">{plan.limits.repositories}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Templates</span>
                        <span className="font-medium">{plan.limits.templates}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Stories/month</span>
                        <span className="font-medium">{plan.limits.storiesPerMonth}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Team members</span>
                        <span className="font-medium">{plan.limits.teamMembers}</span>
                      </li>
                    </ul>
                  </div>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button 
                      size="lg" 
                      className="w-full"
                      variant={plan.featured ? 'default' : 'outline'}
                      asChild
                    >
                      <Link href={plan.href}>
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Compare Plans
            </h2>
            <p className="text-lg text-muted-foreground">
              Detailed comparison of features available in each plan
            </p>
          </div>
          <div className="max-w-6xl mx-auto space-y-8">
            {featureComparison.categories.map((category) => (
              <Card key={category.name} className="overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[40%]">Feature</TableHead>
                      <TableHead className="text-center">Free</TableHead>
                      <TableHead className="text-center">Pro</TableHead>
                      <TableHead className="text-center">Team</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {category.features.map((feature) => (
                      <TableRow key={feature.name}>
                        <TableCell className="font-medium">{feature.name}</TableCell>
                        <TableCell className="text-center">
                          {feature.free === true && <Check className="h-5 w-5 text-primary mx-auto" />}
                          {feature.free === false && <X className="h-5 w-5 text-muted-foreground mx-auto" />}
                          {typeof feature.free === 'string' && (
                            <Badge variant="secondary" className="mx-auto">
                              {feature.free}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {feature.pro === true && <Check className="h-5 w-5 text-primary mx-auto" />}
                          {feature.pro === false && <X className="h-5 w-5 text-muted-foreground mx-auto" />}
                          {typeof feature.pro === 'string' && (
                            <Badge variant="secondary" className="mx-auto">
                              {feature.pro}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {feature.team === true && <Check className="h-5 w-5 text-primary mx-auto" />}
                          {feature.team === false && <X className="h-5 w-5 text-muted-foreground mx-auto" />}
                          {typeof feature.team === 'string' && (
                            <Badge variant="secondary" className="mx-auto">
                              {feature.team}
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Trusted by Developers
            </h2>
            <p className="text-lg text-muted-foreground">
              See what others are saying about GitFables
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="bg-muted/30 rounded-xl p-8">
                <blockquote className="text-lg mb-6">"{testimonial.quote}"</blockquote>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="bg-background border rounded-xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="inline-block p-3 rounded-xl bg-primary/10 mb-6">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight mb-4">
                    Enterprise Plan
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Need a custom solution? Our enterprise plan includes advanced security features, custom integrations, and dedicated support.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-primary" />
                      <span>Advanced security features</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <span>Unlimited team members</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-primary" />
                      <span>Custom integrations</span>
                    </li>
                  </ul>
                  <Button size="lg" asChild>
                    <Link href="/contact?topic=enterprise">
                      Contact Enterprise Sales
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="flex-1 space-y-6">
                  <div className="p-6 bg-muted rounded-lg">
                    <h3 className="font-medium mb-2">Dedicated Support</h3>
                    <p className="text-sm text-muted-foreground">24/7 priority support with dedicated account manager</p>
                  </div>
                  <div className="p-6 bg-muted rounded-lg">
                    <h3 className="font-medium mb-2">Custom Deployment</h3>
                    <p className="text-sm text-muted-foreground">On-premise deployment options and custom SLAs</p>
                  </div>
                  <div className="p-6 bg-muted rounded-lg">
                    <h3 className="font-medium mb-2">Advanced Security</h3>
                    <p className="text-sm text-muted-foreground">SAML SSO, audit logs, and compliance features</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-[600px] mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground">
              Check out our frequently asked questions or contact our support team.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs/faq">
                  Browse FAQ
                </Link>
              </Button>
              <Button size="lg" asChild>
                <Link href="/contact">
                  Contact Support
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