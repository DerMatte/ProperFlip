import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ziyhywzeptctkeuvaryj.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'ziyhywzeptctkeuvaryj.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/properties/**',
      },
      {
        protocol: 'https',
        hostname: 'ziyhywzeptctkeuvaryj.supabase.co',
        port: '',
        pathname: '/storage/v1/object/sign/property-images/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
};

export default nextConfig;
