import type { Metadata } from "next";
import "./globals.css";
import { ClientAuthProvider } from "@/components/ClientAuthProvider";

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
        <ClientAuthProvider>
          {children}
        </ClientAuthProvider>
      </body>
    </html>
  );
}

