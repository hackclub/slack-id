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
        permanent: false,
      },
      {
        source: '/id',
        destination: '/api/auth',
        permanent: false,
      }
    ]
  }
}

module.exports = nextConfig
