/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.picsum.photos',
                port: '',
                pathname: '/**/**',
                search: '',
            },
        ],
        domains: ["images.pexels.com", "lh3.googleusercontent.com"]
    },
};

export default nextConfig;
