/**
 * @module components/sections/hero
 * @description Hero section with main call-to-action
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Animated } from '@/components/ui/animated'

interface HeroProps {
  isConnected: boolean
  isLoading: boolean
}

export function Hero({ isConnected, isLoading }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      <div className="container relative">
        <div className="mx-auto max-w-[800px] text-center space-y-8">
          <Animated animation="slide-down" delay={200}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Turn Your Git History into{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Stories
              </span>
            </h1>
          </Animated>
          
          <Animated animation="slide-up" delay={400}>
            <p className="mx-auto max-w-[600px] text-lg sm:text-xl text-muted-foreground">
              RepoTales analyzes your repositories and generates engaging
              stories about your development journey, achievements, and coding style.
            </p>
          </Animated>

          <Animated animation="slide-up" delay={600}>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                className="h-12 px-6"
                asChild
                disabled={isLoading || isConnected}
              >
                <Link href="/login">
                  {isConnected ? 'Connected' : 'Get Started'}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-6"
                asChild
              >
                <a href="#how-it-works">Learn More</a>
              </Button>
            </div>
          </Animated>

          <Animated animation="fade-in" delay={800}>
            <div className="pt-8">
              <p className="text-sm text-muted-foreground">
                Join developers from companies like
              </p>
              <div className="mt-4 flex justify-center gap-8">
                {/* Replace with actual company logos */}
                <div className="h-8 w-24 rounded-lg bg-muted" />
                <div className="h-8 w-24 rounded-lg bg-muted" />
                <div className="h-8 w-24 rounded-lg bg-muted" />
              </div>
            </div>
          </Animated>
        </div>
      </div>
    </section>
  )
} 