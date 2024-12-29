/**
 * @module next.config
 * @description Next.js configuration file that defines project-wide settings and features.
 * Configures image optimization, strict mode, and other Next.js-specific options.
 *
 * @example
 * ```ts
 * // This config is automatically loaded by Next.js
 * // You can also reference it in custom server setups:
 * import config from './next.config.js'
 * ```
 */

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'gitlab.com',
      'bitbucket.org',
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

export default config 