/**
 * @module types/next-eslint
 * @description Type declarations for Next.js ESLint configuration and plugins.
 * These declarations enable TypeScript support for Next.js-specific ESLint configurations
 * and plugins, providing better type safety and IDE support.
 * 
 * @example
 * ```ts
 * // In .eslintrc.js
 * import type { Linter } from 'eslint'
 * import nextConfig from 'eslint-config-next'
 * import nextPlugin from '@next/eslint-plugin-next'
 * 
 * const config: Linter.Config = {
 *   extends: ['next'],
 *   plugins: ['@next/next'],
 *   rules: {
 *     ...nextPlugin.rules
 *   }
 * }
 * ```
 */

import type { Linter } from 'eslint'

/**
 * Type declaration for Next.js ESLint configuration.
 * Provides type safety for the default Next.js ESLint configuration.
 * 
 * @example
 * ```ts
 * import nextConfig from 'eslint-config-next'
 * 
 * export default {
 *   extends: ['next'],
 *   ...nextConfig
 * }
 * ```
 */
declare module 'eslint-config-next' {
  const config: Linter.Config
  export default config
}

/**
 * Type declaration for Next.js ESLint plugin.
 * Provides type safety for Next.js-specific ESLint rules and configurations.
 * 
 * @example
 * ```ts
 * import nextPlugin from '@next/eslint-plugin-next'
 * 
 * export default {
 *   plugins: ['@next/next'],
 *   rules: {
 *     '@next/next/no-html-link-for-pages': 'error',
 *     ...nextPlugin.rules
 *   }
 * }
 * ```
 */
declare module '@next/eslint-plugin-next' {
  const plugin: {
    /** Next.js-specific ESLint rules */
    rules: Record<string, unknown>
    /** Predefined rule configurations */
    configs: Record<string, unknown>
  }
  export = plugin
} 