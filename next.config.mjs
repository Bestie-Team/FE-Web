/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d20j4cey9ep9gv.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
