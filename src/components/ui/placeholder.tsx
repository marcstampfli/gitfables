/**
 * @module components/ui/placeholder
 * @description Shared placeholder components for consistent placeholder content
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Icons } from './icons'

/**
 * ImagePlaceholder component props
 */
export interface ImagePlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: 'square' | 'video' | 'wide'
  icon?: React.ReactNode
}

/**
 * ImagePlaceholder component for displaying image placeholders
 */
export function ImagePlaceholder({
  className,
  aspectRatio = 'square',
  icon,
  ...props
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-lg border bg-muted',
        {
          'aspect-square': aspectRatio === 'square',
          'aspect-video': aspectRatio === 'video',
          'aspect-[2/1]': aspectRatio === 'wide',
        },
        className
      )}
      {...props}
    >
      {icon || <Icons.media className="h-8 w-8 text-muted-foreground" />}
    </div>
  )
}

/**
 * AvatarPlaceholder component props
 */
export interface AvatarPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'lg'
  icon?: React.ReactNode
}

/**
 * AvatarPlaceholder component for displaying avatar placeholders
 */
export function AvatarPlaceholder({
  className,
  size = 'default',
  icon,
  ...props
}: AvatarPlaceholderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-muted',
        {
          'h-8 w-8': size === 'sm',
          'h-10 w-10': size === 'default',
          'h-12 w-12': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {icon || <Icons.user className="text-muted-foreground" />}
    </div>
  )
}

/**
 * TextPlaceholder component props
 */
export interface TextPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number
  lastLineWidth?: 'full' | 'short' | 'medium'
}

/**
 * TextPlaceholder component for displaying text placeholders
 */
export function TextPlaceholder({
  className,
  lines = 3,
  lastLineWidth = 'medium',
  ...props
}: TextPlaceholderProps) {
  return (
    <div
      className={cn('space-y-2', className)}
      {...props}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 rounded-lg bg-muted',
            {
              'w-full': i !== lines - 1 || lastLineWidth === 'full',
              'w-1/2': i === lines - 1 && lastLineWidth === 'short',
              'w-3/4': i === lines - 1 && lastLineWidth === 'medium',
            }
          )}
        />
      ))}
    </div>
  )
}

/**
 * CardPlaceholder component props
 */
export interface CardPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: boolean
  header?: boolean
  footer?: boolean
}

/**
 * CardPlaceholder component for displaying card placeholders
 */
export function CardPlaceholder({
  className,
  image = true,
  header = true,
  footer = true,
  ...props
}: CardPlaceholderProps) {
  return (
    <div
      className={cn('rounded-lg border', className)}
      {...props}
    >
      {image && (
        <ImagePlaceholder
          aspectRatio="wide"
          className="rounded-t-lg border-b"
        />
      )}
      <div className="space-y-4 p-4">
        {header && (
          <div className="space-y-2">
            <div className="h-4 w-1/2 rounded-lg bg-muted" />
            <div className="h-3 w-1/4 rounded-lg bg-muted" />
          </div>
        )}
        <TextPlaceholder />
        {footer && (
          <div className="flex items-center space-x-4">
            <AvatarPlaceholder size="sm" />
            <div className="space-y-1">
              <div className="h-3 w-24 rounded-lg bg-muted" />
              <div className="h-2.5 w-16 rounded-lg bg-muted" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * ListPlaceholder component props
 */
export interface ListPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: number
  withImage?: boolean
}

/**
 * ListPlaceholder component for displaying list placeholders
 */
export function ListPlaceholder({
  className,
  items = 5,
  withImage = false,
  ...props
}: ListPlaceholderProps) {
  return (
    <div
      className={cn('space-y-4', className)}
      {...props}
    >
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          {withImage && (
            <ImagePlaceholder
              aspectRatio="square"
              className="h-12 w-12"
            />
          )}
          <div className="space-y-2 flex-1">
            <div className="h-4 w-full rounded-lg bg-muted" />
            <div className="h-3 w-3/4 rounded-lg bg-muted" />
          </div>
        </div>
      ))}
    </div>
  )
} 