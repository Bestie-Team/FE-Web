/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.lighty.today",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "example.com",
    ],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "cdn.lighty.today",
      // },
      // {
      //   protocol: "https",
      //   hostname: "lh3.googleusercontent.com",
      // },
      // {
      //   protocol: "https",
      //   hostname: "images.unsplash.com",
      // },
      // {
      //   protocol: "https",
      //   hostname: "plus.unsplash.com",
      // },
      // {
      //   protocol: "https",
      //   hostname: "example.com",
      // },
    ],
  },
};

export default nextConfig;
