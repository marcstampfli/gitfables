/**
 * @module components/marketing/page-header
 * @description Reusable page header component for marketing pages with gradient title
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  titleGradient?: string
  description?: string
  className?: string
  children?: React.ReactNode
  size?: 'default' | 'large'
}

export function PageHeader({
  title,
  titleGradient,
  description,
  className,
  children,
  size = 'default'
}: PageHeaderProps) {
  const [titleStart, titleEnd] = titleGradient 
    ? title.split(titleGradient)
    : [title]

  return (
    <section className={cn(
      "relative py-20",
      size === 'large' && "sm:py-32",
      className
    )}>
      <div className="container relative">
        <div className="max-w-[800px] mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h1 className={cn(
              "font-bold tracking-tight",
              size === 'default' && "text-4xl sm:text-5xl",
              size === 'large' && "text-4xl sm:text-6xl lg:text-7xl"
            )}>
              {titleStart}
              {titleGradient && (
                <>
                  <br />
                  <span className="relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 blur-2xl opacity-25" />
                    <span className="relative bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      {titleGradient}
                    </span>
                  </span>
                  {titleEnd}
                </>
              )}
            </h1>
            {description && (
              <p className={cn(
                "text-muted-foreground max-w-[600px] mx-auto",
                size === 'default' && "text-lg",
                size === 'large' && "text-xl"
              )}>
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  )
} 