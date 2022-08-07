/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
