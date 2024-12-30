/**
 * @module app/contact/page
 * @description Contact page with support information and contact form
 */

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Mail, MessageSquare, Github } from 'lucide-react'
import Link from 'next/link'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get help with your account, billing, or general questions.',
    href: 'mailto:support@gitfables.com',
    linkText: 'support@gitfables.com'
  },
  {
    icon: Github,
    title: 'GitHub Discussions',
    description: 'Join our community discussions for technical questions and feature requests.',
    href: 'https://github.com/gitfables/discussions',
    linkText: 'Visit Discussions'
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Chat with me directly for quick questions and support.',
    href: '#chat',
    linkText: 'Start Chat'
  }
]

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {/* Hero */}
        <section className="relative py-20">
          <div className="container relative">
            <div className="max-w-[800px] mx-auto text-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Get in Touch &
                  <br />
                  <span className="relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 blur-2xl opacity-25" />
                    <span className="relative bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      Get Support
                    </span>
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
                  Have questions or need help? I&apos;m here to assist you with any inquiries about GitFables.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="max-w-[800px] mx-auto">
              <div className="grid sm:grid-cols-3 gap-8">
                {contactMethods.map((method) => (
                  <div
                    key={method.title}
                    className="relative bg-card hover:bg-muted/50 border rounded-xl p-6 transition-colors"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <method.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold tracking-tight">
                          {method.title}
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                          {method.description}
                        </p>
                      </div>
                      <div className="flex items-center text-primary">
                        <Link
                          href={method.href}
                          className="flex items-center space-x-1 text-sm font-medium hover:underline"
                        >
                          <span>{method.linkText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-[600px] mx-auto">
              <div className="space-y-12">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight">Send a Message</h2>
                  <p className="text-lg text-muted-foreground">
                    Fill out the form below and I&apos;ll get back to you as soon as possible.
                  </p>
                </div>

                <form className="space-y-8">
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Enter your message"
                        rows={6}
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full" 
                    icon={<ArrowRight className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 