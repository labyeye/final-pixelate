import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  turbopack: {},

  serverExternalPackages: [
    "mongodb",
    "mongodb-client-encryption",
    "@mongodb-js/zstd",
    "aws4",
    "snappy",
    "kerberos",
    
    
    
    
    "@react-pdf/renderer",
    "@react-pdf/reconciler",
    "@react-pdf/layout",
    "@react-pdf/render",
    "@react-pdf/image",
    "@react-pdf/font",
    "@react-pdf/pdfkit",
    "@react-pdf/primitives",
    "@react-pdf/fns",
    "@react-pdf/types",
  ],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
    ],
  },
};

export default nextConfig;
