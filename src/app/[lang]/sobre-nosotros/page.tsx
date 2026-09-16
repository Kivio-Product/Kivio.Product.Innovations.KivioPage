import Image from "next/image";
import { Heart, Lightbulb, Medal, Monitor, Scale, Sparkles } from "lucide-react";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/page-seo";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { FadeUp, Parallax, ScrollText, SpotlightCard, Stagger } from "@/components/motion/motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ContactBlock } from "@/components/shared/ContactForm";

const icons = [Medal, Heart, Lightbulb, Sparkles, Scale, Monitor];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata(params, (d) => ({
    title: d.about.title,
    description: d.about.lead,
    path: "sobre-nosotros",
  }));
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero lang={lang} path="sobre-nosotros" title={dict.about.title} lead={dict.about.lead} leadScroll />
      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <FadeUp>
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                <span className="inline-block h-px w-6 bg-accent" aria-hidden />
                {dict.about.teamNote}
              </p>
              <h2 className="font-display text-3xl text-fg sm:text-4xl">{dict.about.storyTitle}</h2>
              <ScrollText text={dict.about.story} className="mt-4 text-muted" />
            </FadeUp>
            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="gradient-border-soft h-full rounded-[20px] p-6">
                <p className="watermark-number text-4xl">{dict.about.missionN}</p>
                <h3 className="mt-3 font-semibold text-fg">{dict.about.missionTitle}</h3>
                <p className="mt-2 text-sm text-muted">{dict.about.mission}</p>
              </div>
              <div className="gradient-border-soft h-full rounded-[20px] p-6">
                <p className="watermark-number text-4xl">{dict.about.visionN}</p>
                <h3 className="mt-3 font-semibold text-fg">{dict.about.visionTitle}</h3>
                <p className="mt-2 text-sm text-muted">{dict.about.vision}</p>
              </div>
            </Stagger>
          </div>
          <FadeUp delay={80}>
            <div className="relative overflow-hidden rounded-[25px] grain">
              <Parallax speed={0.05}>
                <Image
                  src="/images/pages/sobre-nosotros-equipo.png"
                  alt=""
                  width={900}
                  height={760}
                  className="w-full scale-105 object-cover"
                />
              </Parallax>
              <div className="glass absolute bottom-5 left-5 rounded-2xl px-5 py-3.5 text-xs font-medium text-fg">
                Manizales · Colombia
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>

      <Section className="relative overflow-hidden bg-bg-soft">
        <div className="pointer-events-none absolute inset-0 dots-pattern opacity-50" aria-hidden />
        <Container className="relative">
          <SectionHeading
            kicker={dict.about.valuesKicker}
            title={dict.about.valuesTitle}
            lead={dict.about.valuesLead}
            className="mb-12"
          />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dict.about.values.map((v, i) => {
              const Icon = icons[i % icons.length];
              return (
                <SpotlightCard key={v.title} className="card-lift h-full rounded-[16px] border border-border bg-surface p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold text-fg">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted">{v.body}</p>
                </SpotlightCard>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading kicker={dict.home.productsKicker} title={dict.home.productsTitle} className="mb-10" />
          <ProductGrid lang={lang} dict={dict} />
        </Container>
      </Section>
      <ContactBlock dict={dict} />
    </>
  );
}
