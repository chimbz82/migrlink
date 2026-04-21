/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@migralink/db', '@migralink/compliance-engine', '@migralink/document-parser'],
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
};

export default nextConfig;
