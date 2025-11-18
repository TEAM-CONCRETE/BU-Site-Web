import type { NextConfig } from "next";

//임시로 samesite 설정을 위해 프록시 추가함
const proxyTarget = process.env.API_PROXY_TARGET?.replace(/\/$/, "") ?? null;

const nextConfig: NextConfig = {
  async rewrites() {
    if (!proxyTarget) {
      return [];
    }

    return [
      {
        source: "/api/:path*",
        destination: `${proxyTarget}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
