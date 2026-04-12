import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  // Allow SVG inline in dangerouslySetInnerHTML (used for project placeholder art)
  // No additional config needed for that.
}

export default nextConfig
