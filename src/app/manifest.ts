import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Control',
    short_name: 'Control',
    description: 'Track progress. Own your goals.',
    start_url: '/login',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1d1d1f',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/icon-192.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icons/icon-512.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  }
}
