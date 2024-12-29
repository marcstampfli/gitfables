/**
 * @module components/ui/navigation
 * @description Shared navigation components for consistent navigation elements
 */

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { forwardRef } from 'react'

/**
 * NavLink component props
 */
export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  exact?: boolean
  icon?: React.ReactNode
  badge?: React.ReactNode
}

/**
 * NavLink component for consistent navigation links
 */
export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, href, exact = false, icon, badge, children, ...props }, ref) => {
    const pathname = usePathname()
    const isActive = exact
      ? pathname === href
      : pathname.startsWith(href)

    return (
      <Link
        href={href}
        className={cn(
          'inline-flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
          isActive && 'bg-accent text-accent-foreground',
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children && <span>{children}</span>}
        {badge && <span className="ml-auto">{badge}</span>}
      </Link>
    )
  }
)
NavLink.displayName = 'NavLink'

/**
 * Breadcrumb component props
 */
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    label: string
  }[]
}

/**
 * Breadcrumb component for consistent breadcrumb navigation
 */
export function Breadcrumb({ className, items, ...props }: BreadcrumbProps) {
  return (
    <nav
      className={cn('flex items-center space-x-1 text-sm', className)}
      {...props}
    >
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && (
            <span className="mx-2 text-muted-foreground">/</span>
          )}
          <Link
            href={item.href}
            className={cn(
              'hover:text-foreground',
              index === items.length - 1
                ? 'text-foreground font-medium'
                : 'text-muted-foreground'
            )}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  )
}

/**
 * TabNavigation component props
 */
export interface TabNavigationProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    label: string
    icon?: React.ReactNode
    badge?: React.ReactNode
  }[]
}

/**
 * TabNavigation component for consistent tab navigation
 */
export function TabNavigation({
  className,
  items,
  ...props
}: TabNavigationProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'flex space-x-1 rounded-lg bg-muted p-1',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'inline-flex flex-1 items-center justify-center space-x-2 rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-background hover:text-foreground hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            pathname === item.href
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground'
          )}
        >
          {item.icon && <span className="shrink-0">{item.icon}</span>}
          <span>{item.label}</span>
          {item.badge && <span className="ml-auto">{item.badge}</span>}
        </Link>
      ))}
    </nav>
  )
}

/**
 * Pagination component props
 */
export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

/**
 * Pagination component for consistent pagination navigation
 */
export function Pagination({
  className,
  currentPage,
  totalPages,
  onPageChange,
  ...props
}: PaginationProps) {
  return (
    <nav
      className={cn('flex items-center space-x-2', className)}
      {...props}
    >
      <button
        className="inline-flex h-8 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={cn(
              'inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              currentPage === page &&
                'bg-accent text-accent-foreground'
            )}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className="inline-flex h-8 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </nav>
  )
} 