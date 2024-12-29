import { GitBranch, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogoProps {
  /** Whether to show the text next to the logo */
  showText?: boolean
  /** Additional CSS classes to apply to the container */
  className?: string
  /** Size variant of the logo */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Logo component for GitFables
 * 
 * @component
 * @example
 * ```tsx
 * // Default with text
 * <Logo />
 * 
 * // Icon only
 * <Logo showText={false} />
 * 
 * // Custom size
 * <Logo size="sm" />
 * ```
 */
export function Logo({ showText = true, className, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: {
      container: 'p-2',
      icon: 'w-6 h-6',
      bookIcon: 'w-3 h-3 -top-0.5 -right-0.5',
      text: 'text-lg'
    },
    md: {
      container: 'p-3',
      icon: 'w-8 h-8',
      bookIcon: 'w-4 h-4 -top-1 -right-1',
      text: 'text-2xl'
    },
    lg: {
      container: 'p-4',
      icon: 'w-12 h-12',
      bookIcon: 'w-6 h-6 -top-1 -right-1',
      text: 'text-3xl'
    }
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn(
        'bg-primary text-primary-foreground rounded-lg relative',
        sizeClasses[size].container
      )}>
        <GitBranch className={sizeClasses[size].icon} />
        <BookOpen className={cn(
          'absolute',
          sizeClasses[size].bookIcon
        )} />
      </div>
      {showText && (
        <span className={cn(
          'font-bold tracking-tight',
          sizeClasses[size].text
        )}>
          GitFables
        </span>
      )}
    </div>
  )
} 