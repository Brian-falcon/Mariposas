import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { AuthGuard } from "@/components/AuthGuard";
import { InstallPwaBanner } from "@/components/InstallPwaBanner";
import { RegisterServiceWorker } from "@/components/RegisterServiceWorker";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mariposas - Aprendiendo jugando",
  description:
    "Plataforma educativa interactiva para personas con discapacidades cognitivas",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mariposas",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mariposas" />
      </head>
      <body className={`${nunito.className} min-h-screen flex flex-col`}>
        <RegisterServiceWorker />
        <AuthProvider>
          <InstallPwaBanner />
          <Header />
          <main className="flex-1">
          <AuthGuard>{children}</AuthGuard>
        </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
