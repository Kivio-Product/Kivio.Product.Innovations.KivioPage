import { ArrowUpRight, Brain, Compass, Database, Radar, ShieldCheck, Workflow } from "lucide-react";
import { getDictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { FadeUp, SpotlightCard, Stagger, Typewriter } from "@/components/motion/motion";
import { PageHero, FeatureGrid } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ChatDemo } from "@/components/shared/ChatDemo";
import { ContactBlock } from "@/components/shared/ContactForm";
import { href, routes, social } from "@/lib/utils";

const useIcons = [Radar, Workflow, Database, Brain, Compass, ShieldCheck];

export default async function AiPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero kicker={dict.ai.kicker} title={dict.ai.title} lead={dict.ai.lead}>
        <div className="flex flex-wrap gap-3">
          <Button href={href(lang, routes.contact)}>{dict.common.contactUs}</Button>
          <Button href={href(lang, routes.kivi)} variant="outline">
            {dict.nav.kivi}
          </Button>
          <Button href={social.kiviExternal} variant="ghost" external>
            {dict.kivi.openProduct} <ArrowUpRight size={16} aria-hidden />
          </Button>
        </div>
      </PageHero>

      {/* Manifesto */}
      <Section className="pt-4">
        <Container>
          <FadeUp>
            <div className="gradient-border relative overflow-hidden rounded-[25px] p-8 grain sm:p-12">
              <p className="font-mono text-xs text-accent">$ kivio ai-native --manifesto</p>
              <p className="mt-6 max-w-3xl font-display text-2xl leading-snug text-fg sm:text-4xl">
                <Typewriter text={dict.ai.manifesto} speed={16} startDelay={400} />
              </p>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* Live demo + methodology */}
      <Section className="border-y border-border bg-bg-soft">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="min-w-0 lg:sticky lg:top-28">
            <SectionHeading kicker={dict.nav.kivi} title={dict.kivi.whyTitle} lead={dict.kivi.whyLead} />
            <FadeUp delay={120} className="mt-8">
              <ChatDemo labels={dict.home.aiChat} />
            </FadeUp>
          </div>
          <div>
            <SectionHeading kicker={dict.ai.kicker} title={dict.ai.methodTitle} className="mb-8" />
            <Stagger className="grid gap-4">
              {dict.ai.method.map((m, i) => (
                <SpotlightCard key={m.title} className="card-lift rounded-[20px] border border-border bg-surface p-6">
                  <div className="flex items-start gap-4">
                    <span className="watermark-number shrink-0 text-4xl leading-none">0{i + 1}</span>
                    <div>
                      <h3 className="font-semibold text-fg">{m.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{m.body}</p>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* Use cases */}
      <Section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dots-pattern opacity-60" aria-hidden />
        <Container className="relative">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                <span className="inline-block h-px w-6 bg-accent" aria-hidden />
                {dict.nav.ai}
              </p>
              <h2 className="font-display text-3xl text-fg sm:text-4xl">{dict.ai.useTitle}</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">{dict.home.aiLead}</p>
          </div>
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dict.ai.uses.map((u, i) => {
              const Icon = useIcons[i % useIcons.length];
              return (
                <SpotlightCard key={u.title} className="card-lift h-full rounded-[20px] border border-border bg-surface p-6">
                  <Icon size={20} className="mb-4 text-accent" />
                  <h3 className="font-semibold text-fg">{u.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{u.body}</p>
                </SpotlightCard>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* Expectations */}
      <Section className="border-y border-border bg-bg-soft">
        <Container>
          <SectionHeading kicker={dict.ai.kicker} title={dict.ai.expectTitle} className="mb-12" />
          <FeatureGrid items={dict.ai.expect} numbered />
        </Container>
      </Section>

      {/* CTA */}
      <Section className="relative overflow-hidden">
        <div className="aurora" aria-hidden />
        <Container className="relative text-center">
          <FadeUp>
            <h2 className="mx-auto max-w-2xl font-display text-3xl text-fg sm:text-5xl">
              {dict.ai.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">{dict.ai.ctaLead}</p>
            <Button href={href(lang, routes.contact)} className="mt-9">
              {dict.common.contactUs}
            </Button>
          </FadeUp>
        </Container>
      </Section>

      <ContactBlock dict={dict} />
    </>
  );
}
