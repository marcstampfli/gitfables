/**
 * @module postcss.config
 * @description PostCSS configuration file that defines the CSS processing pipeline.
 * Configures TailwindCSS and Autoprefixer for modern CSS processing.
 *
 * @example
 * ```ts
 * // This config is automatically loaded by PostCSS
 * // It's used by both development and production builds
 * ```
 */

import type { Config } from 'postcss-load-config'

/**
 * PostCSS configuration object
 * @type {Config}
 */
const config: Config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config 