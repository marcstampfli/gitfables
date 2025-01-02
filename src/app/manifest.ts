import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GitFables',
    short_name: 'GitFables',
    description: 'Transform your Git history into engaging stories',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F7FF',
    theme_color: '#9333EA',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable'
      },
      {
        src: '/favicon.ico',
        sizes: '16x16',
        type: 'image/x-icon'
      }
    ]
  }
} 