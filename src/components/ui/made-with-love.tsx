/**
 * @module components/ui/made-with-love
 * @description Shared "Made with love" component
 */

import { cn } from '@/lib/utils'

interface MadeWithLoveProps {
  /** Additional CSS classes to apply to the container */
  className?: string
}

/**
 * Shared "Made with love" component
 * 
 * @component
 * @example
 * ```tsx
 * <MadeWithLove />
 * ```
 */
export function MadeWithLove({ className }: MadeWithLoveProps) {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      Made with{' '}
      <span className="inline-block animate-pulse" aria-label="love">
        ❤️
      </span>
      {' '}by{' '}
      <a
        href="https://github.com/marcstampfli"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline underline-offset-4 hover:text-foreground"
      >
        Marc Stampfli
      </a>
    </p>
  )
} 