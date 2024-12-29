/**
 * @module components/dashboard/shell
 * @description Shell component for dashboard pages
 */

import { cn } from '@/lib/utils'

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div
      className={cn(
        'grid items-start gap-8 p-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
} 