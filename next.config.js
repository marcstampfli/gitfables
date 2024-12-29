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
    // Disable type checking in Next.js since we run it separately
    ignoreBuildErrors: true,
  },
  eslint: {
    // Disable ESLint during builds since we run it separately
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Enable modern features
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
    typedRoutes: true,
  },
}

export default config 