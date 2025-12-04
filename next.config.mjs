/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'demo-biker-sl.fdf-canada.org',
                pathname: '**',
            }
        ]
    },
};

export default nextConfig;
