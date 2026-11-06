import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Admin photo uploads go through a Server Action (1MB by default). Stays under the proxy's
    // 10MB body buffer; the form allows MAX_UPLOAD_MB (8MB) of photos plus the other fields.
    serverActions: { bodySizeLimit: "9mb" },
  },
  images: {
    // Neon Object Storage, public_read bucket "assets": https://<branch>.storage.c-N.<region>.aws.neon.tech/assets/...
    remotePatterns: [{ protocol: "https", hostname: "**.aws.neon.tech", pathname: "/assets/**" }],
  },
  // The shop listing moved to the home page; query strings (filters) are passed through.
  redirects: async () => [{ source: "/products", destination: "/", permanent: true }],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
