import Image from "next/image";
import { ArrowRight, Brain, Compass, Shield, Sparkles } from "lucide-react";
import { getDictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMarquee } from "@/components/shared/LogoMarquee";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ContactBlock } from "@/components/shared/ContactForm";
import { href, routes } from "@/lib/utils";

const featureIcons = [Sparkles, Compass, Shield, Brain];

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hero-glow" />
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <Container className="relative grid min-h-[calc(100dvh-72px)] items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <Eyebrow>{dict.home.heroKicker}</Eyebrow>
            <h1 className="font-display text-5xl leading-[1.05] text-fg sm:text-6xl lg:text-7xl">
              {dict.home.heroTitle.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-gradient">{dict.home.heroTitle.split(" ").slice(-1)}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{dict.home.heroLead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={href(lang, routes.contact)}>{dict.home.heroCta}</Button>
              <Button href={href(lang, routes.about)} variant="outline">
                {dict.home.heroSecondary} <ArrowRight size={16} />
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120} className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-[460px]">
              <div className="absolute inset-8 rounded-full bg-accent/20 blur-3xl" />
              <Image
                src="/brand/zorro-lockup.png"
                alt="KIVIO"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <Section className="overflow-hidden">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-[25px]">
              <Image
                src="/images/pages/avion-atardecer.png"
                alt=""
                width={900}
                height={620}
                className="h-[360px] w-full object-cover grayscale-[40%] contrast-125 sm:h-[440px]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/55 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Eyebrow>{dict.nav.airlines}</Eyebrow>
            <h2 className="font-display text-3xl leading-tight text-fg sm:text-4xl">{dict.home.airlinesTitle}</h2>
            <p className="mt-4 text-muted">{dict.home.airlinesP1}</p>
            <p className="mt-3 text-muted">{dict.home.airlinesP2}</p>
            <Button href={href(lang, routes.airlines)} className="mt-8">
              {dict.common.moreInfo}
            </Button>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-bg-soft">
        <Container>
          <Reveal>
            <Eyebrow>{dict.home.featuresTitle}</Eyebrow>
            <h2 className="mb-10 max-w-2xl font-display text-3xl text-fg sm:text-4xl">{dict.home.featuresTitle}</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {dict.home.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <Reveal key={f.title} delay={i * 70}>
                  <article className="card-lift h-full rounded-[20px] border border-border bg-surface p-7">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-fg">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <LogoMarquee lang={lang} title={dict.home.trusted} />

      <Section id="whyUs">
        <Container>
          <Reveal>
            <Eyebrow>{dict.home.whyKicker}</Eyebrow>
            <h2 className="mb-12 max-w-2xl font-display text-3xl leading-tight text-fg sm:text-5xl">
              {dict.home.whyTitle}
            </h2>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            {dict.home.why.map((w, i) => (
              <Reveal key={w.n} delay={i * 80}>
                <article className="card-lift group h-full rounded-[16px] border border-border bg-surface p-8 transition hover:bg-fg hover:text-bg">
                  <p className="font-display text-4xl text-muted-2 group-hover:text-accent">{w.n}</p>
                  <h3 className="mt-6 text-xl font-semibold">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted group-hover:text-bg/80">{w.body}</p>
                  <span className="mt-6 inline-block text-sm font-semibold text-accent">
                    {dict.common.seeMore} →
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="overflow-hidden diagonal-band bg-bg-soft">
        <Container>
          <Reveal>
            <Eyebrow>{dict.home.aiKicker}</Eyebrow>
            <h2 className="max-w-3xl font-display text-3xl leading-tight text-fg sm:text-5xl">{dict.home.aiTitle}</h2>
            <p className="mt-5 max-w-2xl text-muted">{dict.home.aiLead}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {dict.home.aiPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <article className="rounded-[20px] border border-border bg-surface p-6">
                  <h3 className="font-semibold text-fg">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Button href={href(lang, routes.ai)}>
              {dict.home.aiCta} <ArrowRight size={16} />
            </Button>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <Eyebrow>{dict.home.productsKicker}</Eyebrow>
            <h2 className="mb-10 font-display text-3xl text-fg sm:text-4xl">{dict.home.productsTitle}</h2>
          </Reveal>
          <ProductGrid lang={lang} dict={dict} />
        </Container>
      </Section>

      <ContactBlock dict={dict} />
    </>
  );
}
