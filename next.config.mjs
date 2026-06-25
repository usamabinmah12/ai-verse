/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**', // 💡 এর মানে i.ibb.co-এর অধীনে থাকা যেকোনো ইমেজ অ্যালাউড
      },
    ],
  },
};

export default nextConfig;