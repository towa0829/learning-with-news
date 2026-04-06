import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hub.cbsistatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sportshub.cbsistatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cbsistatic.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
