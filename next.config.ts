import type { NextConfig } from "next";

// Import server component configuration
import serverConfig from './next.server';

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds to avoid inline style warnings
    ignoreDuringBuilds: true,
  },
  
  // SEO and Performance optimizations
  compress: true,
  
  // Enable experimental features for better SEO
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons"],
    // Add server components external packages
    serverComponentsExternalPackages: serverConfig.serverComponentsExternalPackages,
  },

  // Set Node.js module polyfills for the browser environment
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs', 'child_process' etc on the client to prevent errors
      config.resolve.fallback = {
        fs: false,
        child_process: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  
  // Headers for better SEO and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
