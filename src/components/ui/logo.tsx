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
        'rounded-lg relative overflow-hidden',
        sizeClasses[size].container
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_50%)]" />
        <GitBranch className={cn(
          'relative text-white',
          sizeClasses[size].icon
        )} />
        <BookOpen className={cn(
          'absolute text-white/90',
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