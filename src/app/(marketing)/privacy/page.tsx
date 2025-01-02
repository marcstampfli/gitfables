/**
 * @module app/privacy/page
 * @description Privacy policy page detailing data handling and user rights
 */

import { PageHeader } from '@/components/marketing/page-header'

export default function PrivacyPage() {
  return (
    <div className="relative">
      <PageHeader
        title="Privacy Policy"
        titleGradient="Privacy"
        description="How we handle and protect your data"
      />

      <section className="py-24">
        <div className="container">
          <div className="prose prose-gray dark:prose-invert max-w-3xl mx-auto">
            <div className="text-sm text-muted-foreground mb-8">
              Last updated: March 15, 2024
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Introduction</h2>
              <p>
                At GitFables (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
              <p>We may collect personal information that you provide to us, including but not limited to:</p>
              <ul>
                <li>Name and email address when you create an account</li>
                <li>GitHub profile information when you connect your account</li>
                <li>Payment information when you subscribe to our services</li>
                <li>Communication preferences and settings</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Usage Information</h3>
              <p>We automatically collect certain information when you use our services, including:</p>
              <ul>
                <li>Log data (IP address, browser type, pages visited)</li>
                <li>Device information (operating system, unique device identifiers)</li>
                <li>Usage patterns and preferences</li>
                <li>Performance and error data</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">How We Use Your Information</h2>
              <p>We use the collected information for various purposes, including:</p>
              <ul>
                <li>Providing and maintaining our services</li>
                <li>Processing your transactions</li>
                <li>Sending you important updates and notifications</li>
                <li>Improving our services and user experience</li>
                <li>Analyzing usage patterns and trends</li>
                <li>Preventing fraud and ensuring security</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Data Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul>
                <li>Service providers who assist in operating our services</li>
                <li>Law enforcement when required by law</li>
                <li>Other parties with your consent</li>
              </ul>
              <p>
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Children&apos;s Privacy</h2>
              <p>
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@gitfables.com" className="text-primary hover:underline">
                  privacy@gitfables.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
} 