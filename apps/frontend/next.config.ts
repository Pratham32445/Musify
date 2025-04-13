import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ['picsum.photos', 'source.unsplash.com',"i.ytimg.com","avatar.vercel.sh"]
  }
};

export default nextConfig;
