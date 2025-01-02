/**
 * @module components/marketing/cta-section
 * @description A reusable CTA section component for marketing pages
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, GitCommit, Sparkles, BookOpen, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CTASectionProps {
  title: string
  titleHighlight?: string
  description: string
  primaryCta: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  showJourneyVisual?: boolean
  className?: string
}

export function CTASection({
  title,
  titleHighlight,
  description,
  primaryCta,
  secondaryCta,
  showJourneyVisual = true,
  className
}: CTASectionProps) {
  return (
    <section className={cn('py-24', className)}>
      <div className="container px-4">
        <div className="relative rounded-3xl bg-gradient-to-br from-primary to-primary overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.1),_transparent_50%)]" />
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>

          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="grid lg:grid-cols-[1fr,auto] gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              {/* Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground">
                    {titleHighlight ? (
                      <>
                        {title.replace(titleHighlight, '')}{' '}
                        <span className="relative">
                          <span className="relative inline-block">{titleHighlight}</span>
                          <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/50 to-primary-foreground/0" />
                        </span>
                      </>
                    ) : (
                      title
                    )}
                  </h2>
                  <p className="text-lg text-primary-foreground/80 max-w-2xl">
                    {description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    asChild 
                    className="shadow-lg hover:shadow-xl transition-all duration-200 bg-background hover:bg-background/90 text-primary font-semibold"
                  >
                    <Link href={primaryCta.href}>
                      {primaryCta.text}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  {secondaryCta && (
                    <Button 
                      size="lg" 
                      variant="ghost" 
                      asChild 
                      className="border-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground font-medium"
                    >
                      <Link href={secondaryCta.href}>
                        <Star className="mr-2 h-4 w-4" />
                        {secondaryCta.text}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              {/* Visual */}
              {showJourneyVisual && (
                <div className="relative lg:w-[360px]">
                  <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary-foreground/10 to-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 p-8">
                    <div className="absolute inset-2 bg-gradient-to-br from-primary-foreground/10 to-transparent rounded-xl" />
                    
                    {/* Journey Steps */}
                    <div className="relative grid grid-cols-2 gap-8 h-full">
                      <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl hover:bg-primary-foreground/5 transition-colors">
                        <GitCommit className="h-8 w-8 text-primary-foreground/90" />
                        <span className="text-sm font-medium text-primary-foreground/90">Commits</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl hover:bg-primary-foreground/5 transition-colors">
                        <Sparkles className="h-8 w-8 text-primary-foreground/90" />
                        <span className="text-sm font-medium text-primary-foreground/90">Magic</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl hover:bg-primary-foreground/5 transition-colors">
                        <BookOpen className="h-8 w-8 text-primary-foreground/90" />
                        <span className="text-sm font-medium text-primary-foreground/90">Stories</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl hover:bg-primary-foreground/5 transition-colors">
                        <Star className="h-8 w-8 text-primary-foreground/90" />
                        <span className="text-sm font-medium text-primary-foreground/90">Share</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 