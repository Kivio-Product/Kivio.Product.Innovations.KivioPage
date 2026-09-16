import Image from "next/image";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/page-seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { PageHero, FeatureGrid } from "@/components/shared/PageHero";
import { Parallax, ScrollSteps, ScrollText } from "@/components/motion/motion";
import { ContactBlock } from "@/components/shared/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata(params, (d) => ({
    title: d.airlines.title,
    description: d.airlines.lead,
    path: "soporte-a-aerolineas",
  }));
}

export default async function AirlinesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: dict.airlines.title,
          description: dict.airlines.lead,
          path: "soporte-a-aerolineas",
          serviceType: "Soporte y desarrollo de sistemas para aerolíneas (PSS/IBE)",
        })}
      />
      <PageHero lang={lang} path="soporte-a-aerolineas" title={dict.airlines.title} lead={dict.airlines.lead} leadScroll>
        <Button href="#contacto">{dict.common.requestConsult}</Button>
      </PageHero>
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Image
            src="/images/pages/avion-atardecer.png"
            alt=""
            width={900}
            height={600}
            className="h-[380px] w-full rounded-[25px] object-cover grayscale-[30%] contrast-125"
          />
          <div>
            <h2 className="mb-6 font-display text-3xl text-fg">{dict.airlines.featuresTitle}</h2>
            <div className="grid gap-4">
              {dict.home.features.map((f) => (
                <article key={f.title} className="rounded-2xl border border-border bg-surface p-5">
                  <h3 className="font-semibold text-fg">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <Section className="bg-bg-soft">
        <Container>
          <Eyebrow>{dict.airlines.ecosystemTitle}</Eyebrow>
          <h2 className="max-w-3xl font-display text-3xl text-fg sm:text-4xl">{dict.airlines.supportTitle}</h2>
          <ScrollText text={dict.airlines.supportLead} className="mt-4 max-w-2xl text-muted" />
          <Parallax speed={0.06}>
            <Image
              src="/images/pages/kivio-avion.png"
              alt=""
              width={900}
              height={400}
              className="my-10 w-full max-w-lg object-contain"
            />
          </Parallax>
          <FeatureGrid items={dict.airlines.solutions} />
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="mb-10 font-display text-3xl text-fg">{dict.airlines.flowTitle}</h2>
          <ScrollSteps items={dict.airlines.flow} />
        </Container>
      </Section>
      <Section className="bg-bg-soft">
        <Container>
          <Eyebrow>{dict.airlines.reasonsKicker}</Eyebrow>
          <h2 className="mb-10 font-display text-3xl text-fg">{dict.airlines.reasonsTitle}</h2>
          <FeatureGrid items={dict.airlines.reasons} numbered />
          <p className="mt-12 max-w-3xl text-muted">{dict.airlines.close}</p>
          <Image
            src="/images/pages/kivio-avion-2.png"
            alt=""
            width={700}
            height={360}
            className="mt-8 w-full max-w-md object-contain"
          />
        </Container>
      </Section>
      <ContactBlock dict={dict} />
    </>
  );
}
