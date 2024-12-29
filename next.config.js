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
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    // Type checking is done via separate tsc command
    ignoreBuildErrors: true,
  },
  eslint: {
    // Disable ESLint during builds since we run it separately
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Disable experimental features that might cause type issues
    typedRoutes: false,
  },
}

export default nextConfig 