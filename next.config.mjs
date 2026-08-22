/** @type {import('next').NextConfig} */
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  experimental: {
    optimizePackageImports: ["date-fns"],
  },
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.lighty.today",
      },
      {
        protocol: "https",
        hostname: "api.lighty.today",
      },
      ...(isProd
        ? []
        : [{ protocol: "http", hostname: "localhost", port: "8000" }]),
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "image.com",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
