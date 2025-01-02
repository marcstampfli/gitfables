/**
 * @module components/sections/hero
 * @description Hero section with main call-to-action
 */

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

/**
 * Hero section component for the landing page
 * Features a main heading, description, CTA buttons, and feature highlights
 */
export function Hero({ className }: { className?: string }) {
  return (
    <section className={cn('relative min-h-screen flex items-center justify-center', className)}>
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/5 blur-3xl rounded-full -translate-y-24" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-primary/5 blur-3xl rounded-full translate-y-24" />
      </div>

      <div className="container px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
            <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium">Now in public beta</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
            Transform Your Git History Into{' '}
            <span className="text-primary">Engaging Stories</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            GitFables turns your commit messages into captivating stories, making code reviews more enjoyable and helping teams better understand project history.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="/auth">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8">
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 