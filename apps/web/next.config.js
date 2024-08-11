/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow any hostname
        port: "",
        pathname: "**", // Allow any path
      },
      {
        protocol: "http",
        hostname: "**", // Allow any hostname
        port: "",
        pathname: "**", // Allow any path
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}
