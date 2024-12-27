/**
 * @module types/next-eslint
 * @description Type declarations for Next.js ESLint configuration and plugins
 */

import type { Linter } from 'eslint'

declare module 'eslint-config-next' {
  const config: Linter.Config
  export default config
}

declare module '@next/eslint-plugin-next' {
  const plugin: {
    rules: Record<string, unknown>
    configs: Record<string, unknown>
  }
  export = plugin
} 