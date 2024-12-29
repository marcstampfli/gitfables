/**
 * @module types/next
 * @description Type declarations for Next.js modules.
 * These declarations enable TypeScript support for Next.js modules
 * that don't have built-in type definitions.
 * 
 * @example
 * ```ts
 * import Link from 'next/link'
 * import { useRouter } from 'next/navigation'
 * import { cookies } from 'next/headers'
 * 
 * // Use Next.js components and utilities
 * const MyComponent = () => {
 *   const router = useRouter()
 *   return <Link href="/">Home</Link>
 * }
 * ```
 */

/** Type declaration for Next.js Link component */
declare module 'next/link';

/** Type declaration for Next.js navigation utilities */
declare module 'next/navigation';

/** Type declaration for Next.js headers utilities */
declare module 'next/headers'; 