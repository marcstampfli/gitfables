/**
 * @module app/terms/page
 * @description Terms of Service page outlining user agreements and legal terms
 */

import { PageHeader } from '@/components/marketing/page-header'

export default function TermsPage() {
  return (
    <div className="relative">
      <PageHeader
        title="Terms of Service"
        titleGradient="Terms"
        description="Our terms and conditions for using GitFables"
      />

      <section className="py-24">
        <div className="container">
          <div className="prose prose-gray dark:prose-invert max-w-3xl mx-auto">
            <div className="text-sm text-muted-foreground mb-8">
              Last updated: March 15, 2024
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Agreement to Terms</h2>
              <p>
                By accessing or using GitFables (&quot;the Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of the terms, you may not access the Service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Accounts and Registration</h2>
              <p>
                When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
              </p>
              <p>
                You are responsible for:
              </p>
              <ul>
                <li>Maintaining the security of your account</li>
                <li>All activities that occur under your account</li>
                <li>Protecting your password and access credentials</li>
                <li>Notifying us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use the Service for any illegal purposes</li>
                <li>Violate any intellectual property rights</li>
                <li>Transmit malware or harmful code</li>
                <li>Attempt to gain unauthorized access</li>
                <li>Interfere with the proper working of the Service</li>
                <li>Engage in automated use of the system</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by GitFables and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">User Content</h2>
              <p>
                When you create, upload, or share content through the Service, you retain your intellectual property rights. However, you grant us a license to use, modify, publicly perform, publicly display, reproduce, and distribute such content.
              </p>
              <p>
                You are responsible for any content you contribute, and you represent that:
              </p>
              <ul>
                <li>You own the content or have the right to use it</li>
                <li>Your content does not violate the rights of others</li>
                <li>Your content complies with these Terms and applicable laws</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Payment Terms</h2>
              <p>
                Some aspects of the Service may be provided for a fee. You agree to pay all fees in accordance with the pricing and payment terms presented to you for such features.
              </p>
              <ul>
                <li>Fees are non-refundable except as required by law</li>
                <li>You are responsible for all applicable taxes</li>
                <li>Subscription fees are billed in advance</li>
                <li>You must provide accurate billing information</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the Service will immediately cease.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Limitation of Liability</h2>
              <p>
                In no event shall GitFables, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Disclaimer</h2>
              <p>
                The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days&apos; notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at{' '}
                <a href="mailto:legal@gitfables.com" className="text-primary hover:underline">
                  legal@gitfables.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
} 