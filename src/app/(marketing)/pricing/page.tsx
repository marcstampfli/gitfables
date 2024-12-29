/**
 * @module app/pricing/page
 * @description Pricing page with available plans and features
 */

import { Button } from '@/components/ui/button'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    description: 'Perfect for personal projects and exploring GitFables.',
    price: '$0',
    features: [
      'Connect up to 3 repositories',
      'Basic story generation',
      'Public story sharing',
      'Community support'
    ]
  },
  {
    name: 'Pro',
    description: 'For developers who want to showcase their work professionally.',
    price: '$9',
    interval: 'per month',
    features: [
      'Unlimited repositories',
      'Advanced story customization',
      'Private repositories',
      'Priority story generation',
      'Custom branding options',
      'Email support'
    ],
    popular: true
  },
  {
    name: 'Team',
    description: 'Perfect for teams collaborating on multiple projects.',
    price: '$29',
    interval: 'per month',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Shared workspace',
      'Analytics dashboard',
      'Team story templates',
      'Priority support'
    ]
  }
]

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {/* Hero */}
        <section className="relative py-20">
          <div className="container relative">
            <div className="max-w-[800px] mx-auto text-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Simple, Transparent
                  <br />
                  <span className="relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 blur-2xl opacity-25" />
                    <span className="relative bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      Pricing
                    </span>
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
                  Choose the perfect plan for your needs. All plans include core features with no hidden costs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Grid */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
              {plans.map((plan) => (
                <div key={plan.name} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 transition-all group-hover:opacity-100" />
                  <div className={`relative bg-card rounded-xl border p-8 h-full flex flex-col ${plan.popular ? 'border-primary/50 shadow-lg' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-0 right-0 flex justify-center">
                        <div className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                          Most Popular
                        </div>
                      </div>
                    )}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <p className="mt-2 text-muted-foreground">{plan.description}</p>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        {plan.interval && (
                          <span className="text-muted-foreground">{plan.interval}</span>
                        )}
                      </div>
                      <ul className="space-y-4 flex-1">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button size="lg" className="w-full" variant={plan.popular ? 'default' : 'outline'} asChild>
                        <Link href="/login">
                          Get Started
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

        {/* FAQ */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-[800px] mx-auto">
              <div className="prose prose-gray dark:prose-invert lg:prose-lg max-w-none">
                <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold">Can I change plans later?</h3>
                    <p className="mt-2 text-muted-foreground">
                      Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">What payment methods do you accept?</h3>
                    <p className="mt-2 text-muted-foreground">
                      We accept all major credit cards and process payments securely through Stripe.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Is there a free trial?</h3>
                    <p className="mt-2 text-muted-foreground">
                      Our Free plan lets you try all core features. You can upgrade to Pro or Team when you need more capabilities.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">What happens if I exceed my plan limits?</h3>
                    <p className="mt-2 text-muted-foreground">
                      We&apos;ll notify you when you&apos;re approaching your plan limits. You can upgrade at any time to continue using all features.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 