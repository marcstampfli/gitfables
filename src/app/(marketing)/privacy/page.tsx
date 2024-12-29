/**
 * @module app/privacy/page
 * @description Privacy policy page with detailed information about data handling
 */

import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: `At GitFables, I take your privacy seriously. This Privacy Policy explains how I collect, use, and protect your information when you use the service.

By using GitFables, you agree to the collection and use of information in accordance with this policy. I use your data only to provide and improve the service. I will never sell your information to third parties.`
  },
  {
    id: 'information-collected',
    title: 'Information We Collect',
    subsections: [
      {
        title: 'Information You Provide',
        content: `When you use GitFables, you may provide certain information voluntarily:`,
        items: [
          'GitHub account information and OAuth tokens when connecting your account',
          'Email address for important notifications and updates',
          'Repository access permissions and scope settings',
          'Profile information you choose to provide'
        ]
      },
      {
        title: 'Information Automatically Collected',
        content: `To provide and improve the service, I automatically collect certain information:`,
        items: [
          'Repository metadata and commit history for story generation',
          'Basic usage analytics to improve the service experience',
          'Technical information about your device and browser',
          'Security logs and cookies for service protection'
        ]
      }
    ]
  },
  {
    id: 'data-usage',
    title: 'How We Use Your Information',
    content: `I use the collected information for various purposes to provide and maintain GitFables. Here&apos;s how your information helps improve the service:`,
    items: [
      'Providing the core GitFables service and features',
      'Generating meaningful stories from your repository data',
      'Improving and personalizing your experience',
      'Sending important updates about changes or improvements',
      'Ensuring the security and proper functioning of the service'
    ]
  },
  {
    id: 'data-security',
    title: 'Data Security',
    content: `Your security is my top priority. I implement industry-standard security measures to protect your data:

• Secure data transmission using HTTPS encryption
• Regular security audits and system updates
• Strict access controls to personal information
• Secure data storage with regular backups

While I implement these safeguards, please note that no method of transmission over the Internet or electronic storage is 100% secure. I cannot guarantee absolute security but continuously work to protect your personal information.`
  },
  {
    id: 'data-sharing',
    title: 'Data Sharing',
    content: `I have a strict policy against selling your personal information. Your data will only be shared in these specific circumstances:

• With your explicit consent for specific purposes
• To comply with legal obligations or valid requests
• To protect against security threats or abuse
• With essential service providers under strict confidentiality agreements

When sharing is necessary, I ensure that your data is handled with the same level of care and protection that I provide.`
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    content: `You have several rights regarding your personal information. You can:`,
    items: [
      'Request access to your personal data stored in GitFables',
      'Correct any inaccurate or incomplete information',
      'Request deletion of your data (subject to legal requirements)',
      'Object to the processing of your personal information',
      'Export your data in a machine-readable format'
    ],
    footer: `I strive to respond to all legitimate requests within a reasonable timeframe, typically within 30 days.`
  },
  {
    id: 'updates',
    title: 'Policy Updates',
    content: `This Privacy Policy may be updated periodically to reflect changes in how I handle your information. I will notify you of any material changes by:

• Posting the new Privacy Policy on this page
• Updating the "Last updated" date at the top
• Sending you an email notification for significant changes

Your continued use of GitFables after any changes to this Privacy Policy constitutes your acceptance of the changes.`
  }
]

export default function PrivacyPage() {
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
                    Privacy Policy
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
                      {section.title}
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
                    {section.subsections && section.subsections.map((subsection) => (
                      <div key={subsection.title} className="mt-12">
                        <h3 className="text-2xl font-semibold tracking-tight">
                          {subsection.title}
                        </h3>
                        <div className="mt-4 space-y-4 text-base leading-7">
                          <p>{subsection.content}</p>
                          <ul className="space-y-4">
                            {subsection.items.map((item, i) => (
                              <li key={i} className="leading-7">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
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
                Questions About Privacy?
              </h2>
              <p className="text-lg text-muted-foreground">
                If you have any questions about this Privacy Policy, please don&apos;t hesitate to contact me.
              </p>
              <Button size="lg" asChild>
                <Link href="mailto:privacy@gitfables.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Privacy Team
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 