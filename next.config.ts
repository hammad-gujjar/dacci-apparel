import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Security & basics ───────────────────────────────────────────────────────
  poweredByHeader: false,    // removes X-Powered-By: Next.js (tiny byte saving + security)
  compress: true,            // gzip/brotli compression for JS, CSS, HTML responses

  // ── Image optimisation ──────────────────────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'],  // serve avif first, webp fallback
    minimumCacheTTL: 3600,                  // cache optimised images for 1 hour
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
        search: ''
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // ── Bundle size optimisation ────────────────────────────────────────────────
  experimental: {
    // Tree-shake icon libraries & UI kits — only imports actually used symbols
    optimizePackageImports: [
      'lucide-react',
      'react-icons',
      '@mui/material',
      '@mui/icons-material',
      'recharts',
    ],
  },
};

export default nextConfig;
