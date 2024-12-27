/**
 * @module eslint.config
 * @description ESLint configuration for the project, using the new flat config format.
 * Configures TypeScript, React, and Next.js linting rules with appropriate globals.
 *
 * @example
 * ```ts
 * // This config is automatically loaded by ESLint
 * // You can also reference it in package.json scripts:
 * {
 *   "scripts": {
 *     "lint": "eslint ."
 *   }
 * }
 * ```
 */

import type { Linter } from 'eslint'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import * as tsPlugin from '@typescript-eslint/eslint-plugin'
import * as nextPlugin from '@next/eslint-plugin-next'

/**
 * ESLint configuration array using the new flat config format
 * @type {Linter.FlatConfig[]}
 */
const config: Linter.FlatConfig[] = [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      globals: {
        React: 'readonly',
        JSX: 'readonly',
        process: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        Blob: 'readonly',
        crypto: 'readonly',
        NodeJS: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLTextAreaElement: 'readonly',
        HTMLParagraphElement: 'readonly',
        HTMLHeadingElement: 'readonly',
        HTMLSpanElement: 'readonly',
        KeyboardEvent: 'readonly',
        Response: 'readonly',
        Request: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin as any,
      '@next/next': nextPlugin as any,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'no-undef': 'error',
      'no-unused-vars': 'off',
      'no-redeclare': 'error',
    },
  },
]

export default config 