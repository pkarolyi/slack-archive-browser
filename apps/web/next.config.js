const path = require("node:path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../.."),
  transpilePackages: ["@sab/db"],
  images: {
    remotePatterns: [
      { hostname: "avatars.slack-edge.com" },
      { hostname: "secure.gravatar.com" },
      { hostname: "a.slack-edge.com" },
    ],
    dangerouslyAllowLocalIP: true,
  },
};

module.exports = nextConfig;
