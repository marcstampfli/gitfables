/**
 * @module components/marketing/page-header
 * @description Reusable page header component for marketing pages with gradient title
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  titleGradient?: string
  description: string
  size?: 'default' | 'large'
  className?: string
  children?: React.ReactNode
}

export function PageHeader({
  title,
  titleGradient,
  description,
  size = 'default',
  className,
  children
}: PageHeaderProps) {
  const titleParts = titleGradient 
    ? title.split(titleGradient)
    : [title]

  return (
    <div className={cn(
      "relative",
      size === 'large' ? "py-24 md:py-28" : "py-16 md:py-20",
      className
    )}>
      <div className="container relative">
        <div className="mx-auto max-w-[800px] text-center">
          <h1 className={cn(
            "font-bold tracking-tight",
            size === 'large' ? "text-4xl md:text-5xl lg:text-6xl" : "text-3xl md:text-4xl lg:text-5xl"
          )}>
            {titleGradient ? (
              <>
                {titleParts[0]}
                <span className="relative inline-flex items-center">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark blur-2xl opacity-25" />
                  <span className="relative bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                    {titleGradient}
                  </span>
                </span>
                {titleParts[1]}
              </>
            ) : title}
          </h1>
          <p className={cn(
            "mt-6 text-muted-foreground",
            size === 'large' ? "text-lg md:text-xl" : "text-base md:text-lg"
          )}>
            {description}
          </p>
          {children}
        </div>
      </div>
    </div>
  )
} 