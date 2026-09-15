import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Brain, Compass, Shield, Sparkles } from "lucide-react";
import { getDictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import {
  FadeUp,
  Magnetic,
  Parallax,
  RotatingWord,
  ScrollCue,
  ScrollText,
  SpotlightCard,
  Stagger,
  Typewriter,
} from "@/components/motion/motion";
import { HeroDiagram } from "@/components/shared/HeroDiagram";
import { LogoMarquee } from "@/components/shared/LogoMarquee";
import { ShowcaseCarousel } from "@/components/shared/ShowcaseCarousel";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StatsRow } from "@/components/shared/SocialProof";
import { ContactBlock } from "@/components/shared/ContactForm";
import { href, routes, social } from "@/lib/utils";

const featureIcons = [Sparkles, Compass, Shield, Brain];

const productMeta: Record<string, { to: string; img: string; bg: string; span: string; tall?: boolean }> = {
  cms: { to: routes.cms, img: "/images/products/cms-demo.png", bg: "/images/products/card-cms-bg.png", span: "lg:col-span-3" },
  ecommerce: { to: routes.ecommerce, img: "/images/products/ecommerce-demo.png", bg: "/images/products/card-ecommerce-bg.png", span: "lg:col-span-3" },
  bidmax: { to: routes.bidmax, img: "/images/products/bidmax-demo.png", bg: "/images/products/card-bidmax-bg.png", span: "lg:col-span-2" },
  kivi: { to: routes.kivi, img: "/brand/kivi-ai-logo.png", bg: "/images/pages/diagonal-coral.jpg", span: "lg:col-span-4", tall: true },
};

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const aiSection = dict.home.aiPoints;

  return (
    <>
      {/* ── HERO (centered, Shopify-style) ───────────────────── */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
        <div className="aurora" aria-hidden />
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" aria-hidden />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <FadeUp>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" aria-hidden />
                {dict.home.heroKicker}
              </span>
            </FadeUp>
            <FadeUp delay={90}>
              <h1 className="mt-7 font-display text-4xl leading-[1.06] text-fg sm:text-6xl lg:text-7xl">
                {dict.home.heroTitleStatic}
                <span className="mt-1 block sm:mt-2">
                  <RotatingWord words={dict.home.heroRotating} gradient />
                </span>
              </h1>
            </FadeUp>
            <FadeUp delay={170}>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {dict.home.heroLead}
              </p>
            </FadeUp>
            <FadeUp delay={250}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Magnetic>
                  <Button href={href(lang, routes.contact)}>
                    {dict.home.heroCta} <ArrowRight size={16} aria-hidden />
                  </Button>
                </Magnetic>
                <Button href={href(lang, routes.about)} variant="outline">
                  {dict.home.heroSecondary}
                </Button>
              </div>
              <p className="mt-5 text-xs text-muted-2">{dict.home.heroNote}</p>
            </FadeUp>
          </div>
        </Container>
        <Container className="relative mt-14 sm:mt-20">
          <FadeUp delay={120} y={32}>
            <HeroDiagram labels={dict.home.heroCards} flow={dict.home.heroDiagram} />
          </FadeUp>
          {/* post-diagram CTAs: try KIVI AI · explore the rest of the portfolio */}
          <FadeUp delay={160} className="mt-12 text-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button href={social.kiviExternal} external>
                <Image
                  src="/brand/kivi-ai-logo.png"
                  alt=""
                  width={22}
                  height={22}
                  className="h-[22px] w-[22px]"
                />
                {dict.home.kiviCta}
              </Button>
              <Button href={href(lang, routes.services)} variant="outline">
                {dict.home.productsCta} <ArrowRight size={16} aria-hidden />
              </Button>
            </div>
          </FadeUp>
          <ScrollCue label={dict.common.scroll} />
        </Container>
      </section>

      {/* ── LOGOS ────────────────────────────────────────────── */}
      <LogoMarquee lang={lang} title={dict.home.trusted} />

      {/* ── SHOWCASE CAROUSEL ────────────────────────────────── */}
      <Section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dots-pattern opacity-50" aria-hidden />
        <Container className="relative">
          <SectionHeading
            kicker={dict.home.showcase.kicker}
            title={dict.home.showcase.title}
            lead={dict.home.showcase.lead}
            className="mb-12"
          />
          <FadeUp>
            <ShowcaseCarousel dict={dict} lang={lang} />
          </FadeUp>
        </Container>
      </Section>

      {/* ── AIRLINES ─────────────────────────────────────────── */}
      <Section className="overflow-hidden border-y border-border bg-bg-soft">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <FadeUp>
            <div className="relative overflow-hidden rounded-[25px] grain">
              <Parallax speed={0.06}>
                <Image
                  src="/images/pages/avion-atardecer.png"
                  alt=""
                  width={900}
                  height={680}
                  className="h-[380px] w-full scale-110 object-cover grayscale-[35%] contrast-125 sm:h-[460px]"
                />
              </Parallax>
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              <div className="glass absolute bottom-5 left-5 right-5 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl px-5 py-3.5 text-xs font-medium text-white">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-400" /> PSS
                </span>
                <span>IBE</span>
                <span>Reservas B2C</span>
                <span>Operaciones irregulares</span>
              </div>
            </div>
          </FadeUp>
          <div>
            <SectionHeading kicker={dict.nav.airlines} title={dict.home.airlinesTitle} className="mb-5" />
            <div>
              <ScrollText text={dict.home.airlinesP1} className="text-muted" />
              <ScrollText text={dict.home.airlinesP2} className="mt-3 text-muted" />
              <Button href={href(lang, routes.airlines)} className="mt-8">
                {dict.common.moreInfo}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── AI-NATIVE (signature bento) ──────────────────────── */}
      <Section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 section-glow" aria-hidden />
        <div className="pointer-events-none absolute inset-0 dots-pattern opacity-50" aria-hidden />
        <Container className="relative">
          <SectionHeading kicker={dict.home.aiKicker} title={dict.home.aiTitle} className="mb-12 max-w-3xl" />
          <div className="grid gap-5 lg:grid-cols-12">
            <FadeUp className="lg:col-span-5">
              <SpotlightCard className="gradient-border h-full rounded-[25px] p-7 sm:p-8">
                <p className="font-mono text-xs text-accent">$ kivio init --ai-native</p>
                <p className="mt-5 font-display text-xl leading-snug text-fg sm:text-2xl">
                  <Typewriter text={dict.home.aiLead} speed={14} startDelay={500} />
                </p>
                <Button href={href(lang, routes.ai)} className="mt-8">
                  {dict.home.aiCta} <ArrowRight size={16} />
                </Button>
              </SpotlightCard>
            </FadeUp>
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
              {aiSection.map((p, i) => {
                const Icon = [Compass, Brain, Shield, Sparkles][i % 4];
                return (
                  <SpotlightCard
                    key={p.title}
                    className="card-lift h-full rounded-[20px] border border-border bg-surface p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                        <Icon size={19} />
                      </div>
                      <span className="watermark-number text-4xl leading-none">0{i + 1}</span>
                    </div>
                    <h3 className="mt-4 font-semibold text-fg">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                  </SpotlightCard>
                );
              })}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* ── SERVICE FEATURES ─────────────────────────────────── */}
      <Section className="border-y border-border bg-bg-soft">
        <Container>
          <SectionHeading kicker={dict.nav.services} title={dict.home.featuresTitle} className="mb-12" />
          <Stagger className="grid gap-5 sm:grid-cols-2">
            {dict.home.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <SpotlightCard key={f.title} className="card-lift h-full rounded-[20px] border border-border bg-surface p-7">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-fg">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
                </SpotlightCard>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* ── WHY US ───────────────────────────────────────────── */}
      <Section id="whyUs">
        <Container>
          <SectionHeading kicker={dict.home.whyKicker} title={dict.home.whyTitle} className="mb-12 max-w-2xl" />
          <Stagger className="grid gap-5 lg:grid-cols-3">
            {dict.home.why.map((w) => (
              <SpotlightCard
                key={w.n}
                className="card-lift group h-full rounded-[16px] border border-border bg-surface p-8 transition-colors duration-300 hover:border-accent/40"
              >
                <span className="watermark-number text-5xl">{w.n}</span>
                <h3 className="mt-6 text-xl font-semibold text-fg transition-colors group-hover:text-accent">
                  {w.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{w.body}</p>
                <Link
                  href={href(lang, routes.about)}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent"
                >
                  {dict.common.seeMore} <ArrowUpRight size={15} />
                </Link>
              </SpotlightCard>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ── PRODUCTS (bento) ─────────────────────────────────── */}
      <Section className="border-y border-border bg-bg-soft">
        <Container>
          <SectionHeading kicker={dict.home.productsKicker} title={dict.home.productsTitle} className="mb-12" />
          <div className="grid gap-5 lg:grid-cols-6">
            {dict.home.products.map((p, i) => {
              const meta = productMeta[p.href];
              return (
                <FadeUp key={p.href} delay={i * 70} className={meta.span}>
                  <Link
                    href={href(lang, meta.to)}
                    className="card-lift group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-surface"
                  >
                    <div className={`relative overflow-hidden bg-surface-2 ${meta.tall ? "h-56" : "h-44"}`}>
                      <Image src={meta.bg} alt="" fill className="object-cover opacity-50 transition duration-700 group-hover:scale-105" />
                      <Image
                        src={meta.img}
                        alt={p.title}
                        fill
                        className="object-contain p-6 transition duration-500 group-hover:scale-[1.06] group-hover:-rotate-1"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-semibold text-fg">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                      <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                        {dict.common.seeMore}{" "}
                        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <Section className="py-16 sm:py-20">
        <StatsRow items={dict.home.stats} />
      </Section>

      <ContactBlock dict={dict} />
    </>
  );
}
