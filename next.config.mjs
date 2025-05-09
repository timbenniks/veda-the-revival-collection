/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://eu-images.contentstack.com/**")],
  },
};

export default nextConfig;
