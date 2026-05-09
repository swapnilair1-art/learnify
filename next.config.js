/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  // Build standalone server output to make server deployment easier
  output: 'standalone',
}

module.exports = nextConfig
