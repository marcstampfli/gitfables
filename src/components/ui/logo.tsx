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
 */
export function Logo({ showText = true, className, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: {
      container: 'w-8',
      text: 'text-lg'
    },
    md: {
      container: 'w-10',
      text: 'text-2xl'
    },
    lg: {
      container: 'w-14',
      text: 'text-3xl'
    }
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn('relative aspect-square rounded-[3px] overflow-hidden shadow-sm dark:shadow-none', sizeClasses[size].container)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" className="w-full h-full">
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#9333EA' }}/>
              <stop offset="100%" style={{ stopColor: '#6B21A8' }}/>
            </linearGradient>
            <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.3 }}/>
              <stop offset="50%" style={{ stopColor: 'white', stopOpacity: 0.15 }}/>
              <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0.3 }}/>
            </linearGradient>
          </defs>

          {/* Background with gradient */}
          <rect x="0" y="0" width="80" height="80" fill="url(#bgGradient)"/>

          {/* Open Book */}
          <path d="M20 52 L40 48 L60 52 L60 68 L40 64 L20 68 Z"
                fill="url(#bookGradient)" 
                stroke="white" 
                strokeWidth="2.5"
                strokeLinejoin="round"/>

          {/* Main Branch - Emerging from book */}
          <path d="M40 48 C40 42, 35 38, 35 32 C35 26, 40 22, 40 16" 
                fill="none" 
                stroke="white" 
                strokeWidth="3.5" 
                strokeLinecap="round"/>

          {/* Left Branch */}
          <path d="M35 32 C30 32, 25 28, 22 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="3"
                strokeLinecap="round"/>

          {/* Right Branch */}
          <path d="M35 32 C40 32, 50 28, 54 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="3"
                strokeLinecap="round"/>

          {/* Commit Nodes */}
          <circle cx="40" cy="16" r="3.5" fill="white"/>
          <circle cx="35" cy="32" r="3.5" fill="white"/>
          <circle cx="40" cy="48" r="3.5" fill="white"/>

          {/* Story Elements */}
          <circle cx="22" cy="24" r="5" fill="white" opacity="0.95"/>
          <circle cx="54" cy="24" r="5" fill="white" opacity="0.95"/>

          {/* Book Pages */}
          <path d="M40 48 L40 64" 
                stroke="white" 
                strokeWidth="1.5"
                strokeDasharray="2 3"
                opacity="0.7"/>

          {/* Magical Sparkles */}
          <circle cx="30" cy="20" r="1.2" fill="white" opacity="0.9"/>
          <circle cx="48" cy="20" r="1.2" fill="white" opacity="0.9"/>
          <circle cx="44" cy="36" r="1.2" fill="white" opacity="0.9"/>
          <circle cx="32" cy="40" r="1.2" fill="white" opacity="0.9"/>
        </svg>
      </div>
      {showText && (
        <span className={cn(
          'font-bold tracking-tight text-gray-900 dark:text-white',
          sizeClasses[size].text
        )}>
          GitFables
        </span>
      )}
    </div>
  )
} 