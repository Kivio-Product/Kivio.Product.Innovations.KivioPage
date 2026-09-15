import Image from "next/image";
import { getDictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { PageHero, FeatureGrid } from "@/components/shared/PageHero";
import { ContactBlock } from "@/components/shared/ContactForm";
import { href, routes } from "@/lib/utils";

const resultImgs = [
  "/images/pages/result-ventas.png",
  "/images/pages/result-compra.png",
  "/images/pages/result-inventario.png",
  "/images/pages/result-visibilidad.png",
];

export default async function EcommercePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero kicker={dict.nav.products} title={dict.ecommerce.title} lead={dict.ecommerce.lead}>
        <p className="mb-6 max-w-xl text-lg font-medium text-fg">{dict.ecommerce.subtitle}</p>
        <Button href="#contacto">{dict.common.requestDemo}</Button>
      </PageHero>
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div className="shot-frame">
            <Image
              src="/images/pages/ecommerce-pc.png"
              alt="Kivio eCommerce"
              width={800}
              height={560}
              className="w-full object-contain"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl text-fg">{dict.ecommerce.includesTitle}</h2>
            <ul className="mt-6 space-y-3">
              {dict.ecommerce.includes.map((item) => (
                <li key={item} className="rounded-2xl border border-border bg-surface px-5 py-4 text-sm font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
      <Section className="bg-bg-soft">
        <Container>
          <h2 className="mb-10 font-display text-3xl text-fg">{dict.ecommerce.benefitsTitle}</h2>
          <FeatureGrid items={dict.ecommerce.benefits} />
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="mb-10 font-display text-3xl text-fg">{dict.ecommerce.resultsTitle}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dict.ecommerce.results.map((r, i) => (
              <article key={r.title} className="rounded-[20px] border border-border bg-surface p-5 text-center">
                <Image src={resultImgs[i]} alt="" width={160} height={180} className="mx-auto h-32 w-auto object-contain" />
                <h3 className="mt-4 font-semibold text-fg">{r.title}</h3>
                <p className="mt-2 text-sm text-muted">{r.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-bg-soft">
        <Container>
          <Eyebrow>{dict.ecommerce.exampleTitle}</Eyebrow>
          <h2 className="mb-6 font-display text-3xl text-fg">{dict.ecommerce.exampleName}</h2>
          <a href="https://merkko.com.co/" target="_blank" rel="noreferrer">
            <Image src="/images/pages/merkko-mockup.webp" alt="Merkko" width={1200} height={700} className="w-full rounded-[25px] object-cover" />
          </a>
          <Button href={href(lang, routes.merkko)} variant="outline" className="mt-6">
            {dict.common.seeMore}
          </Button>
        </Container>
      </Section>
      <Section>
        <Container className="text-center">
          <h2 className="mx-auto max-w-3xl font-display text-3xl text-fg sm:text-4xl">{dict.ecommerce.ctaTitle}</h2>
        </Container>
      </Section>
      <ContactBlock dict={dict} />
    </>
  );
}
