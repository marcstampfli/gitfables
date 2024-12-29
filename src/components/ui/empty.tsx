/**
 * @module components/ui/empty
 * @description Shared empty state components for consistent empty states
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Icons } from './icons'
import { Button } from './button'

/**
 * EmptyState component props
 */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

/**
 * EmptyState component for displaying empty states
 */
export function EmptyState({
  className,
  icon,
  title = 'No items found',
  description,
  action,
  children,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center space-y-4 text-center',
        className
      )}
      {...props}
    >
      {icon || (
        <div className="rounded-full bg-muted p-3">
          <Icons.circle className="h-6 w-6 text-muted-foreground" />
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-lg font-medium tracking-tight">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {children}
      </div>
      {action && (
        <Button
          variant="outline"
          onClick={action.onClick}
          className="space-x-2"
        >
          <Icons.add className="h-4 w-4" />
          <span>{action.label}</span>
        </Button>
      )}
    </div>
  )
}

/**
 * EmptySearch component props
 */
export interface EmptySearchProps extends Omit<EmptyStateProps, 'icon' | 'title'> {
  query: string
}

/**
 * EmptySearch component for displaying empty search results
 */
export function EmptySearch({
  className,
  query,
  description = 'Try adjusting your search to find what you\'re looking for.',
  ...props
}: EmptySearchProps) {
  return (
    <EmptyState
      className={className}
      icon={
        <div className="rounded-full bg-muted p-3">
          <Icons.help className="h-6 w-6 text-muted-foreground" />
        </div>
      }
      title={`No results for "${query}"`}
      description={description}
      {...props}
    />
  )
}

/**
 * EmptyFilter component props
 */
export interface EmptyFilterProps extends Omit<EmptyStateProps, 'icon' | 'title'> {
  reset: () => void
}

/**
 * EmptyFilter component for displaying empty filter results
 */
export function EmptyFilter({
  className,
  description = 'Try adjusting your filters or clear them to show results.',
  reset,
  ...props
}: EmptyFilterProps) {
  return (
    <EmptyState
      className={className}
      icon={
        <div className="rounded-full bg-muted p-3">
          <Icons.warning className="h-6 w-6 text-muted-foreground" />
        </div>
      }
      title="No matching items"
      description={description}
      action={{
        label: 'Reset filters',
        onClick: reset,
      }}
      {...props}
    />
  )
}

/**
 * EmptyList component props
 */
export interface EmptyListProps extends Omit<EmptyStateProps, 'icon'> {
  create?: () => void
}

/**
 * EmptyList component for displaying empty lists
 */
export function EmptyList({
  className,
  title = 'No items yet',
  description = 'Get started by creating your first item.',
  create,
  ...props
}: EmptyListProps) {
  return (
    <EmptyState
      className={className}
      icon={
        <div className="rounded-full bg-muted p-3">
          <Icons.add className="h-6 w-6 text-muted-foreground" />
        </div>
      }
      title={title}
      description={description}
      action={
        create
          ? {
              label: 'Create item',
              onClick: create,
            }
          : undefined
      }
      {...props}
    />
  )
} 