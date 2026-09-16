import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Brain, Check, Compass, Network, Rocket, Shield, ShieldCheck, Sparkles, Users } from "lucide-react";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/page-seo";
import { SITE_NAME } from "@/lib/seo";
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
import { AmbientVideo } from "@/components/shared/AmbientVideo";
import { HeroDiagram } from "@/components/shared/HeroDiagram";
import { LogoMarquee } from "@/components/shared/LogoMarquee";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StatsRow } from "@/components/shared/SocialProof";
import { ContactBlock } from "@/components/shared/ContactForm";
import { href, routes } from "@/lib/utils";

const solutionIcons = [ShieldCheck, Users, Network, Rocket];

const caseMeta: Record<string, { img: string }> = {
  flyr: { img: "/images/pages/flyr-equipo.png" },
  merkko: { img: "/images/pages/merkko-mockup-big.png" },
  nutrir: { img: "/images/pages/nutrir-mockup-big.png" },
};

const productMeta: Record<string, { to: string; img: string; bg: string }> = {
  cms: { to: routes.cms, img: "/images/products/cms-demo.png", bg: "/images/products/card-cms-bg.png" },
  ecommerce: { to: routes.ecommerce, img: "/images/products/ecommerce-demo.png", bg: "/images/products/card-ecommerce-bg.png" },
  bidmax: { to: routes.bidmax, img: "/images/products/bidmax-demo.png", bg: "/images/products/card-bidmax-bg.png" },
  kivi: { to: routes.kivi, img: "/brand/kivi-ai-logo.png", bg: "/images/pages/diagonal-coral.jpg" },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata(params, (d) => ({
    /* the layout's title.template does not apply to the page in its own segment */
    title: `${SITE_NAME} - ${d.home.heroTitle}`,
    description: d.meta.description,
    path: "",
  }));
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const aiSection = dict.home.aiPoints;

  return (
    <>
      {/* ── HERO (centered, Shopify-style) ───────────────────── */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
        <div className="aurora" aria-hidden />
        <AmbientVideo
          lg="/media/hero-geometric-lg.mp4"
          md="/media/hero-geometric-md.mp4"
          poster="/media/hero-geometric-poster.jpg"
          lightLg="/media/space-lg.mp4"
          lightMd="/media/space-md.mp4"
          lightPoster="/media/space-poster.jpg"
          mediaClassName="scale-[1.3] origin-bottom"
          videoOpacity={0.8}
          priority
        />
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" aria-hidden />
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
                <Button href={href(lang, routes.portfolio)} variant="outline">
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
          {/* post-diagram CTA: leads into the solutions portfolio */}
          <FadeUp delay={160} className="mt-12 text-center">
            <Button href={href(lang, routes.services)}>
              {dict.home.solutionsCta} <ArrowRight size={16} aria-hidden />
            </Button>
          </FadeUp>
          <ScrollCue label={dict.common.scroll} />
        </Container>
      </section>

      {/* ── LOGOS ────────────────────────────────────────────── */}
      <LogoMarquee lang={lang} title={dict.home.trusted} />

      {/* ── SOLUTIONS (core offer) ───────────────────────────── */}
      <Section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dots-pattern opacity-40" aria-hidden />
        <Container className="relative">
          <SectionHeading
            kicker={dict.home.solutionsKicker}
            title={dict.home.solutionsTitle}
            lead={dict.home.solutionsLead}
            className="mb-12"
          />
          <Stagger className="grid gap-5 lg:grid-cols-2">
            {dict.home.solutions.map((s, i) => {
              const Icon = solutionIcons[i % solutionIcons.length];
              return (
                <SpotlightCard
                  key={s.title}
                  className="card-lift h-full rounded-[20px] border border-border bg-surface p-7 sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <Icon size={20} />
                    </div>
                    <span className="watermark-number text-4xl leading-none">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-fg">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                  <p className="mt-5 flex items-start gap-2 border-t border-border pt-4 text-sm font-medium text-fg">
                    <ArrowRight size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                    {s.result}
                  </p>
                </SpotlightCard>
              );
            })}
          </Stagger>
          <FadeUp delay={120} className="mt-10 text-center">
            <Button href={href(lang, routes.services)}>
              {dict.home.solutionsCta} <ArrowRight size={16} aria-hidden />
            </Button>
          </FadeUp>
        </Container>
      </Section>

      {/* ── CASE STUDIES + OWN PRODUCTS ──────────────────────── */}
      <Section className="border-y border-border bg-bg-soft">
        <Container>
          <SectionHeading
            kicker={dict.home.resultsKicker}
            title={dict.home.resultsTitle}
            lead={dict.home.resultsLead}
            className="mb-12"
          />

          <Stagger className="grid gap-5 lg:grid-cols-3">
            {dict.home.results.map((c) => (
              <Link
                key={c.title}
                href={href(lang, routes[c.href as keyof typeof routes])}
                className="card-lift group flex h-full flex-col overflow-hidden rounded-[25px] border border-border bg-surface"
              >
                <div className="relative h-48 overflow-hidden bg-surface-2">
                  <Image
                    src={caseMeta[c.href].img}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 90vw, 380px"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                    {c.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold text-fg">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
                  <ul className="mt-4 space-y-1.5 text-xs leading-relaxed text-muted">
                    {c.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <Check size={14} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-accent">
                    {dict.common.seeMore}{" "}
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </Stagger>

          {/* own products */}
          <div className="mt-16 border-t border-border pt-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                  <span className="inline-block h-px w-6 bg-accent" aria-hidden />
                  {dict.home.productsKicker}
                </p>
                <h3 className="mt-3 font-display text-2xl text-fg sm:text-3xl">{dict.home.productsTitle}</h3>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted">{dict.home.showcase.lead}</p>
            </div>
            <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {dict.home.products.map((p) => {
                const meta = productMeta[p.href];
                return (
                  <Link
                    key={p.href}
                    href={href(lang, meta.to)}
                    className="card-lift group flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-surface"
                  >
                    <div className="relative h-36 overflow-hidden bg-surface-2">
                      <Image
                        src={meta.bg}
                        alt=""
                        fill
                        className="object-cover opacity-50 transition duration-700 group-hover:scale-105"
                      />
                      <Image
                        src={meta.img}
                        alt={p.title}
                        fill
                        className="object-contain p-5 transition duration-500 group-hover:scale-[1.06] group-hover:-rotate-1"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h4 className="text-base font-semibold text-fg">{p.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-accent">
                        {dict.common.seeMore}{" "}
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </Stagger>
          </div>

          <FadeUp delay={120} className="mt-12 text-center">
            <Button href={href(lang, routes.portfolio)} variant="outline">
              {dict.home.resultsCta}
            </Button>
          </FadeUp>
        </Container>
      </Section>

      {/* ── CRITICAL SYSTEMS / SECTORS ───────────────────────── */}
      <Section className="overflow-hidden">
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
                {dict.home.criticalSectors.map((s, i) => (
                  <span key={s} className="inline-flex items-center gap-2">
                    {i === 0 && <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-400" />}
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
          <div>
            <SectionHeading kicker={dict.home.criticalKicker} title={dict.home.criticalTitle} className="mb-5" />
            <div>
              <ScrollText text={dict.home.criticalP1} className="text-muted" />
              <ScrollText text={dict.home.criticalP2} className="mt-3 text-muted" />
              <Button href={href(lang, routes.airlines)} className="mt-8">
                {dict.home.criticalCta}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── AI-NATIVE (modernization capability) ─────────────── */}
      <Section className="relative overflow-hidden border-y border-border">
        <AmbientVideo
          lg="/media/ai-chat-lg.mp4"
          md="/media/ai-chat-md.mp4"
          poster="/media/ai-chat-poster.jpg"
          intensity="section"
        />
        <div className="pointer-events-none absolute inset-0 section-glow" aria-hidden />
        <div className="pointer-events-none absolute inset-0 dots-pattern opacity-40" aria-hidden />
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

      {/* ── STATS ────────────────────────────────────────────── */}
      <Section className="py-16 sm:py-20">
        <StatsRow items={dict.home.stats} />
      </Section>

      <ContactBlock
        dict={dict}
        video={{
          lg: "/media/night-phone-lg.mp4",
          md: "/media/night-phone-md.mp4",
          poster: "/media/night-phone-poster.jpg",
        }}
      />
    </>
  );
}
