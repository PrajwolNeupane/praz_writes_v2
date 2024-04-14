/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env:{
    API_HOST:process.env.API_HOST || 'http://localhost:3000'
  }
};

export default nextConfig;
