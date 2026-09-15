import { getDictionary } from "@/i18n";
import { ScrollText } from "@/components/motion/motion";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero, FeatureGrid } from "@/components/shared/PageHero";
import { ContactBlock } from "@/components/shared/ContactForm";
import { href, routes, social } from "@/lib/utils";

export default async function KiviPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero kicker={dict.nav.products} title={dict.kivi.title} lead={dict.kivi.lead} leadScroll>
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
