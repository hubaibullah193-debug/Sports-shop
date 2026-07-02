const webpack = require('webpack');

module.exports = {
  extends: 'next/core-web-vitals',
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __NEXT_OPTIMIZED_FONT_LOADING__: JSON.stringify(true),
      })
    );

    config.optimization.splitChunks.cacheGroups = {
      default: false,
      vendors: false,
      vendor: {
        filename: isServer ? '../static/chunks/vendor.js' : 'static/chunks/vendor.js',
        chunks: 'all',
        test: /node_modules/,
      },
    };

    return config;
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['localhost', 'api.localhost', 'images.unsplash.com'],
  },

  compress: true,

  swcMinify: true,

  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-icons',
      'framer-motion',
      'react-icons',
    ],
  },

  redirects: async () => [
    {
      source: '/shop',
      destination: '/shop?page=1',
      permanent: false,
    },
  ],

  rewrites: async () => ({
    beforeFiles: [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ],
  }),
};
