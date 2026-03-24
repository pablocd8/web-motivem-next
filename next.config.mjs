/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, context) => {
    if (context.dev) {
      config.watchOptions = {
        poll: 1000, // Comprueba cambios cada 1 segundo (necesario para Docker en Windows)
        aggregateTimeout: 300,
      }
    }
    return config
  },
};

export default nextConfig;
