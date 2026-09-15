import Image from "next/image";
import { Brain, Layout, MonitorSmartphone, Sparkles } from "lucide-react";
import { getDictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { PageHero, FeatureGrid } from "@/components/shared/PageHero";
import { FadeUp, SpotlightCard, Stagger } from "@/components/motion/motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { LogoMarquee } from "@/components/shared/LogoMarquee";
import { ContactBlock } from "@/components/shared/ContactForm";
import { href } from "@/lib/utils";

const traitIcons = [Layout, Sparkles, MonitorSmartphone, Brain];

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero title={dict.services.title} lead={dict.services.lead} />
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <FadeUp>
            <div className="shot-frame">
              <Image
                src="/images/pages/servicios-web-2.png"
                alt=""
                width={700}
                height={500}
                className="w-full object-cover"
              />
            </div>
          </FadeUp>
          <div className="grid gap-4">
            {dict.services.types.map((t) => (
              <article key={t.title} className="rounded-[20px] border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold text-fg">{t.title}</h3>
                <p className="mt-2 text-sm text-muted">{t.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-bg-soft">
        <Container>
          <Eyebrow>{dict.services.traitsTitle}</Eyebrow>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dict.services.traits.map((t, i) => {
              const Icon = traitIcons[i];
              return (
                <article key={t.title} className="rounded-[20px] border border-border bg-surface p-6">
                  <Icon className="mb-4 text-accent" size={22} />
                  <h3 className="font-semibold text-fg">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted">{t.body}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="font-display text-3xl text-fg">{dict.services.techTitle}</h2>
          <p className="mt-4 max-w-2xl text-muted">{dict.services.techLead}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {dict.services.stack.map((s) => (
              <span key={s} className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-fg">
                {s}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden bg-bg-soft" id="paquetes">
        <div className="pointer-events-none absolute inset-0 dots-pattern opacity-50" aria-hidden />
        <Container className="relative">
          <SectionHeading kicker={dict.nav.services} title={dict.services.packagesTitle} className="mb-12" align="center" />
          <Stagger className="grid items-start gap-5 lg:grid-cols-3">
            {dict.services.packages.map((p) => {
              const featured = "highlight" in p && Boolean(p.highlight);
              return (
                <SpotlightCard
                  key={p.name}
                  className={`flex h-full flex-col rounded-[25px] p-7 ${
                    featured
                      ? "gradient-border shadow-(--card-shadow-hover) lg:-translate-y-3 lg:scale-[1.02]"
                      : "card-lift border border-border bg-surface"
                  }`}
                >
                  {"highlight" in p && p.highlight && (
                    <span className="mb-3 w-fit rounded-full bg-linear-to-r from-accent to-accent-2 px-3 py-1 text-xs font-semibold text-white shadow-[0_8px_18px_-8px_rgba(255,87,34,0.6)]">
                      {p.highlight}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold text-fg">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted">{dict.common.from}</p>
                  <p className="mt-1 font-display text-3xl text-accent">{p.price}</p>
                  <ul className="mt-6 flex-1 space-y-2 text-sm text-muted">
                    {p.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-accent" aria-hidden>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href={href(lang, "contacto")}
                    variant={featured ? "primary" : "outline"}
                    className="mt-8 w-full"
                  >
                    {dict.common.requestPackage}
                  </Button>
                </SpotlightCard>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="mb-8 font-display text-3xl text-fg">{dict.services.extraTitle}</h2>
          <FeatureGrid items={dict.services.extra} />
        </Container>
      </Section>

      <LogoMarquee lang={lang} title={dict.home.trusted} />
      <ContactBlock dict={dict} />
    </>
  );
}
