import Image from "next/image";
import { Heart, Lightbulb, Medal, Monitor, Scale, Sparkles } from "lucide-react";
import { getDictionary } from "@/i18n";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ContactBlock } from "@/components/shared/ContactForm";

const icons = [Medal, Heart, Lightbulb, Sparkles, Scale, Monitor];

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero title={dict.about.title} lead={dict.about.lead} />
      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>{dict.about.teamNote}</Eyebrow>
            <h2 className="font-display text-3xl text-fg sm:text-4xl">{dict.about.storyTitle}</h2>
            <p className="mt-4 text-muted">{dict.about.story}</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-[20px] border border-border bg-surface p-6">
                <p className="font-display text-3xl text-muted-2">{dict.about.missionN}</p>
                <h3 className="mt-3 font-semibold text-fg">{dict.about.missionTitle}</h3>
                <p className="mt-2 text-sm text-muted">{dict.about.mission}</p>
              </div>
              <div className="rounded-[20px] border border-border bg-surface p-6">
                <p className="font-display text-3xl text-muted-2">{dict.about.visionN}</p>
                <h3 className="mt-3 font-semibold text-fg">{dict.about.visionTitle}</h3>
                <p className="mt-2 text-sm text-muted">{dict.about.vision}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Image
              src="/images/pages/sobre-nosotros-equipo.png"
              alt=""
              width={900}
              height={700}
              className="w-full rounded-[25px] object-cover"
            />
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-bg-soft">
        <Container>
          <Reveal>
            <Eyebrow>{dict.about.valuesKicker}</Eyebrow>
            <h2 className="max-w-2xl font-display text-3xl text-fg sm:text-4xl">{dict.about.valuesTitle}</h2>
            <p className="mt-4 max-w-2xl text-muted">{dict.about.valuesLead}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dict.about.values.map((v, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={v.title} delay={i * 50}>
                  <article className="card-lift h-full rounded-[16px] border border-border bg-surface p-6">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-semibold text-fg">{v.title}</h3>
                    <p className="mt-2 text-sm text-muted">{v.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <Eyebrow>{dict.home.productsKicker}</Eyebrow>
            <h2 className="mb-10 font-display text-3xl text-fg">{dict.home.productsTitle}</h2>
          </Reveal>
          <ProductGrid lang={lang} dict={dict} />
        </Container>
      </Section>
      <ContactBlock dict={dict} />
    </>
  );
}
