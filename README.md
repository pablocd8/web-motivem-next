# 🌟 Motivem Web App

<div align="center">
  <br />
  <strong>[www.motivem.es](https://www.motivem.es/)</strong>
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
* **Correo transaccional:** [Resend](https://resend.com/) para notificaciones y formularios.
* **Almacenamiento de archivos:** Supabase Storage (bucket `Materiales`) para documentos compartidos con pacientes; el código usa la *service role key* solo en servidor.

---

## ✨ Características Principales

* ✅ **Autenticación Completa (Full-Stack):** Sistema de Registro y Login seguro con JWT. Las contraseñas se almacenan encriptadas (*hash* + *salt*) en la BD.
* ✅ **Rutas Protegidas:** Sistema de seguridad backend donde la descarga de archivos PDF solo se autoriza mediante validación de tokens en los *Headers* (Endpoint `/api/pdf/descargar`).
* ✅ **Gestión de Citas (Admin):** Panel de administración avanzado para gestionar citas médicas (confirmar, cancelar, completar) con filtros de estado y visualización optimizada para móvil y escritorio.
* ✅ **Notificaciones Automáticas:** Sistema integrado con Resend para correos transaccionales (contacto, talleres personalizados, confirmación/cancelación de citas, recuperación de contraseña, etc.).
* ✅ **Recordatorios de cita (Cron):** Endpoint `/api/cron/recordatorios` para enviar avisos antes de la cita; en producción enlázalo con Vercel Cron u otro scheduler. Si defines `CRON_SECRET`, la petición debe ir con `Authorization: Bearer <CRON_SECRET>`.
* ✅ **Recuperación de contraseña:** Flujos *forgot password* y *reset password* con enlace por correo (requieren `RESEND_API_KEY` y `NEXT_PUBLIC_APP_URL` en producción).
* ✅ **Gestión de Materiales (Admin):** Panel de control exclusivo para administradores que permite subir, listar y eliminar archivos (PDF, Word, Excel, PowerPoint, imágenes) asignados a pacientes; los binarios se guardan en **Supabase Storage** y los metadatos en MongoDB.
* ✅ **Área Personal de Materiales (Usuario):** Los usuarios pueden acceder a una sección privada en su perfil (`/perfil`) para visualizar y descargar los documentos que el administrador ha compartido con ellos.
* ✅ **Diseño *Responsive* Avanzado:** Interfaz fluida programada "Mobile-First" utilizando las clases de utilidad de Tailwind CSS.
* ✅ **Arquitectura Separada por Entornos:** Local con Docker Compose (MongoDB + opcionalmente la app en contenedor) y producción en Vercel con MongoDB Atlas y secretos en variables de entorno.
* ✅ **SEO y metadatos:** `layout.js` con Open Graph, Twitter Cards, `robots` y JSON-LD (`LocalBusiness`); redirecciones permanentes en `next.config.mjs` para URLs antiguas.
* ✅ **Patrón Singleton BD:** La conexión a la base de datos está programada para mantener una única instancia viva y evitar problemas de límite de peticiones en despliegues Serverless.

---

## 📋 Requisitos previos

* **Node.js** (el `Dockerfile` usa **Node 22**; para desarrollo local, usa una versión compatible con Next.js 16 del proyecto).
* **Docker Desktop** (o Docker Engine + Compose) para el entorno con MongoDB y, si lo usas, la app dentro del contenedor.
* Cuenta y credenciales en **Resend** (emails), **Supabase** (materiales) y, en producción, **MongoDB Atlas** o la integración desde Vercel.

---

## 🔐 Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores. Resumen de variables usadas en el código:

| Variable | Uso |
|----------|-----|
| `MONGODB_URI` o `MONGODB_URL` | Conexión a MongoDB (local o Atlas). En `lib/mongodb.js` se aceptan ambos nombres. |
| `JWT_SECRET` | Firma y verificación de tokens JWT (**obligatorio en producción**). |
| `RESEND_API_KEY` | Envío de correos (contacto, citas, recuperación de contraseña). Sin clave, el envío se omite con aviso en consola. |
| `NEXT_PUBLIC_APP_URL` | URL pública de la app (ej. `https://www.motivem.es`) para enlaces del email de restablecimiento de contraseña. Si falta, en local se usa `http://localhost:3000`. |
| `SUPABASE_URL` | URL del proyecto Supabase. |
| `SUPABASE_SERVICE_KEY` | Clave *service role* (solo servidor) para subir/bajar/borrar archivos del bucket; no la expongas al cliente. |
| `CRON_SECRET` | Si está definida, el endpoint `/api/cron/recordatorios` exige `Authorization: Bearer <CRON_SECRET>`. |

En **Supabase**, crea un bucket llamado **`Materiales`** (coincide con el código de `app/api/admin/materiales/route.js`).

### Cuenta con rol `admin`

Los nuevos usuarios se registran con rol `usuario`. Para acceder a `/admin/citas` y `/admin/materiales`, asigna `rol: "admin"` al documento correspondiente en la colección `usuarios` (MongoDB Compass, Mongo Express o `mongosh`).

---

## 💻 Instalación y Configuración Local

Tienes dos enfoques habituales:

### Opción A — Todo el stack con Docker Compose (app + MongoDB + Mongo Express)

El `docker-compose.yml` levanta Next.js dentro del contenedor `app`, MongoDB y la interfaz web **Mongo Express** en el puerto **8082**.

```bash
git clone https://github.com/pablocd8/web-motivem-next.git
cd web-motivem-next
docker compose up -d
```

La aplicación queda en **[http://localhost:3000](http://localhost:3000)** y Mongo Express en **[http://localhost:8082](http://localhost:8082)** (según la configuración del compose). El contenedor de la app ya define `MONGODB_URI` apuntando al servicio `mongo-next`.

Para **emails, Supabase o cron** en este modo, añade las variables al servicio `app` en `docker-compose.yml` o usa un fichero `.env` que Docker Compose cargue automáticamente (no subas secretos al repositorio).

### Opción B — Next.js en tu máquina y solo MongoDB en Docker

Útil si prefieres ejecutar `npm run dev` localmente:

```bash
git clone https://github.com/pablocd8/web-motivem-next.git
cd web-motivem-next
npm install
```

Copia el fichero de entorno (en **PowerShell** en Windows):

```powershell
Copy-Item .env.example .env.local
```

En **bash/macOS/Linux**:

```bash
cp .env.example .env.local
```

Ajusta `MONGODB_URI` en `.env.local` para que coincida con tu Mongo local (en `.env.example` se usa el puerto **27019**, mapeado desde el contenedor en `docker-compose.yml`). Levanta al menos el servicio de base de datos:

```bash
docker compose up -d mongo-next mongo-express-next
```

Luego:

```bash
npm run dev
```

Abre **[http://localhost:3000](http://localhost:3000)**.

### Comandos útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (Webpack, ver `package.json`). |
| `npm run build` | Compilación de producción. |
| `npm run start` | Sirve el build tras `npm run build`. |
| `npm run lint` | ESLint. |

---

## 🌎 Despliegue en Producción (Vercel + MongoDB Atlas)

El entorno de producción se gestiona íntegramente de forma visual Serverless, sin necesidad de tocar código ni variables locales en tu ordenador.

### Paso 1: Desplegar el Código
1. Entra en [Vercel](https://vercel.com/) y haz clic en **Add New... > Project**.
2. Selecciona este repositorio de GitHub (`web-motivem-next`) y dale a **Import**.
3. Haz clic en **Deploy** (La web subirá, pero dará error porque aún no tiene base de datos).

### Paso 2: Configurar MongoDB Atlas (Oficial)
Para que la web guarde los usuarios reales, utilizaremos la integración oficial de Base de Datos:
1. En el panel de tu proyecto en Vercel, ve a la pestaña superior llamada **Storage**.
2. Busca la opción **MongoDB Atlas** y haz clic en **Connect**.
3. Sigue los pasos para iniciar sesión con tu cuenta de Google/MongoDB. Vercel creará un clúster gratuito automáticamente.
4. *¡Magia!* Vercel creará e inyectará automáticamente la variable secreta de conexión (`MONGODB_URL`) en tu proyecto sin que tú la veas.

### Paso 3: Configurar Seguridad y servicios (OBLIGATORIO / recomendado)
1. Ve a la pestaña **Settings > Environment Variables** en Vercel.
2. Añade como mínimo:
   * **`JWT_SECRET`**: cadena larga y aleatoria para firmar los JWT.
   * **`RESEND_API_KEY`**: para correos transaccionales (citas, contacto, recuperación de contraseña).
   * **`NEXT_PUBLIC_APP_URL`**: URL pública del sitio (ej. `https://www.motivem.es`) para enlaces en emails.
   * **`SUPABASE_URL`** y **`SUPABASE_SERVICE_KEY`**: necesarios para subida y descarga de materiales en producción.
   * **`CRON_SECRET`** (opcional pero recomendado): si la defines, configura el mismo valor en la cabecera `Authorization` del job que llame a `/api/cron/recordatorios`.
3. Dale a **Save**.

### Paso 4: Publicar
Ve a la pestaña **Deployments**, haz clic en los tres puntos del último despliegue y selecciona **Redeploy**. ¡Tu web y base de datos ya están conectadas y en vivo!

---

## 📁 Estructura del Código

La arquitectura del proyecto sigue las mejores prácticas orientadas a **escalabilidad y mantenibilidad** del App Router de Next.js:

```text
web-motivem-next/
├── app/                      # 🛣️ Frontend y Backend (App Router)
│   ├── api/                  # ⚙️ Endpoints del backend integrado (Serverless)
│   │   ├── auth/             # Login, registro, perfil, contraseña, forgot/reset
│   │   ├── admin/            # Gestión administrativa (Citas, Materiales)
│   │   │   ├── citas/        # Listado y cambio de estado de citas
│   │   │   └── materiales/   # Subida/listado/borrado (Supabase + MongoDB)
│   │   ├── materiales/       # Listado y descarga para el usuario autenticado
│   │   ├── pdf/descargar/    # Descarga protegida de PDF estático (p. ej. guía familias)
│   │   └── cron/recordatorios/  # Recordatorios de cita (Cron + CRON_SECRET)
│   │
│   ├── actions/              # 📧 Server Actions (emails Resend, lógica de citas)
│   │   ├── sendEmail.js
│   │   └── accionesCita.js
│   │
│   ├── (rutas de la web)/    # 🎨 Páginas públicas y privadas
│   │   ├── admin/            # Panel de Control (Citas y Materiales)
│   │   │   ├── citas/        # Gestión de agenda y estados de citas
│   │   │   └── materiales/   # Gestión de documentos por paciente
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/  # Solicitud de recuperación de contraseña
│   │   ├── reset-password/   # Restablecimiento con token
│   │   ├── perfil/           # Área personal (Contraseña y "Mis Materiales")
│   │   ├── solicitar-cita/   # Sistema de reserva de citas con validación de horarios
│   │   ├── servicios/
│   │   ├── contacto/
│   │   ├── políticas y legalidad (cookies, privacidad, aviso legal, accesibilidad…)
│   │   └── guia-familias/
│   │
│   ├── globals.css           # 💅 Estilos globales (Tailwind CSS configurado)
│   └── layout.js             # 🏗️ Layout maestro (metadata SEO, JSON-LD, providers)
│
├── components/               # 🧩 Componentes UI Reutilizables y dinámicos
│   └── (varios)/             # Carruseles Swiper, Header responsive, Mapas iFrame
│
├── context/                  # 🌍 Gestores de estado global (React Context API)
│   └── AuthContext.jsx       # Gestión y validación de sesiones JWT en LocalStorage
│
├── lib/                      # 🧰 Librerías y utilidades core (Lógica pura)
│   ├── models/               # Esquemas de Mongoose (Usuarios, Citas, Materiales)
│   ├── mongodb.js            # Conexión Singleton (Patrón arquitectónico de BD)
│   ├── auth.js               # Encriptación de Payloads y firmas de seguridad (JWT)
│   └── supabase.js           # Cliente Supabase (service role) para Storage de materiales
│
├── public/                   # 🖼️ Assets públicos (Logos, imágenes)
├── files/                    # 📄 Recursos estáticos servidos por rutas API (p. ej. PDF guía familias)
│   └── (según uso)           # Los materiales por paciente viven en Supabase Storage, no aquí
│
├── .env.example              # 🔐 Contrato con otros devs (Qué variables necesita la app)
├── docker-compose.yml        # 🐳 Orquestación: app Next + MongoDB + Mongo Express
├── vercel.json               # Ajustes de despliegue en Vercel (si aplica)
├── scripts/                  # Utilidades (p. ej. generación de memoria del proyecto en PDF/DOCX)
└── package.json              # 📦 Dependencias y scripts npm
```

---

## 🔧 Solución de problemas

* **Emails que no llegan:** comprueba `RESEND_API_KEY`, el dominio/remitente autorizado en Resend y los logs del servidor.
* **Materiales: error al subir o descargar:** revisa `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` y que exista el bucket **`Materiales`** con permisos acordes a tu política de Storage.
* **JWT inválido o sesión extraña:** asegúrate de que `JWT_SECRET` sea estable entre reinicios en local y distinta de la clave por defecto en producción.
* **MongoDB no conecta en local:** en Opción B, confirma que el contenedor `mongo-next` está arriba y que `MONGODB_URI` usa el puerto **27019** hacia `localhost`.

---

## 👨‍💻 Autor y Licencia

Desarrollado como Proyecto Final de **DAW (Desarrollo de Aplicaciones Web)**.

**Autor:** Pablo C. D.

Este proyecto está bajo la Licencia **MIT**.
