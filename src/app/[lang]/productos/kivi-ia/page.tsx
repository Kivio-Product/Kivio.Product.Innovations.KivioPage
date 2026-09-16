import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/page-seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareAppSchema } from "@/lib/seo";
import { ScrollText } from "@/components/motion/motion";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero, FeatureGrid } from "@/components/shared/PageHero";
import { ContactBlock } from "@/components/shared/ContactForm";
import { href, routes, social } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata(params, (d) => ({
    title: `${d.kivi.title} — ${d.kivi.subtitle}`,
    description: d.kivi.lead,
    path: "productos/kivi-ia",
  }));
}

export default async function KiviPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <JsonLd
        data={softwareAppSchema({ name: dict.kivi.title, description: dict.kivi.lead, path: "productos/kivi-ia" })}
      />
      <PageHero
        lang={lang}
        path="productos/kivi-ia"
        iconSrc="/brand/kivi-ai-logo.png"
        kicker={dict.nav.products}
        title={dict.kivi.title}
        lead={dict.kivi.lead}
        leadScroll
      >
        <p className="mb-6 text-lg font-medium text-fg">{dict.kivi.subtitle}</p>
        <div className="flex flex-wrap gap-3">
          <Button href={social.kiviExternal} external>
            {dict.kivi.openProduct}
          </Button>
          <Button href={href(lang, routes.ai)} variant="outline">
            {dict.nav.ai}
          </Button>
        </div>
      </PageHero>
      <Section>
        <Container>
          <h2 className="mb-10 font-display text-3xl text-fg">{dict.kivi.featuresTitle}</h2>
          <FeatureGrid items={dict.kivi.features} />
        </Container>
      </Section>
      <Section className="diagonal-band bg-bg-soft">
        <Container className="max-w-3xl">
          <h2 className="font-display text-3xl text-fg">{dict.kivi.whyTitle}</h2>
          <ScrollText text={dict.kivi.whyLead} className="mt-4 text-lg text-muted" />
        </Container>
      </Section>
      <ContactBlock dict={dict} />
    </>
  );
}
