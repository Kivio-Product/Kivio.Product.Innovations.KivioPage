import Image from "next/image";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/page-seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareAppSchema } from "@/lib/seo";
import { AmbientVideo } from "@/components/shared/AmbientVideo";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { ContactBlock } from "@/components/shared/ContactForm";
import { href, routes } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata(params, (d) => ({
    title: `${d.cms.title} — ${d.cms.subtitle}`,
    description: d.cms.lead,
    path: "productos/kivio-cms",
  }));
}

export default async function CmsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <JsonLd
        data={softwareAppSchema({ name: dict.cms.title, description: dict.cms.lead, path: "productos/kivio-cms" })}
      />
      <PageHero
        lang={lang}
        path="productos/kivio-cms"
        kicker={dict.nav.products}
        title={dict.cms.title}
        lead={dict.cms.lead}
        leadScroll
        video={{
          lg: "/media/cms-editor-v1-lg.mp4",
          md: "/media/cms-editor-v1-md.mp4",
          poster: "/media/cms-editor-v1-poster.webp",
          immersive: true,
        }}
      >
        <p className="mb-6 max-w-xl text-lg font-medium text-fg">{dict.cms.subtitle}</p>
        <Button href="#contacto">{dict.common.requestDemo}</Button>
      </PageHero>
      <Section id="cms-benefits" className="bg-bg">
        <Container>
          <h2 className="mb-12 max-w-2xl font-display text-3xl text-fg sm:text-4xl">{dict.cms.benefitsTitle}</h2>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {dict.cms.benefits.map((benefit) => (
              <article key={benefit.title} className="border-t border-border pt-5">
                <h3 className="max-w-sm text-lg font-semibold text-fg">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{benefit.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section id="cms-capabilities" className="relative isolate overflow-hidden lg:min-h-[680px]">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <AmbientVideo
              lg="/media/cms-publishing-v1-lg.mp4"
              md="/media/cms-publishing-v1-md.mp4"
              poster="/media/cms-publishing-v1-poster.webp"
              veil="none"
              blend={false}
              mediaClassName="object-[35%_center] lg:object-center"
            />
            <div className="absolute inset-0 bg-bg/75 lg:bg-transparent lg:bg-[linear-gradient(90deg,transparent_10%,color-mix(in_srgb,var(--bg)_15%,transparent)_32%,color-mix(in_srgb,var(--bg)_90%,transparent)_64%,var(--bg)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-bg to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-bg to-transparent" />
          </div>
        <Container className="relative flex justify-end">
          <div className="w-full lg:w-[48%]">
            <h2 className="font-display text-3xl text-fg">{dict.cms.canDoTitle}</h2>
            <ul className="mt-6 space-y-3">
              {dict.cms.canDo.map((item, index) => (
                <li key={item} className="flex items-center gap-4 rounded-2xl border border-border bg-surface/70 px-5 py-4 text-sm font-medium text-fg backdrop-blur-md">
                  <span className="font-mono text-xs text-accent-ink" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <Eyebrow>{dict.cms.exampleTitle}</Eyebrow>
          <h2 className="mb-6 font-display text-3xl text-fg">{dict.cms.exampleName}</h2>
          <a href="https://www.nutrirong.com/" target="_blank" rel="noreferrer" className="shot-frame block">
            <Image src="/images/pages/nutrir-mockup.webp" alt="Nutrir" width={1200} height={700} className="w-full object-cover" />
          </a>
          <Button href={href(lang, routes.nutrir)} variant="outline" className="mt-6">
            {dict.common.seeMore}
          </Button>
        </Container>
      </Section>
      <ContactBlock dict={dict} />
    </>
  );
}
