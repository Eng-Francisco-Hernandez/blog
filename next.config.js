/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/landing",
        permanent: false,
        basePath: false,
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
