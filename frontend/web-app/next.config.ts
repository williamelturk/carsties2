import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    output:"standalone",
    turbopack: {
        root: __dirname,
    },
    logging: {
        fetches: {
            fullUrl: true
        }
    },
    images: {
        remotePatterns: [
            {protocol: 'https', hostname:'cdn.pixabay.com'},
            {protocol: 'https', hostname:'loremflickr.com'}
        ]
    },
    reactCompiler: true,
};

export default nextConfig;
