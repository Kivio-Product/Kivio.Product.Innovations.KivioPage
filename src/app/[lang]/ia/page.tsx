import { getDictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { PageHero, FeatureGrid } from "@/components/shared/PageHero";
import { ContactBlock } from "@/components/shared/ContactForm";
import { href, routes, social } from "@/lib/utils";

export default async function AiPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero kicker={dict.ai.kicker} title={dict.ai.title} lead={dict.ai.lead}>
        <div className="flex flex-wrap gap-3">
          <Button href={href(lang, routes.kivi)}>{dict.nav.kivi}</Button>
          <Button href={social.kiviExternal} variant="outline" external>
            {dict.kivi.openProduct}
          </Button>
        </div>
      </PageHero>
      <Section>
        <Container>
          <blockquote className="max-w-3xl rounded-[25px] border border-border bg-surface p-8 font-display text-2xl leading-snug text-fg sm:text-3xl">
            {dict.ai.manifesto}
          </blockquote>
        </Container>
      </Section>
      <Section className="bg-bg-soft">
        <Container>
          <h2 className="mb-10 font-display text-3xl text-fg">{dict.ai.methodTitle}</h2>
          <FeatureGrid items={dict.ai.method} numbered />
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="mb-10 font-display text-3xl text-fg">{dict.ai.expectTitle}</h2>
          <FeatureGrid items={dict.ai.expect} />
        </Container>
      </Section>
      <Section className="diagonal-band bg-bg-soft">
        <Container>
          <h2 className="mb-10 font-display text-3xl text-fg">{dict.ai.useTitle}</h2>
          <FeatureGrid items={dict.ai.uses} />
        </Container>
      </Section>
      <Section>
        <Container className="text-center">
          <Eyebrow>{dict.nav.ai}</Eyebrow>
          <h2 className="font-display text-3xl text-fg sm:text-4xl">{dict.ai.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{dict.ai.ctaLead}</p>
          <Button href={href(lang, routes.contact)} className="mt-8">
            {dict.common.contactUs}
          </Button>
        </Container>
      </Section>
      <ContactBlock dict={dict} />
    </>
  );
}
