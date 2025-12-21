import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Disable production source maps to avoid source map parsing issues
  productionBrowserSourceMaps: false,
  images: {
    qualities: [60, 65, 70, 75],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'ar.bscenter.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ar.bscenter.org',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'api-ar.bscenter.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api-ar.bscenter.org',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'api.bscenter.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.bscenter.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bscenter.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.dmca.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
