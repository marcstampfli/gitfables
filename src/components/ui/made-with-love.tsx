/**
 * @module components/ui/made-with-love
 * @description A reusable component that displays "Made with love" with an animated heart
 */

import { cn } from '@/lib/utils'

interface MadeWithLoveProps {
  className?: string
}

export function MadeWithLove({ className }: MadeWithLoveProps) {
  return (
    <div className={cn("flex items-center gap-1 text-muted-foreground", className)}>
      <span className="text-xs">Made with</span>
      <div className="inline-flex animate-heartbeat">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5"
          aria-hidden="true"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#ef4444"
            className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.2)]"
          />
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="url(#heart-gradient)"
          />
          <defs>
            <linearGradient
              id="heart-gradient"
              x1="12"
              y1="3"
              x2="12"
              y2="21.35"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="text-xs">by</span>
      <a
        href="https://github.com/marcstampfli"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium hover:text-foreground transition-colors"
      >
        Marc Stampfli
      </a>
    </div>
  )
} 