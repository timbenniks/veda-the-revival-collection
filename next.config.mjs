/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://eu-images.contentstack.com/**"),
      new URL("https://res.cloudinary.com/**"),
    ],
  },
  async redirects() {
    return [
      {
        source: "/categories",
        destination: "/",
        permanent: true, // 308 cache-forever
      },
      {
        source: "/categories/",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
