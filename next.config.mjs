/** @type {import('next').NextConfig} */
const nextConfig = {
  // Esta opción le dice a Next.js que ignore el aviso de Webpack
  // y use Turbopack de forma segura en producción.
  experimental: {
    turbopack: {},
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Configuración de Webpack
  webpack: (config, { dev, isServer }) => {
    // Solo aplicar polling si estamos en modo desarrollo
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;