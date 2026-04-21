/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@migralink/db', '@migralink/compliance-engine', '@migralink/document-parser'],
};

export default nextConfig;
