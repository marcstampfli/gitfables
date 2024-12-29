/**
 * @module app/terms/page
 * @description Terms of Service page with detailed legal information
 */

import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    id: 'agreement',
    title: '1. Agreement to Terms',
    content: `Welcome to GitFables! Before using the service, please read these Terms of Service carefully.

By accessing or using GitFables, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service. These terms apply to all visitors, users, and others who access or use GitFables.`
  },
  {
    id: 'license',
    title: '2. Use License',
    content: `When you use GitFables, I grant you a limited, non-exclusive, non-transferable license that allows you to:`,
    items: [
      'Access and use the service for your personal or business purposes',
      'Generate and share stories based on your repository data',
      'Connect and analyze your GitHub repositories',
      'Download, share, and embed your generated stories'
    ],
    footer: `This license is subject to these Terms of Service and may be revoked if you violate these terms.`
  },
  {
    id: 'restrictions',
    title: '3. Restrictions',
    content: `To maintain the quality and integrity of the service, you are specifically restricted from:`,
    items: [
      'Using the service for any unlawful or prohibited purposes',
      'Sharing or transferring your account access to others',
      'Attempting to decompile or reverse engineer the software',
      'Removing any copyright or proprietary notices',
      'Using the service in any way that could damage or overburden it',
      'Creating multiple accounts to circumvent service limitations'
    ],
    footer: `Violation of these restrictions may result in immediate termination of your access to GitFables.`
  },
  {
    id: 'content',
    title: '4. Your Content',
    content: `When you use GitFables with your repositories, it&apos;s important to understand how your content is handled:`,
    items: [
      'You retain full ownership of your code and repository content',
      'You grant GitFables permission to analyze and process your data',
      'You are responsible for ensuring you have rights to share the content',
      'Content violating these terms may be removed',
      'You maintain ownership of all stories generated from your data'
    ],
    footer: `I respect your intellectual property rights and will only use your content as necessary to provide the service.`
  },
  {
    id: 'modifications',
    title: '5. Service Modifications',
    content: `To ensure the best possible service, I reserve the right to:`,
    items: [
      'Modify or discontinue parts of the service with notice',
      'Change pricing with at least 30 days notice',
      'Limit access to certain features when necessary',
      'Update these terms to reflect service changes',
      'Add, remove, or modify functionality'
    ],
    footer: `I will make reasonable efforts to notify you of any significant changes that affect your use of GitFables.`
  },
  {
    id: 'account',
    title: '6. Account Terms',
    content: `To maintain a secure and reliable service, you must:`,
    items: [
      'Provide accurate and complete account information',
      'Maintain the security of your account credentials',
      'Promptly report any unauthorized account access',
      'Be at least 13 years old to use the service',
      'Have a valid GitHub account in good standing'
    ],
    footer: `You are responsible for all activity that occurs under your account.`
  },
  {
    id: 'payment',
    title: '7. Payment Terms',
    content: `For paid services and subscriptions:`,
    items: [
      'All payments are processed securely through Stripe',
      'Subscriptions automatically renew unless cancelled',
      'Refunds are handled according to our refund policy',
      'Prices may change with 30 days advance notice',
      'Service access may be suspended for failed payments'
    ],
    footer: `You can cancel your subscription at any time, and it will remain active until the end of your current billing period.`
  },
  {
    id: 'disclaimer',
    title: '8. Disclaimer',
    content: `GitFables is provided "as is" and without warranties of any kind, either express or implied. While I strive to provide a reliable service:

• I do not guarantee the service will be uninterrupted or error-free
• I make no warranties about the accuracy or reliability of the generated stories
• You understand and agree that you use the service at your own risk
• Technical issues may occasionally affect service availability

Your use of GitFables is at your sole risk. I regularly back up data and maintain security measures, but you should maintain your own backups of important repository data.`
  },
  {
    id: 'liability',
    title: '9. Limitation of Liability',
    content: `To the fullest extent permitted by law, GitFables shall not be liable for any:

• Direct, indirect, or consequential damages
• Loss of profits, revenue, or data
• Business interruption or lost opportunities
• Damages resulting from service interruptions
• Issues arising from third-party integrations

This limitation of liability applies whether the alleged liability is based on contract, tort, negligence, strict liability, or any other basis.`
  },
  {
    id: 'termination',
    title: '10. Termination',
    content: `I may terminate or suspend your access to GitFables immediately, without prior notice, if:

• You violate these Terms of Service
• Your actions could harm other users or the service
• You breach any applicable laws or regulations
• Your usage poses a security risk

Upon termination, your right to use the service will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive.`
  }
]

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {/* Hero */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-[800px] mx-auto">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-center">
                    Terms of Service
                  </h1>
                  <p className="text-lg text-muted-foreground text-center">
                    Last updated: March 15, 2024
                  </p>
                </div>

                {/* Quick Links */}
                <nav className="flex flex-wrap justify-center gap-2 text-sm">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      {section.title.split('.')[1]}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-[800px] mx-auto">
              <article className="prose prose-gray dark:prose-invert lg:prose-lg max-w-none">
                {sections.map((section) => (
                  <div key={section.id} id={section.id} className="scroll-m-20">
                    <h2 className="text-3xl font-bold tracking-tight mt-16 first:mt-0">
                      {section.title}
                    </h2>
                    {section.content && (
                      <div className="mt-6 space-y-4 text-base leading-7">
                        {section.content.split('\n\n').map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    )}
                    {section.items && (
                      <ul className="mt-6 space-y-4 text-base">
                        {section.items.map((item, i) => (
                          <li key={i} className="leading-7">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.footer && (
                      <p className="mt-6 text-sm text-muted-foreground">
                        {section.footer}
                      </p>
                    )}
                  </div>
                ))}
              </article>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="max-w-[600px] mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold tracking-tight">
                Questions About Terms?
              </h2>
              <p className="text-lg text-muted-foreground">
                If you have any questions about these Terms of Service, please don&apos;t hesitate to contact me.
              </p>
              <Button size="lg" asChild>
                <Link href="mailto:legal@gitfables.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Legal Team
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 