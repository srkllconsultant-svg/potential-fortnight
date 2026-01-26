import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '15mb', // Set this slightly higher than your 10MB UI limit
    },
  },
};

export default nextConfig;