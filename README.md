# 🌟 Motivem Web App


<div align="center">
  <br />
  <strong>[Ver Demo en Vivo](https://web-motivem-next.vercel.app/)</strong>
  <br /><br />
</div>

## 🛠️ Stack Tecnológico

Este proyecto ha sido desarrollado aplicando las últimas versiones de las tecnologías más demandadas en el mercado actual:

* **Frontend:** Next.js (App Router), React 19, Tailwind CSS v4.
* **Componentes UI/UX:** SwiperJS (Carruseles), AOS (Animaciones al Scroll), Lucide React & React-Icons.
* **Backend:** Next.js API Routes (Serverless Functions en Vercel).
* **Base de Datos:** MongoDB local (con Docker) y MongoDB Atlas en la nube (ODM: Mongoose).
* **Seguridad:** JSON Web Tokens (JWT) y encriptación de contraseñas con `bcryptjs`.
* **DevOps:** Docker & Docker Compose (Entorno de desarrollo local aislado).
* **Despliegue (CI/CD):** Vercel (Producción continua).

---

## ✨ Características Principales

* ✅ **Autenticación Completa (Full-Stack):** Sistema de Registro y Login seguro con JWT. Las contraseñas se almacenan encriptadas (*hash* + *salt*) en la BD.
* ✅ **Rutas Protegidas:** Sistema de seguridad backend donde la descarga de archivos PDF solo se autoriza mediante validación de tokens en los *Headers* (Endpoint `/api/pdf/descargar`).
* ✅ **Diseño *Responsive* Avanzado:** Interfaz fluida programada "Mobile-First" utilizando las clases de utilidad de Tailwind CSS.
* ✅ **Arquitectura Separada por Entornos:** Configuración profesional que enlaza el entorno local a un Docker de pruebas (`docker-compose up`) y el entorno de producción a MongoDB Atlas mediante variables ocultas en Vercel.
* ✅ **Patrón Singleton BD:** La conexión a la base de datos está programada para mantener una única instancia viva y evitar problemas de límite de peticiones en despliegues Serverless.

---

## 💻 Instalación y Configuración Local

Sigue estos pasos para levantar por completo el proyecto (Frontend + Base de Datos) en tu ordenador:

```bash
# 1. Clonar el proyecto
git clone https://github.com/pablocd8/web-motivem-next.git
cd web-motivem-next

# 2. Instalar dependencias puras
npm install

# 3. Configurar variables de entorno locales
# (Copia la plantilla y la renombra a .env.local para que Git no la rastree)
cp .env.example .env.local

# 4. Levantar la base de datos de pruebas (MongoDB + MongoExpress en segundo plano)
docker-compose up -d

# 5. Ejecutar la aplicación en modo desarrollo con turbopack
npm run dev
```
La aplicación estará disponible de inmediato en **[http://localhost:3000](http://localhost:3000)**.


## 📁 Estructura del Código

La arquitectura del proyecto sigue las mejores prácticas orientadas a **escalabilidad y mantenibilidad** del App Router de Next.js:

```text
web-motivem-next/
├── app/                      # 🛣️ Frontend y Backend (App Router)
│   ├── api/                  # ⚙️ Endpoints del backend integrado (Serverless)
│   │   ├── auth/             # Controladores de Login y Registro
│   │   └── pdf/              # Endpoints privados (Middlewares verificadores de Token)
│   │
│   ├── (rutas de la web)/    # 🎨 Páginas públicas de la aplicación
│   │   ├── login/
│   │   ├── register/
│   │   ├── servicios/
│   │   └── guia-familias/
│   │
│   ├── globals.css           # 💅 Estilos globales (Tailwind CSS configurado)
│   └── layout.js             # 🏗️ Layout maestro (Providers JWT incrustados)
│
├── components/               # 🧩 Componentes UI Reutilizables y dinámicos
│   └── (varios)/             # Carruseles Swiper, Header responsive, Mapas iFrame
│
├── context/                  # 🌍 Gestores de estado global (React Context API)
│   └── AuthContext.jsx       # Gestión y validación de sesiones JWT en LocalStorage
│
├── lib/                      # 🧰 Librerías y utilidades core (Lógica pura)
│   ├── models/               # Esquemas estrictos de Mongoose (Validaciones previas BD)
│   ├── mongodb.js            # Conexión Singleton (Patrón arquitectónico de BD)
│   └── auth.js               # Encriptación de Payloads y firmas de seguridad (JWT)
│
├── public/                   # 🖼️ Assets públicos (Logos, imágenes)
├── files/                    # 📄 Assets privados para clientes
│
├── .env.example              # 🔐 Contrato con otros devs (Qué variables necesita la app)
├── docker-compose.yml        # 🐳 Orquestación de infraestructura local (BD Node + GUI DB)
└── package.json              # 📦 Dependencias Core
```

---

## 👨‍💻 Autor y Licencia

Desarrollado como Proyecto Final de **DAW (Desarrollo de Aplicaciones Web)**.

**Autor:** Pablo C. D.


Este proyecto está bajo la Licencia **MIT**.
