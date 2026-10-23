import { ArrowRight, Check, ChevronDown, ClipboardList, Database, FileCheck, GraduationCap, Layers, ShieldCheck, Users, Workflow } from "lucide-react";
import { getDictionary, getLocale } from "@/i18n";
import { pageMetadata } from "@/lib/page-seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, serviceSchema, SITE_URL } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { FadeUp, SpotlightCard, Stagger } from "@/components/motion/motion";
import { PageHero } from "@/components/shared/PageHero";
import { AmbientVideo } from "@/components/shared/AmbientVideo";
import { AiJourney3D } from "@/components/shared/AiJourney3D";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactBlock } from "@/components/shared/ContactForm";
import { href, routes } from "@/lib/utils";

const painIcons = [Workflow, FileCheck, Layers, GraduationCap];
const controlIcons = [ShieldCheck, Database, Users];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata(params, (d) => ({
    title: d.ai.seoTitle,
    description: d.ai.seoDescription,
    path: "ia",
    socialImage: { path: "ia/opengraph-image", alt: d.ai.seoTitle },
  }));
}

export default async function AiPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const ai = dict.ai;
  const locale = getLocale(lang);
  const pageUrl = absoluteUrl(locale, "ia");

  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
          url: pageUrl,
          name: ai.seoTitle,
          description: ai.seoDescription,
          inLanguage: locale === "es" ? "es-CO" : "en",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          mainEntity: { "@id": `${pageUrl}#service` },
          hasPart: [
            { "@type": "WebPageElement", "@id": `${pageUrl}#consultoria-ia`, name: ai.summaryTitle },
            { "@type": "WebPageElement", "@id": `${pageUrl}#diagnostico`, name: ai.deliverablesTitle },
            { "@type": "WebPageElement", "@id": `${pageUrl}#guia`, name: ai.guideTitle },
          ],
          primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(locale, "ia/opengraph-image"), width: 1200, height: 630 },
        },
        {
          ...serviceSchema({ name: ai.serviceName, description: ai.lead, path: "ia", serviceType: ai.serviceType, lang: locale }),
          "@id": `${pageUrl}#service`,
          mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
          audience: { "@type": "BusinessAudience", audienceType: ai.summary[0].body },
          serviceOutput: {
            "@type": "ItemList",
            name: ai.deliverablesTitle,
            itemListElement: ai.deliverables.map((name, index) => ({ "@type": "ListItem", position: index + 1, name })),
          },
        },
      ]} />
      <PageHero
        lang={lang}
        path="ia"
        kicker={ai.kicker}
        title={ai.title}
        lead={ai.lead}
        grid={false}
        reveal={false}
        video={{
          lg: "/media/ai-workflows-v1-lg.mp4",
          md: "/media/ai-workflows-v1-md.mp4",
          poster: "/media/ai-workflows-v1-poster.webp",
          priority: true,
          webm: { lg: "/media/ai-workflows-v1-lg.webm", md: "/media/ai-workflows-v1-md.webm", codecs: "av01.0.05M.08" },
        }}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#contacto" analyticsId="ai_hero_contact" className="h-auto min-h-[52px] py-3 text-center">{ai.conversationCta}</Button>
          <Button href="#guia" analyticsId="ai_hero_guide" variant="outline" className="h-auto min-h-[52px] py-3 text-center">{ai.guideCta}</Button>
        </div>
        <p className="mt-4 text-sm text-muted">{ai.conversationNote}</p>
      </PageHero>

      <section id="consultoria-ia" className="scroll-mt-24 border-y border-border bg-bg-soft py-12 sm:py-16" aria-labelledby="ai-summary-title">
        <Container>
          <h2 id="ai-summary-title" className="max-w-3xl font-display text-3xl leading-tight text-fg sm:text-4xl">{ai.summaryTitle}</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">{ai.summaryLead}</p>
          <dl className="mt-8 grid gap-x-12 gap-y-6 sm:grid-cols-2">
            {ai.summary.map((item) => (
              <div key={item.label} className="border-t border-border pt-4">
                <dt className="text-sm font-semibold text-fg">{item.label}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{item.body}</dd>
              </div>
            ))}
          </dl>
          <nav aria-label={ai.navigationLabel} className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6 text-sm">
            {["diagnostico", "oportunidades", "preguntas", "guia"].map((id, index) => (
              <a key={id} href={`#${id}`} className="font-medium text-accent-ink underline decoration-accent/30 underline-offset-4 hover:decoration-accent">{ai.navigation[index]}</a>
            ))}
          </nav>
        </Container>
      </section>

      <Section id="retos" className="scroll-mt-24">
        <Container>
          <SectionHeading title={ai.painTitle} lead={ai.painLead} className="mb-10" />
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ai.pains.map((pain, i) => {
              const Icon = painIcons[i];
              return (
                <article key={pain.title} className="border-t border-border pt-6">
                  <Icon size={22} className="mb-5 text-accent" aria-hidden />
                  <h3 className="text-lg font-semibold text-fg">{pain.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{pain.body}</p>
                </article>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      <Section id="diagnostico" className="relative isolate scroll-mt-24 overflow-hidden border-y border-border bg-bg-soft">
        <Container>
          <div className="lg:max-w-[480px] xl:max-w-[620px]">
            <SectionHeading kicker={ai.kicker} title={ai.offerTitle} lead={ai.offerLead} />
          </div>

          {/* Ambient video: unframed side band, dissolving into the section with gradients */}
          <div className="diag-video-band -z-10" aria-hidden>
            <AmbientVideo
              lg="/media/ai-data-v1-lg.mp4"
              md="/media/ai-data-v1-md.mp4"
              poster="/media/ai-data-v1-poster.webp"
              webm={{ lg: "/media/ai-data-v1-lg.webm", md: "/media/ai-data-v1-md.webm", codecs: "av01.0.05M.08" }}
              intensity="section"
              veil="none"
              blend={false}
              mediaClassName="object-center"
            />
            {/* dissolve toward the content column */}
            <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,var(--bg-soft)_0%,color-mix(in_srgb,var(--bg-soft)_62%,transparent)_12%,transparent_40%)] lg:block" />
            {/* blend into the section above and below */}
            <div className="absolute inset-x-0 top-0 h-14 bg-linear-to-b from-bg-soft to-transparent lg:h-24" />
            <div className="absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-bg-soft to-transparent lg:h-24" />
          </div>

          <div className="mt-10 lg:mt-14 lg:max-w-[480px] xl:max-w-[620px]">
            <ol className="space-y-7">
              {ai.offerSteps.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="watermark-number shrink-0 text-3xl leading-none" aria-hidden>0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-fg">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <FadeUp className="mt-12">
              <aside className="gradient-border rounded-[25px] p-6 sm:p-8">
                <ClipboardList size={24} className="mb-5 text-accent" aria-hidden />
                <h3 className="text-xl font-semibold text-fg">{ai.deliverablesTitle}</h3>
                <ul className="mt-6 space-y-4">
                  {ai.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex gap-3 text-sm leading-relaxed text-fg">
                      <Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                      {deliverable}
                    </li>
                  ))}
                </ul>
                <p className="mt-7 border-t border-border pt-5 text-sm leading-relaxed text-muted">{ai.scopeNote}</p>
              </aside>
            </FadeUp>
          </div>
        </Container>
      </Section>

      <Section id="oportunidades" className="scroll-mt-24">
        <Container>
          <SectionHeading title={ai.useTitle} lead={ai.useLead} className="mb-6 max-w-3xl" />
          <p className="mb-10 text-sm font-medium text-accent-ink">{ai.illustrative}</p>
          <Stagger className="grid gap-5 lg:grid-cols-3">
            {ai.uses.map((use) => (
              <SpotlightCard key={use.title} className="h-full rounded-[25px] border border-border bg-surface p-6 sm:p-7">
                <h3 className="mb-6 text-xl font-semibold text-fg">{use.title}</h3>
                <dl className="space-y-5">
                  <div className="border-l-2 border-border pl-4">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{ai.caseLabels.current}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted">{use.current}</dd>
                  </div>
                  <div className="border-l-2 border-accent pl-4">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-accent-ink">{ai.caseLabels.possible}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-fg">{use.possible}</dd>
                  </div>
                  <div className="rounded-2xl bg-bg-soft p-4">
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fg">
                      <ShieldCheck size={15} className="shrink-0 text-accent" aria-hidden />{ai.caseLabels.control}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted">{use.control}</dd>
                  </div>
                </dl>
              </SpotlightCard>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section id="equipo" className="relative isolate scroll-mt-24 overflow-hidden border-y border-border bg-bg-soft">
        <AmbientVideo
          lg="/media/ai-team-v1-lg.mp4"
          md="/media/ai-team-v1-md.mp4"
          poster="/media/ai-team-v1-poster.webp"
          webm={{ lg: "/media/ai-team-v1-lg.webm", md: "/media/ai-team-v1-md.webm", codecs: "av01.0.05M.08" }}
          veil="none"
          mediaClassName="contrast-110 dark:contrast-100"
          blend={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-bg-soft/70 dark:bg-black/65" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-linear-to-b from-bg-soft/50 to-transparent sm:h-16" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-bg-soft/50 to-transparent sm:h-16" aria-hidden />
        <Container className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading title={ai.collaborationTitle} lead={ai.collaborationLead} className="[&_p]:text-fg/80 dark:[&_p]:text-muted" />
            <Button href={href(lang, routes.portfolio)} analyticsId="ai_experience" variant="outline" className="mt-6 h-auto min-h-[52px] py-3 text-center">{ai.experienceCta}</Button>
          </div>
          <div className="space-y-7">
            {ai.collaboration.map((item, i) => {
              const Icon = controlIcons[i];
              return (
                <article key={item.title} className="flex gap-4 border-b border-border pb-7 last:border-0 last:pb-0">
                  <Icon size={23} className="mt-1 shrink-0 text-accent" aria-hidden />
                  <div>
                    <h3 className="text-lg font-semibold text-fg">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg/80 dark:text-muted">{item.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section id="camino" className="scroll-mt-24">
        <Container>
          <AiJourney3D
            title={ai.journeyTitle}
            lead={ai.journeyLead}
            steps={ai.journey}
            ctaLabel={ai.conversationCta}
            ctaHref="#contacto"
            ctaAnalyticsId="ai_journey_contact"
          />
        </Container>
      </Section>

      <Section id="preguntas" className="scroll-mt-24 border-y border-border bg-bg-soft">
        <Container className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
          <SectionHeading title={ai.faqTitle} />
          <div className="divide-y divide-border border-y border-border">
            {ai.faq.map((item, index) => (
              <details id={`pregunta-${index + 1}`} key={item.question} className="group scroll-mt-24">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 font-semibold text-fg [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown size={20} className="mt-0.5 shrink-0 text-accent transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden />
                </summary>
                <p className="pb-6 pr-8 text-sm leading-relaxed text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="guia" className="scroll-mt-24">
        <Container>
          <SectionHeading kicker={dict.nav.ai} title={ai.guideTitle} lead={ai.guideLead} className="mb-12 max-w-3xl" />
          <ol className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {ai.guideQuestions.map((question, i) => (
              <li id={`guia-paso-${i + 1}`} key={question.title} className="flex scroll-mt-24 gap-4 border-t border-border pt-5">
                <span className="font-mono text-sm text-accent" aria-hidden>0{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-fg">{question.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{question.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-2xl text-sm text-muted">{ai.guideNote}</p>
          <Button href="#contacto" analyticsId="ai_guide_contact" className="mt-6 h-auto min-h-[52px] py-3 text-center">{ai.conversationCta}</Button>
        </Container>
      </Section>

      <ContactBlock
        dict={dict}
        title={ai.contactTitle}
        lead={ai.contactLead}
        note={ai.contactNote}
        formOptions={{
          context: { service: ai.serviceName },
          submitLabel: ai.conversationCta,
          messageLabel: ai.messageLabel,
          messagePlaceholder: ai.messagePlaceholder,
        }}
      />

      <Section className="border-t border-border bg-bg-soft py-14 sm:py-16 lg:py-16">
        <Container className="flex flex-wrap items-center justify-between gap-7">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl text-fg sm:text-3xl">{ai.relatedTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{ai.relatedLead}</p>
          </div>
          <Button href={href(lang, routes.kivi)} analyticsId="ai_related_product" variant="outline" className="h-auto min-h-[52px] py-3 text-center">
            {ai.relatedCta}<ArrowRight size={16} className="shrink-0" aria-hidden />
          </Button>
        </Container>
      </Section>
    </>
  );
}
