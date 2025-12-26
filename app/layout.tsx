import type { Metadata } from "next";
import "./globals.css";
import { AuthGuard } from "@/components/AuthGuard";
import { SessionRefresh } from "@/components/SessionRefresh";

export const metadata: Metadata = {
  title: "Calculadora RED Veterinaria",
  description: "Calculadora de Requerimientos de Energía Diarios (RED) para perros y gatos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <AuthGuard>
          <SessionRefresh />
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}

