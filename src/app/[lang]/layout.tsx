import { notFound } from "next/navigation";
import { locales, isLocale } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HtmlLang } from "@/components/layout/HtmlLang";
import { ScrollProgress } from "@/components/motion/motion";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    title: dict.home.heroTitle,
    description: dict.meta.description,
    alternates: {
      languages: { es: "/es", en: "/en" },
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
    <>
      <HtmlLang lang={locale} />
      <ScrollProgress />
      <Header lang={locale} dict={dict} />
      <main>{children}</main>
      <Footer lang={locale} dict={dict} />
    </>
  );
}
