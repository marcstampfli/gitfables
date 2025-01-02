/**
 * @module app/contact/page
 * @description Contact page with support options and contact form
 */

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Mail, MessageSquare, Github, Twitter } from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from '@/components/marketing/page-header'

const supportChannels = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get help via email within 24 hours',
    href: 'mailto:support@gitfables.com',
    linkText: 'support@gitfables.com'
  },
  {
    icon: Github,
    title: 'GitHub Discussions',
    description: 'Join our community discussions',
    href: 'https://github.com/gitfables/discussions',
    linkText: 'Visit GitHub'
  },
  {
    icon: Twitter,
    title: 'Twitter Support',
    description: 'Quick responses during business hours',
    href: 'https://twitter.com/gitfables',
    linkText: '@gitfables'
  },
  {
    icon: MessageSquare,
    title: 'Discord Community',
    description: 'Chat with the community',
    href: 'https://discord.gg/gitfables',
    linkText: 'Join Discord'
  }
]

export default function ContactPage() {
  return (
    <div className="relative">
      <PageHeader
        title="Contact Us"
        titleGradient="Contact"
        description="Get in touch with our team. We're here to help you succeed."
      />

      {/* Support Channels */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Support Channels
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the best way to get in touch with us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {supportChannels.map((channel) => (
              <Link 
                key={channel.title}
                href={channel.href}
                className="group relative bg-background hover:bg-muted/50 border rounded-xl p-6 transition-colors"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="flex-shrink-0 p-3 bg-primary/5 rounded-lg">
                    <channel.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {channel.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {channel.description}
                    </p>
                    <span className="text-sm font-medium text-primary">
                      {channel.linkText}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Send Us a Message
              </h2>
              <p className="text-lg text-muted-foreground">
                Have a specific question? Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <form className="space-y-8">
              <div className="grid gap-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    required
                    className="min-h-[150px]"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button size="lg" type="submit">
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-[600px] mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Looking for Quick Answers?
            </h2>
            <p className="text-lg text-muted-foreground">
              Check out our frequently asked questions for immediate answers to common queries.
            </p>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs/faq">
                Browse FAQ
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 