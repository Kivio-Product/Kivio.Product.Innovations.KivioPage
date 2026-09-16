import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { ThemeScript } from "@/theme/theme-script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/motion/motion";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema, SITE_URL, SITE_NAME } from "@/lib/seo";
import "../globals.css";

const poppins = localFont({
  src: [
    { path: "../../../public/fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "../../../public/fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "../../../public/fonts/poppins-700.woff2", weight: "700", style: "normal" },
    { path: "../../../public/fonts/poppins-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const neutra = localFont({
  src: [{ path: "../../../public/fonts/NeutraText-BookAlt.woff2", weight: "400", style: "normal" }],
  variable: "--font-neutra",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} - ${dict.home.heroTitle}`,
      template: `${SITE_NAME} - %s`,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
    formatDetection: { email: false, telephone: false, address: false },
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
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const locale = getLocale(lang);

  return (
    <html
      lang={locale === "en" ? "en" : "es-CO"}
      className={`dark ${poppins.variable} ${neutra.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <style>{`
          :root { --font-sans: var(--font-poppins), Poppins, system-ui, sans-serif; --font-display: var(--font-neutra), NeutraText, var(--font-poppins), sans-serif; }
        `}</style>
      </head>
      <body className="min-h-dvh bg-bg font-sans text-fg antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema(locale)]} />
        <ThemeProvider>
          <ScrollProgress />
          <Header lang={locale} dict={dict} />
          <main>{children}</main>
          <Footer lang={locale} dict={dict} />
        </ThemeProvider>
      </body>
    </html>
  );
}
