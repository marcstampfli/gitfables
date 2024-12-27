/**
 * @module lib/utils
 * @description Common utility functions for string manipulation, array operations,
 * type checking, and other general-purpose tasks used throughout the application.
 *
 * @example
 * ```ts
 * import { cn, formatDate, truncate } from '@/lib/utils'
 * 
 * // Merge Tailwind classes
 * const className = cn('text-lg', isActive && 'font-bold')
 * 
 * // Format a date
 * const formattedDate = formatDate(new Date())
 * ```
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names with Tailwind CSS classes
 * 
 * @param {...ClassValue[]} inputs - Class names to merge
 * @returns {string} Merged class names string
 * 
 * @example
 * ```ts
 * cn('px-2 py-1', 'bg-blue-500', isActive && 'font-bold')
 * // => 'px-2 py-1 bg-blue-500 font-bold'
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string to a human-readable format
 * 
 * @param {string | Date} date - Date to format
 * @returns {string} Formatted date string
 * 
 * @example
 * ```ts
 * formatDate(new Date('2024-01-01'))
 * // => 'January 1, 2024'
 * ```
 */
export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Format a number with commas as thousand separators
 * 
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 * 
 * @example
 * ```ts
 * formatNumber(1234567)
 * // => '1,234,567'
 * ```
 */
export function formatNumber(num: number) {
  return new Intl.NumberFormat('en-US').format(num)
}

/**
 * Truncate a string to a maximum length and append ellipsis
 * 
 * @param {string} str - String to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated string
 * 
 * @example
 * ```ts
 * truncate('Hello World', 5)
 * // => 'Hello...'
 * ```
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

/**
 * Generate a cryptographically secure random string
 * 
 * @param {number} length - Length of the string to generate
 * @returns {string} Random string
 * 
 * @example
 * ```ts
 * generateRandomString(10)
 * // => 'aB3cD9eF2h'
 * ```
 */
export function generateRandomString(length: number): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const values = new Uint8Array(length)
  crypto.getRandomValues(values)
  for (let i = 0; i < length; i++) {
    result += charset[values[i] % charset.length]
  }
  return result
}

/**
 * Debounce a function call
 * 
 * @param {T} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 * 
 * @example
 * ```ts
 * const debouncedSearch = debounce((query) => {
 *   // Search logic here
 * }, 300)
 * ```
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Deep clone an object
 * 
 * @param {T} obj - Object to clone
 * @returns {T} Cloned object
 * 
 * @example
 * ```ts
 * const original = { a: 1, b: { c: 2 } }
 * const clone = deepClone(original)
 * ```
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Type guard to check if a value is defined (not null or undefined)
 * 
 * @param {T | undefined | null} value - Value to check
 * @returns {boolean} True if value is defined
 * 
 * @example
 * ```ts
 * const value: string | undefined = getValue()
 * if (isDefined(value)) {
 *   // value is string here
 * }
 * ```
 */
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

/**
 * Group an array of objects by a key
 * 
 * @param {T[]} array - Array to group
 * @param {keyof T} key - Key to group by
 * @returns {Record<string, T[]>} Grouped object
 * 
 * @example
 * ```ts
 * const users = [{ role: 'admin', name: 'John' }, { role: 'user', name: 'Jane' }]
 * const grouped = groupBy(users, 'role')
 * // => { admin: [{ role: 'admin', name: 'John' }], user: [{ role: 'user', name: 'Jane' }] }
 * ```
 */
export function groupBy<T>(
  array: T[],
  key: keyof T
): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const value = String(item[key])
      return {
        ...groups,
        [value]: [...(groups[value] || []), item],
      }
    },
    {} as Record<string, T[]>
  )
}

/**
 * Sort an array of objects by a key
 * 
 * @param {T[]} array - Array to sort
 * @param {keyof T} key - Key to sort by
 * @param {'asc' | 'desc'} [order='asc'] - Sort order
 * @returns {T[]} Sorted array
 * 
 * @example
 * ```ts
 * const users = [{ age: 30 }, { age: 25 }]
 * const sorted = sortBy(users, 'age', 'desc')
 * // => [{ age: 30 }, { age: 25 }]
 * ```
 */
export function sortBy<T>(
  array: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * Create an array with a range of numbers
 * 
 * @param {number} start - Start number
 * @param {number} end - End number
 * @returns {number[]} Array of numbers
 * 
 * @example
 * ```ts
 * range(1, 5)
 * // => [1, 2, 3, 4, 5]
 * ```
 */
export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

/**
 * Sleep for a specified duration
 * 
 * @param {number} ms - Duration in milliseconds
 * @returns {Promise<void>} Promise that resolves after the duration
 * 
 * @example
 * ```ts
 * async function example() {
 *   await sleep(1000) // Wait for 1 second
 * }
 * ```
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Type for partial deep object
 */
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Type for deep object
 */
type DeepObject = Record<string, unknown>

/**
 * Type for values that can be merged
 */
type DeepMergeValue = string | number | boolean | null | undefined | DeepObject

/**
 * Deep merge two objects
 * 
 * @param {T} target - Target object
 * @param {DeepPartial<T>} source - Source object
 * @returns {T} Merged object
 * 
 * @example
 * ```ts
 * const target = { a: 1, b: { c: 2 } }
 * const source = { b: { d: 3 } }
 * const merged = deepMerge(target, source)
 * // => { a: 1, b: { c: 2, d: 3 } }
 * ```
 */
export function deepMerge<T extends Record<string, DeepMergeValue>>(
  target: T,
  source: DeepPartial<T>
): T {
  const output = { ...target }
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      const sourceValue = source[key as keyof T]
      const targetValue = target[key as keyof T]

      if (isObject(sourceValue)) {
        if (!(key in target)) {
          Object.assign(output, { [key]: sourceValue })
        } else {
          output[key as keyof T] = deepMerge(
            targetValue as Record<string, DeepMergeValue>,
            sourceValue as Record<string, DeepMergeValue>
          ) as T[keyof T]
        }
      } else {
        Object.assign(output, { [key]: sourceValue })
      }
    })
  }
  return output
}

/**
 * Check if a value is a plain object
 * 
 * @param {unknown} item - Value to check
 * @returns {boolean} True if value is a plain object
 * 
 * @private
 */
function isObject(item: unknown): item is Record<string, DeepMergeValue> {
  return item !== null && typeof item === 'object' && !Array.isArray(item)
} 