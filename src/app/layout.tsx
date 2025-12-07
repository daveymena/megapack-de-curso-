import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "40 MEGAPACKS - Cursos y Recursos Digitales",
  description: "Oferta especial: 40 megapacks de cursos y recursos digitales por solo $15.00 USD o 40.000 COP. Aprende, crea y crece con nuestra mega colección.",
  keywords: ["megapacks", "cursos", "recursos digitales", "oferta", "educación", "aprendizaje"],
  authors: [{ name: "MEGAPACKS" }],
  openGraph: {
    title: "40 MEGAPACKS - Cursos y Recursos Digitales",
    description: "Oferta especial: 40 megapacks de cursos y recursos digitales por solo $15.00 USD o 40.000 COP",
    url: "https://megapacks.com",
    siteName: "MEGAPACKS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "40 MEGAPACKS - Cursos y Recursos Digitales",
    description: "Oferta especial: 40 megapacks de cursos y recursos digitales por solo $15.00 USD o 40.000 COP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
