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
  async headers() {
    return [
      {
        source: '/api/cron/recordatorios',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/psicologia-infantil-en-ontinyent',
        destination: '/servicios',
        permanent: true,
      },
      {
        source: '/extraescolares',
        destination: '/servicios',
        permanent: true,
      },
      {
        source: '/filosofia',
        destination: '/quienes-somos',
        permanent: true,
      },
      {
        source: '/tecnicas-de-estudio',
        destination: '/servicios/tecnicas-estudio',
        permanent: true,
      },
      {
        source: '/acompanamiento-al-estudio',
        destination: '/servicios/acompanamiento-estudio',
        permanent: true,
      },
      {
        source: '/psicoterapia',
        destination: '/servicios/psicoterapia',
        permanent: true,
      },
      {
        source: '/talleres',
        destination: '/servicios/talleres',
        permanent: true,
      },
      {
        source: '/psicologo-en-ontinyent',
        destination: '/contacto',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;