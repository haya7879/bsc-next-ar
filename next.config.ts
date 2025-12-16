import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Disable production source maps to avoid source map parsing issues
  productionBrowserSourceMaps: false,
};

export default nextConfig;
