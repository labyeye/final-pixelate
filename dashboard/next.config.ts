import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 👇 ADD THIS
  experimental: {
    turbo: false,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  serverExternalPackages: ['mongodb'],

  webpack: (config, { isServer }) => {
    if (!isServer) {
      const webpack = require('webpack');

      config.resolve.fallback = {
        ...config.resolve.fallback,
        child_process: false,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        util: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };

      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        mongodb: false,
        'mongodb-client-encryption': false,
        '@mongodb-js/zstd': false,
      };

      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp:
            /^(mongodb-client-encryption|child_process|worker_threads|perf_hooks|dns|fs|net|tls|timers\/promises|fs\/promises)$/,
        })
      );
    }

    config.externals = config.externals || [];
    config.externals.push({
      'mongodb-client-encryption': 'commonjs mongodb-client-encryption',
      aws4: 'commonjs aws4',
      snappy: 'commonjs snappy',
      kerberos: 'commonjs kerberos',
      '@mongodb-js/zstd': 'commonjs @mongodb-js/zstd',
    });

    return config;
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },
};

export default nextConfig;
