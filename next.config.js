/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'gitlab.com',
      'bitbucket.org',
    ],
  },
}

module.exports = nextConfig 