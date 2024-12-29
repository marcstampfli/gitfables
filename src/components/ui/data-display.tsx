/**
 * @module components/ui/data-display
 * @description Shared data display components for consistent data presentation
 */

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

/**
 * Badge component props
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive'
  size?: 'default' | 'sm' | 'lg'
}

/**
 * Badge component for displaying status and labels
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium',
          {
            'bg-primary text-primary-foreground': variant === 'default',
            'bg-secondary text-secondary-foreground': variant === 'secondary',
            'border border-input bg-background': variant === 'outline',
            'bg-destructive text-destructive-foreground': variant === 'destructive',
          },
          {
            'px-2.5 py-0.5 text-xs': size === 'sm',
            'px-3 py-1 text-sm': size === 'default',
            'px-4 py-1.5 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

/**
 * Card component props
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'ghost'
  padding?: 'none' | 'sm' | 'default' | 'lg'
}

/**
 * Card component for displaying content in a contained area
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border shadow-sm',
          {
            'bg-card text-card-foreground': variant === 'default',
            'bg-secondary text-secondary-foreground': variant === 'secondary',
            'bg-transparent border-none shadow-none': variant === 'ghost',
          },
          {
            'p-0': padding === 'none',
            'p-4': padding === 'sm',
            'p-6': padding === 'default',
            'p-8': padding === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

/**
 * List component props
 */
export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  variant?: 'default' | 'separator' | 'bullet'
  spacing?: 'none' | 'sm' | 'default' | 'lg'
}

/**
 * List component for displaying items in a list format
 */
export const List = forwardRef<HTMLUListElement, ListProps>(
  ({ className, variant = 'default', spacing = 'default', ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn(
          {
            'list-none': variant === 'default' || variant === 'separator',
            'list-disc list-inside': variant === 'bullet',
          },
          {
            'space-y-0': spacing === 'none',
            'space-y-1': spacing === 'sm',
            'space-y-2': spacing === 'default',
            'space-y-4': spacing === 'lg',
          },
          variant === 'separator' && 'divide-y divide-border',
          className
        )}
        {...props}
      />
    )
  }
)
List.displayName = 'List'

/**
 * ListItem component props
 */
export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode
  action?: React.ReactNode
}

/**
 * ListItem component for displaying individual list items
 */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, icon, action, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(
          'flex items-center py-2',
          className
        )}
        {...props}
      >
        {icon && <span className="mr-2 shrink-0">{icon}</span>}
        <span className="flex-1">{children}</span>
        {action && <span className="ml-2 shrink-0">{action}</span>}
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'

/**
 * Table component props
 */
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  variant?: 'default' | 'striped'
  size?: 'default' | 'sm' | 'lg'
}

/**
 * Table component for displaying tabular data
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <div className="w-full overflow-auto">
        <table
          ref={ref}
          className={cn(
            'w-full caption-bottom text-sm',
            {
              'even:bg-muted': variant === 'striped',
            },
            {
              '[&_th]:p-2 [&_td]:p-2': size === 'sm',
              '[&_th]:p-4 [&_td]:p-4': size === 'default',
              '[&_th]:p-6 [&_td]:p-6': size === 'lg',
            },
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
Table.displayName = 'Table'

/**
 * TableHeader component
 */
export function TableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  )
}

/**
 * TableBody component
 */
export function TableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

/**
 * TableRow component
 */
export function TableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    />
  )
}

/**
 * TableCell component
 */
export function TableCell({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn('align-middle [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    />
  )
}

/**
 * TableHead component
 */
export function TableHead({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  )
} 