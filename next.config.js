/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.urllize.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
