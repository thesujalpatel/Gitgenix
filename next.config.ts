import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds to avoid inline style warnings
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
