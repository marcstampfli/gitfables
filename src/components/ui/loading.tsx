/**
 * @module components/ui/loading
 * @description Shared loading components for consistent loading states
 */

import { cn } from '@/lib/utils'
import { Icons } from './icons'
import { Skeleton } from './feedback'

/**
 * LoadingOverlay component props
 */
export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  blur?: boolean
  spinner?: boolean
  text?: string
}

/**
 * LoadingOverlay component for full-screen or container loading states
 */
export function LoadingOverlay({
  className,
  blur = true,
  spinner = true,
  text,
  ...props
}: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 z-50 flex items-center justify-center',
        blur && 'bg-background/80 backdrop-blur-sm',
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center space-y-4">
        {spinner && <Icons.spinner className="h-8 w-8 animate-spin" />}
        {text && (
          <p className="text-sm font-medium text-muted-foreground">{text}</p>
        )}
      </div>
    </div>
  )
}

/**
 * LoadingPage component props
 */
export interface LoadingPageProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
}

/**
 * LoadingPage component for full-page loading states
 */
export function LoadingPage({ className, text, ...props }: LoadingPageProps) {
  return (
    <div
      className={cn(
        'flex min-h-[400px] flex-col items-center justify-center',
        className
      )}
      {...props}
    >
      <Icons.spinner className="h-8 w-8 animate-spin" />
      {text && (
        <p className="mt-4 text-sm font-medium text-muted-foreground">{text}</p>
      )}
    </div>
  )
}

/**
 * LoadingCard component props
 */
export interface LoadingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number
}

/**
 * LoadingCard component for card loading states
 */
export function LoadingCard({
  className,
  rows = 3,
  ...props
}: LoadingCardProps) {
  return (
    <div
      className={cn('space-y-4 p-6', className)}
      {...props}
    >
      <Skeleton className="h-8 w-[200px]" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  )
}

/**
 * LoadingTable component props
 */
export interface LoadingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number
  columns?: number
}

/**
 * LoadingTable component for table loading states
 */
export function LoadingTable({
  className,
  rows = 5,
  columns = 4,
  ...props
}: LoadingTableProps) {
  return (
    <div
      className={cn('space-y-4', className)}
      {...props}
    >
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-8" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, j) => (
            <Skeleton key={j} className="h-12" />
          ))}
        </div>
      ))}
    </div>
  )
}

/**
 * LoadingList component props
 */
export interface LoadingListProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number
  withImage?: boolean
}

/**
 * LoadingList component for list loading states
 */
export function LoadingList({
  className,
  rows = 5,
  withImage = false,
  ...props
}: LoadingListProps) {
  return (
    <div
      className={cn('space-y-4', className)}
      {...props}
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          {withImage && (
            <Skeleton className="h-12 w-12 rounded-full" />
          )}
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
} 