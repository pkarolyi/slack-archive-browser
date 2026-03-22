/** @type {import('next').NextConfig} */
const nextConfig = {
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
