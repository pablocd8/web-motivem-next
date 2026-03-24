/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {}, 
    webpack: (config, context) => {
        // Solo aplicar polling en desarrollo
        if (context.dev) {
            config.watchOptions = {
                poll: 1000,
                aggregateTimeout: 300,
            };
        }
        return config;
    },
};

export default nextConfig;
