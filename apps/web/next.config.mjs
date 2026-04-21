/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@migralink/db',
    '@migralink/compliance-engine',
    '@migralink/document-parser',
    '@migralink/risk-scoring',
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
