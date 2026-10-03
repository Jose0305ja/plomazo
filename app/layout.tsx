import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = process.env["NEXT_PUBLIC_SITE_URL"];

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: "El Plomazo — Taquería",
  description:
    "Taquerías El Plomazo: tacos y antojitos norteños. Consulta el menú, encuentra tu sucursal más cercana y descubre las promociones activas.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
