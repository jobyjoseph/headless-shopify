import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.shopify.com", "images.unsplash.com", "plus.unsplash.com"],
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
