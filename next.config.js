/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    // domains: ['arkaf-admin.namacoders-clients.xyz', 'ebroker.wrteam.me', 'lh3.googleusercontent.com'],
    domains: ['arkaf-admin.namacoders-clients.xyz', 'ebroker.wrteam.me'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arkaf-admin.namacoders-clients.xyz',
        pathname: '/assets/images/**'
      }
    ]
  },
  devIndicators: {
    buildActivity: false
  },
  trailingSlash: true,
  reactStrictMode: false,
  webpack: (config, { isServer, dev }) => {
    if (isServer) {
      require('./scripts/sitemap-generator');
    }
    
    // Enable source maps in development and production
    if (!dev) {
      config.devtool = 'source-map';
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    };

    return config;
  }
};

// Conditionally set the output based on the environment
if (process.env.NEXT_PUBLIC_SEO === "false") {
  nextConfig.output = 'export';
  nextConfig.images.unoptimized = true;
}

module.exports = nextConfig;
