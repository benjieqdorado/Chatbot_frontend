// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
// }

// module.exports = nextConfig
module.exports = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/chat/:path*',
        destination: 'http://localhost:5000/chatgpt/question:path*', // Replace with the actual Flask server URL
      },
    ];
  },
};

