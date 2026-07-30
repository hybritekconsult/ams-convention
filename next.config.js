/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server-side rendering — required for Server Actions (registration form)
  // and JSON file storage. Deploy via cPanel Node.js app.
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow unoptimized images on shared hosting (no sharp binary needed)
    unoptimized: true,
  },
};

module.exports = nextConfig;
