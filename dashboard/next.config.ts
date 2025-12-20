import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  // Turbopack configuration for Next.js 16
  turbopack: {},

  // Handle MongoDB and other server-only packages
  serverExternalPackages: [
    'mongodb',
    'mongodb-client-encryption',
    '@mongodb-js/zstd',
    'aws4',
    'snappy',
    'kerberos',
  ],

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },
};

export default nextConfig;
