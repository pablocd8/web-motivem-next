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
  title: "Motivem psicología y aprendizaje integral",
  description: "Motivem psicologia y aprendizaje integral",
  keywords: "psicologia, aprendizaje, integral, motivacion",
  authors: [{ name: "Motivem Team" }],
  icons: {
    icon: "/Logo-negro.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={quicksand.variable}>
      <body>
        <AuthProvider>
          <AosInit />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
