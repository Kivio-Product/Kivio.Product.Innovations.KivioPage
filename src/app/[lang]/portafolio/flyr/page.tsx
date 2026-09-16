import Image from "next/image";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/page-seo";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero, FeatureGrid } from "@/components/shared/PageHero";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ContactBlock } from "@/components/shared/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata(params, (d) => ({
    title: `${d.flyr.title} — ${d.portfolio.items[0].tag}`,
    description: d.flyr.lead,
    path: "portafolio/flyr",
  }));
}

export default async function FlyrPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero lang={lang} path="portafolio/flyr" title={dict.flyr.title} lead={dict.flyr.lead} leadScroll>
        <div className="mb-8 flex flex-wrap items-center gap-8">
          <Image src="/images/pages/flyr-logo-big.png" alt="FLYR" width={220} height={40} className="h-8 w-auto object-contain dark:invert-0" />
          <Image src="/images/pages/newshore-logo.png" alt="Newshore" width={220} height={48} className="h-10 w-auto object-contain" />
        </div>
        <Button href="#contacto">{dict.common.requestConsult}</Button>
      </PageHero>
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Image
            src="/images/pages/flyr-equipo.png"
            alt=""
            width={900}
            height={600}
            className="w-full rounded-[25px] object-cover"
          />
          <div>
            <h2 className="mb-6 font-display text-3xl text-fg">{dict.flyr.featuresTitle}</h2>
            <div className="grid gap-4">
              {dict.flyr.features.map((f) => (
                <article key={f.title} className="rounded-2xl border border-border bg-surface p-5">
                  <h3 className="font-semibold text-fg">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <Section className="bg-bg-soft">
        <Container>
          <h2 className="mb-10 font-display text-3xl text-fg">{dict.airlines.reasonsTitle}</h2>
          <FeatureGrid items={dict.airlines.reasons} numbered />
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="mb-10 font-display text-3xl text-fg">{dict.home.productsTitle}</h2>
          <ProductGrid lang={lang} dict={dict} />
        </Container>
      </Section>
      <ContactBlock dict={dict} />
    </>
  );
}
