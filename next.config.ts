import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    return config;
  },
  turbopack: {
    rules: {
      "*.graphql": {
        loaders: ["graphql-tag/loader"],
        as: "*.js",
      },
      "*.gql": {
        loaders: ["graphql-tag/loader"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
