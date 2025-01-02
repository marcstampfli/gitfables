/**
 * @module app/(marketing)/support/page
 * @description Support page with FAQs and contact information
 */

import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Mail, MessageCircle, Github, Twitter } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Support - GitFables',
  description: 'Get help with GitFables. Find answers to common questions and contact our support team.',
}

const faqs = [
  {
    question: 'How do I connect my GitHub repository?',
    answer: 'To connect your GitHub repository, go to the Dashboard, click on "Connect Repository", and follow the authentication process. Once authenticated, you can select the repositories you want to connect.'
  },
  {
    question: 'What types of stories can I create?',
    answer: 'GitFables supports multiple story formats including technical documentation, narrative stories, changelogs, and release notes. Each format is optimized for different use cases and audiences.'
  },
  {
    question: 'Is my repository data secure?',
    answer: 'Yes, we take security seriously. We only access the repositories you explicitly connect, and all data is encrypted in transit and at rest. We never store your Git credentials.'
  },
  {
    question: 'Can I export my stories?',
    answer: 'Yes, you can export your stories in multiple formats including Markdown, PDF, and HTML. This makes it easy to share your stories or include them in your documentation.'
  },
  {
    question: 'Do you support private repositories?',
    answer: 'Yes, GitFables fully supports private repositories. Your private repository data is kept secure and is only accessible to you and team members you explicitly grant access to.'
  }
]

export default function SupportPage() {
  return (
    <div className="container max-w-4xl py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Support Center</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Need help with GitFables? Find answers to common questions below or reach out to our support team.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Email Support
            </CardTitle>
            <CardDescription>
              Get help from our support team via email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Response time: Within 24 hours
            </p>
            <Button className="w-full" asChild>
              <a href="mailto:support@gitfables.com">
                Contact Support
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Community Support
            </CardTitle>
            <CardDescription>
              Get help from the GitFables community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <a href="https://github.com/gitfables/discussions" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <a href="https://twitter.com/gitfables" target="_blank" rel="noopener noreferrer">
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQs */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Common questions about using GitFables
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Additional Resources */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Additional Resources
          </h2>
          <p className="text-muted-foreground">
            Learn more about using GitFables effectively
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Button variant="outline" className="h-auto p-4 text-left" asChild>
            <Link href="/docs">
              <div>
                <h3 className="font-semibold">Documentation</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed guides and API reference
                </p>
              </div>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto p-4 text-left" asChild>
            <Link href="/blog">
              <div>
                <h3 className="font-semibold">Blog</h3>
                <p className="text-sm text-muted-foreground">
                  Tips, tutorials, and updates
                </p>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 