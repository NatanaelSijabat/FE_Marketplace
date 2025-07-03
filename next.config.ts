import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  env: {
    api: `${process.env.NEXTAUTH_API}`,
  }

};

export default nextConfig;
