/** @type {import('next').NextConfig} */
const nextConfig = {};

// Solo aplicamos la configuración de Webpack para el polling en modo local
// para que Vercel (Producción) pueda usar Turbopack sin dar errores.
if (process.env.NODE_ENV === 'development') {
    nextConfig.webpack = (config, context) => {
        config.watchOptions = {
            poll: 1000, // Necesario para el Hot-Reload en Docker Windows
            aggregateTimeout: 300,
        };
        return config;
    };
}

export default nextConfig;
