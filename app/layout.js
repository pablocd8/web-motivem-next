import { Quicksand } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import AosInit from "@/components/AosInit";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const metadata = {
  metadataBase: new URL("https://motivem.es"),
  title: {
    default: "Motivem | Psicología y Aprendizaje Integral",
    template: "%s | Motivem",
  },
  description: "Centro de psicología y aprendizaje integral en Ontinyent(Valencia). Especialistas en psicología clínica, dificultades de aprendizaje y bienestar emocional.",
  keywords: ["psicología", "aprendizaje integral", "logopedia", "terapia infantil", "psicología adultos", "Ontinyent", "Valencia"],
  authors: [{ name: "Motivem Team" }],
  creator: "Motivem",
  publisher: "Motivem",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Motivem | Psicología y Aprendizaje Integral",
    description: "Centro de psicología y aprendizaje integral. Crecemos contigo.",
    url: "https://motivem.es",
    siteName: "Motivem",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/Logo-negro.png",
        width: 800,
        height: 600,
        alt: "Motivem Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Motivem | Psicología y Aprendizaje Integral",
    description: "Centro de psicología y aprendizaje integral. Crecemos contigo.",
    images: ["/Logo-negro.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/Logo-negro.png",
    shortcut: "/Logo-negro.png",
    apple: "/Logo-negro.png",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Motivem - Psicología y Aprendizaje Integral",
    "image": "https://motivem.es/Logo-negro.png",
    "@id": "https://motivem.es",
    "url": "https://motivem.es",
    "telephone": "+34644542790",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. d'Albaida, 19",
      "addressLocality": "Ontinyent",
      "postalCode": "46870",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "38.82291",
      "longitude": "-0.60376"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "10:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.facebook.com/motivem.psicologia",
      "https://www.instagram.com/motivem.psicologia"
    ]
  };

  return (
    <html lang="es" className={quicksand.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <AuthProvider>
          <AosInit />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
