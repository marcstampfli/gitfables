/**
 * @module lib/fonts
 * @description Font configuration using Next.js built-in font optimization.
 * Configures the Inter font family for use throughout the application.
 *
 * @example
 * ```tsx
 * import { fontSans } from '@/lib/fonts'
 * 
 * function MyComponent() {
 *   return (
 *     <div className={fontSans.variable}>
 *       <p>Text using Inter font</p>
 *     </div>
 *   )
 * }
 * ```
 */

import { Inter } from 'next/font/google'

/**
 * Inter font configuration
 * Optimized and self-hosted using Next.js font optimization
 * 
 * @constant
 * @type {import('next/font/google').NextFont}
 */
export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
}) 