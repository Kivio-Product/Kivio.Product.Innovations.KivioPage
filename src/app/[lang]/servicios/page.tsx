import {
  ArrowRight,
  BarChart3,
  BedDouble,
  Building2,
  FileCheck,
  Handshake,
  Lock,
  Network,
  Plane,
  Rocket,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/page-seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero, FeatureGrid } from "@/components/shared/PageHero";
import { FadeUp, ScrollSteps, ScrollText, SpotlightCard, Stagger } from "@/components/motion/motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { LogoMarquee } from "@/components/shared/LogoMarquee";
import { ContactBlock } from "@/components/shared/ContactForm";
import { href, routes } from "@/lib/utils";

const solutionIcons = [ShieldCheck, Users, Network, Rocket];
const sectorIcons = [Plane, BedDouble, Truck, Building2];
const traitIcons = [Handshake, FileCheck, Lock, BarChart3];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata(params, (d) => ({
    title: d.services.title,
    description: d.services.lead,
    path: "servicios",
  }));
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: dict.services.title,
          description: dict.services.lead,
          path: "servicios",
          serviceType: "Continuidad operacional y estabilidad de sistemas críticos",
        })}
      />
      <PageHero
        lang={lang}
        path="servicios"
        kicker={dict.services.kicker}
        title={dict.services.title}
        lead={dict.services.lead}
        leadScroll
        video={{
          lg: "/media/servers-lg.mp4",
          md: "/media/servers-md.mp4",
          poster: "/media/servers-poster.jpg",
        }}
      >
        <Button href="#contacto">{dict.common.requestConsult}</Button>
      </PageHero>

      {/* ── SOLUTIONS PORTFOLIO ──────────────────────────────── */}
      <Section>
        <Container>
          <SectionHeading
            kicker={dict.services.kicker}
            title={dict.services.portfolioTitle}
            lead={dict.services.portfolioLead}
            className="mb-12"
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {dict.services.solutions.map((s, i) => {
              const Icon = solutionIcons[i % solutionIcons.length];
              return (
                <SpotlightCard
                  key={s.title}
                  className="card-lift h-full rounded-[25px] border border-border bg-surface p-7 sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <Icon size={20} />
                    </div>
                    <span className="watermark-number text-4xl leading-none">0{i + 1}</span>
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-fg">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                  <ul className="mt-5 space-y-2 text-sm text-muted">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-accent" aria-hidden>
                          ✓
                        </span>{" "}
                        {b}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 flex items-start gap-2 border-t border-border pt-4 text-sm font-medium text-fg">
                    <ArrowRight size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                    {s.result}
                  </p>
                </SpotlightCard>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── COLLABORATION MODELS ─────────────────────────────── */}
      <Section className="border-y border-border bg-bg-soft">
        <Container>
          <SectionHeading
            kicker={dict.services.kicker}
            title={dict.services.modelsTitle}
            lead={dict.services.modelsLead}
            className="mb-12"
          />
          <Stagger className="grid gap-5 lg:grid-cols-3">
            {dict.services.models.map((m, i) => (
              <SpotlightCard key={m.title} className="card-lift h-full rounded-[20px] border border-border bg-surface p-7">
                <span className="watermark-number text-4xl leading-none">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold text-fg">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.body}</p>
              </SpotlightCard>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ── METHOD ───────────────────────────────────────────── */}
      <Section>
        <Container>
          <SectionHeading title={dict.services.methodTitle} lead={dict.services.methodLead} className="mb-12" />
          <ScrollSteps items={dict.services.method} />
        </Container>
      </Section>

      {/* ── SECTORS ──────────────────────────────────────────── */}
      <Section className="border-y border-border bg-bg-soft">
        <Container>
          <SectionHeading
            title={dict.services.sectorsTitle}
            lead={dict.services.sectorsLead}
            className="mb-12"
          />
          <Stagger className="grid gap-5 sm:grid-cols-2">
            {dict.services.sectors.map((s, i) => {
              const Icon = sectorIcons[i % sectorIcons.length];
              return (
                <SpotlightCard key={s.title} className="card-lift h-full rounded-[20px] border border-border bg-surface p-6 sm:p-7">
                  <Icon size={20} className="mb-4 text-accent" />
                  <h3 className="font-semibold text-fg">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </SpotlightCard>
              );
            })}
          </Stagger>
          <FadeUp delay={120} className="mt-10">
            <Button href={href(lang, routes.airlines)} variant="outline">
              {dict.services.sectorsCta} <ArrowRight size={16} aria-hidden />
            </Button>
          </FadeUp>
        </Container>
      </Section>

      {/* ── EXPECTATIONS + TECH STACK ────────────────────────── */}
      <Section>
        <Container>
          <SectionHeading title={dict.services.traitsTitle} className="mb-12" />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dict.services.traits.map((t, i) => {
              const Icon = traitIcons[i % traitIcons.length];
              return (
                <article key={t.title} className="rounded-[20px] border border-border bg-surface p-6">
                  <Icon className="mb-4 text-accent" size={22} />
                  <h3 className="font-semibold text-fg">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted">{t.body}</p>
                </article>
              );
            })}
          </Stagger>
          <div className="mt-16 border-t border-border pt-12">
            <h2 className="font-display text-3xl text-fg">{dict.services.techTitle}</h2>
            <ScrollText text={dict.services.techLead} className="mt-4 max-w-2xl text-muted" />
            <div className="mt-8 flex flex-wrap gap-2">
              {dict.services.stack.map((s) => (
                <span key={s} className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-fg">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── ONE-OFF PROJECTS ─────────────────────────────────── */}
      <Section className="relative overflow-hidden border-y border-border bg-bg-soft" id="proyectos">
        <div className="pointer-events-none absolute inset-0 dots-pattern opacity-50" aria-hidden />
        <Container className="relative">
          <SectionHeading
            kicker={dict.services.packagesKicker}
            title={dict.services.packagesTitle}
            lead={dict.services.packagesLead}
            className="mb-12"
            align="center"
            leadScroll
          />
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

      {/* ── ALSO BUILD ───────────────────────────────────────── */}
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
