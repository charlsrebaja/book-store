/** @type {import('next').NextConfig} */

// Bundle analyzer - optional
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  // ✅ PERFORMANCE OPTIMIZATIONS
  reactStrictMode: true,
  swcMinify: true, // Already default in Next.js 14
  productionBrowserSourceMaps: false, // Reduce bundle in production
  compress: true,

  // ✅ IMAGE OPTIMIZATION
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**", // Allow all Cloudinary paths
      },
    ],
    // Optimize formats
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year for static images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ✅ CACHE HEADERS - Strict cache-busting strategy
  async headers() {
    return [
      // ALL HTML pages - NEVER cache, always revalidate
      {
        source: "/:path((?!api|_next).*)",
        has: [
          {
            type: "header",
            key: "content-type",
            value: "text/html",
          },
        ],
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate, max-age=0, public",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
          {
            key: "Surrogate-Control",
            value: "no-store",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      // Root path and all pages
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate, max-age=0, public",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
          {
            key: "Surrogate-Control",
            value: "no-store",
          },
        ],
      },
      // All non-API, non-_next routes
      {
        source: "/:path((?!api|_next).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate, max-age=0, public",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
        ],
      },
      // API routes - short cache (1 minute)
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, s-maxage=120",
          },
        ],
      },
      // Static assets with content hash - long cache (1 year)
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      // Fonts - long cache (1 year)
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Google Fonts - long cache
      {
        source: "/(.*)\\.ttf",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Images - 30 day cache
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, immutable",
          },
        ],
      },
    ];
  },

  // ✅ WEBPACK OPTIMIZATION
  webpack: (config, { isServer }) => {
    config.optimization.moduleIds = "deterministic";

    if (!isServer) {
      // Split chunks for better caching
      config.optimization.runtimeChunk = "single";
      config.optimization.splitChunks = {
        cacheGroups: {
          // Vendor libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          // Common code shared between pages
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }

    return config;
  },

  // ✅ EXPERIMENTAL OPTIMIZATIONS
  experimental: {
    optimizePackageImports: ["next-auth"],
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
  },

  // Environment variables
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
