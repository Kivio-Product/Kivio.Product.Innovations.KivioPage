import Image from "next/image";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/page-seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareAppSchema } from "@/lib/seo";
import { AmbientVideo } from "@/components/shared/AmbientVideo";
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

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata(params, (d) => ({
    title: `${d.ecommerce.title} — ${d.ecommerce.subtitle}`,
    description: d.ecommerce.lead,
    path: "productos/kivio-ecommerce",
  }));
}

export default async function EcommercePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <JsonLd
        data={softwareAppSchema({
          name: dict.ecommerce.title,
          description: dict.ecommerce.lead,
          path: "productos/kivio-ecommerce",
        })}
      />
      <PageHero
        lang={lang}
        path="productos/kivio-ecommerce"
        kicker={dict.nav.products}
        title={dict.ecommerce.title}
        lead={dict.ecommerce.lead}
        leadScroll
        video={{
          lg: "/media/ecommerce-hero-v1-lg.mp4",
          md: "/media/ecommerce-hero-v1-md.mp4",
          poster: "/media/ecommerce-hero-v1-poster.jpg",
          immersive: true,
        }}
        grid={false}
      >
        <p className="mb-6 max-w-xl text-lg font-medium text-fg">{dict.ecommerce.subtitle}</p>
        <Button href="#contacto">{dict.common.requestDemo}</Button>
      </PageHero>
      {/* ── RESULTS (cards with floating icons) ──────────────── */}
      <Section>
        <Container>
          <h2 className="mb-10 font-display text-3xl text-fg">{dict.ecommerce.resultsTitle}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dict.ecommerce.results.map((r, i) => (
              <article key={r.title} className="card-lift rounded-[20px] border border-border bg-surface p-5 text-center">
                <Image
                  src={resultImgs[i]}
                  alt=""
                  width={160}
                  height={180}
                  style={{ animationDelay: `${i * 0.7}s` }}
                  className="float-card mx-auto h-32 w-auto object-contain"
                />
                <h3 className="mt-4 font-semibold text-fg">{r.title}</h3>
                <p className="mt-2 text-sm text-muted">{r.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      {/* ── INCLUDES (background video, Kivio CMS banner pattern) ── */}
      <Section className="relative isolate overflow-hidden lg:min-h-[640px]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] sm:h-full lg:right-[26%]" aria-hidden>
          <AmbientVideo
            lg="/media/ecommerce-admin-v1-lg.mp4"
            md="/media/ecommerce-admin-v1-md.mp4"
            poster="/media/ecommerce-admin-v1-poster.jpg"
            intensity="hero"
            veil="none"
            blend={false}
            mediaClassName="dark:brightness-90"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--bg)_72%,transparent)_0%,color-mix(in_srgb,var(--bg)_68%,transparent)_46%,var(--bg)_92%)] lg:bg-[linear-gradient(270deg,var(--bg)_30%,color-mix(in_srgb,var(--bg)_94%,transparent)_38%,color-mix(in_srgb,var(--bg)_60%,transparent)_50%,transparent_68%)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-bg to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-bg to-transparent" aria-hidden />
        <Container className="relative flex justify-end">
          <div className="w-full lg:w-[46%]">
            <h2 className="font-display text-3xl text-fg">{dict.ecommerce.includesTitle}</h2>
            <ul className="mt-6 space-y-3">
              {dict.ecommerce.includes.map((item, index) => (
                <li
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-surface/85 px-5 py-4 text-sm font-medium text-fg backdrop-blur-md"
                >
                  <span className="font-mono text-xs text-accent-ink" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
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
      {/* ── CTA (background video) ───────────────────────────── */}
      <Section className="relative isolate overflow-hidden">
        <AmbientVideo
          lg="/media/ecommerce-cta-v1-lg.mp4"
          md="/media/ecommerce-cta-v1-md.mp4"
          poster="/media/ecommerce-cta-v1-poster.jpg"
          intensity="section"
          veil="none"
          blend={false}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--bg)_50%,transparent)_0%,color-mix(in_srgb,var(--bg)_80%,transparent)_36%,color-mix(in_srgb,var(--bg)_80%,transparent)_64%,color-mix(in_srgb,var(--bg)_50%,transparent)_100%)] dark:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--bg)_28%,transparent)_0%,color-mix(in_srgb,var(--bg)_64%,transparent)_36%,color-mix(in_srgb,var(--bg)_64%,transparent)_64%,color-mix(in_srgb,var(--bg)_28%,transparent)_100%)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-bg to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-bg to-transparent" aria-hidden />
        <Container className="relative text-center">
          <h2 className="mx-auto max-w-3xl font-display text-3xl text-fg sm:text-4xl">{dict.ecommerce.ctaTitle}</h2>
        </Container>
      </Section>
      <ContactBlock dict={dict} />
    </>
  );
}
