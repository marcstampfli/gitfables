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
    <section className={cn("py-24 relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-purple-600">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(0,0,0,0.2),_transparent_50%)]" />
            
            <div className="relative px-8 py-20 sm:px-20 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1 text-left">
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                  {title}
                  {titleHighlight && (
                    <>
                      <br />
                      <span className="text-white/90">{titleHighlight}</span>
                    </>
                  )}
                </h2>
                <p className="text-xl text-white/80 max-w-[500px] mb-8">
                  {description}
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    asChild 
                    className="shadow-lg hover:shadow-xl transition-all duration-200 bg-white hover:bg-white/90 text-primary"
                    icon={<ArrowRight className="h-4 w-4" />} 
                    iconPosition="right"
                  >
                    <Link href={primaryCta.href}>
                      {primaryCta.text}
                    </Link>
                  </Button>
                  {secondaryCta && (
                    <Button 
                      size="lg" 
                      variant="ghost" 
                      asChild 
                      className="border-2 border-white/20 text-white hover:bg-white/10 hover:text-white"
                      icon={<Star className="h-4 w-4" />}
                      iconPosition="left"
                    >
                      <Link href={secondaryCta.href}>
                        {secondaryCta.text}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
              
              {showJourneyVisual && (
                <div className="flex-1 flex justify-center">
                  <div className="relative w-full max-w-[400px] aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/10" />
                    <div className="absolute inset-4 bg-gradient-to-br from-white/10 to-transparent rounded-xl" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white space-y-6 p-8">
                        <div className="flex items-center gap-3">
                          <GitCommit className="h-5 w-5 text-white/70" />
                          <span className="text-sm text-white/70">Commits</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Sparkles className="h-5 w-5 text-white/70" />
                          <span className="text-sm text-white/70">AI Magic</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-white/70" />
                          <span className="text-sm text-white/70">Stories</span>
                        </div>
                        <div className="h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent my-4" />
                        <div className="flex items-center gap-3">
                          <ArrowRight className="h-5 w-5 text-white" />
                          <span className="text-sm font-medium text-white">Your Journey</span>
                        </div>
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