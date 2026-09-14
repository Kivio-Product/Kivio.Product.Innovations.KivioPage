import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { ThemeScript } from "@/theme/theme-script";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "../../public/fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/poppins-700.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/poppins-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const neutra = localFont({
  src: [{ path: "../../public/fonts/NeutraText-BookAlt.woff2", weight: "400", style: "normal" }],
  variable: "--font-neutra",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KIVIO SAS — Transformamos ideas en Software",
    template: "%s · KIVIO SAS",
  },
  description:
    "Software a la medida, eCommerce, aerolíneas e Inteligencia Artificial. Convertimos empresas en IA-Native.",
  icons: { icon: "/brand/favicon.png" },
  metadataBase: new URL("https://www.kivio.com.co"),
  openGraph: {
    title: "KIVIO SAS",
    description: "Transformamos ideas en Software",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`dark ${poppins.variable} ${neutra.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <style>{`
          :root { --font-sans: var(--font-poppins), Poppins, system-ui, sans-serif; --font-display: var(--font-neutra), NeutraText, var(--font-poppins), sans-serif; }
        `}</style>
      </head>
      <body className="min-h-dvh bg-bg font-sans text-fg antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
