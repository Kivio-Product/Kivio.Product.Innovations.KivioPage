import Image from "next/image";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/page-seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareAppSchema } from "@/lib/seo";
import { Parallax } from "@/components/motion/motion";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { PageHero, FeatureGrid } from "@/components/shared/PageHero";
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
      <PageHero lang={lang} path="productos/kivio-cms" kicker={dict.nav.products} title={dict.cms.title} lead={dict.cms.lead} leadScroll>
        <p className="mb-6 max-w-xl text-lg font-medium text-fg">{dict.cms.subtitle}</p>
        <Button href="#contacto">{dict.common.requestDemo}</Button>
      </PageHero>
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Parallax speed={0.04}>
            <div className="shot-frame">
              <Image
                src="/images/pages/cms-laptop.webp"
                alt="Kivio CMS"
                width={900}
                height={620}
                className="w-full object-contain"
              />
            </div>
          </Parallax>
          <div>
            <h2 className="font-display text-3xl text-fg">{dict.cms.canDoTitle}</h2>
            <ul className="mt-6 space-y-3">
              {dict.cms.canDo.map((item) => (
                <li key={item} className="rounded-2xl border border-border bg-surface px-5 py-4 text-sm font-medium text-fg">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
      <Section className="bg-bg-soft">
        <Container>
          <h2 className="mb-10 font-display text-3xl text-fg">{dict.cms.benefitsTitle}</h2>
          <FeatureGrid items={dict.cms.benefits} />
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
