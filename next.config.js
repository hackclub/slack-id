/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: 'https://hackclub.com',
        permanent: true,
      },
      {
        source: '/callback',
        destination: '/api/callback',
      },
      {
        source: '/id',
        destination: '/api/auth',
      }
    ]
  }
}

module.exports = nextConfig
