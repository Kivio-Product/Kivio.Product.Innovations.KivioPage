import Image from "next/image";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/page-seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareAppSchema } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero, FeatureGrid } from "@/components/shared/PageHero";
import { ScrollSteps } from "@/components/motion/motion";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ContactBlock } from "@/components/shared/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata(params, (d) => ({
    title: d.bidmax.title,
    description: d.bidmax.lead,
    path: "productos/kivio-bidmax",
  }));
}

export default async function BidmaxPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <JsonLd
        data={softwareAppSchema({
          name: dict.bidmax.title,
          description: dict.bidmax.lead,
          path: "productos/kivio-bidmax",
        })}
      />
      <PageHero lang={lang} path="productos/kivio-bidmax" kicker={dict.nav.products} title={dict.bidmax.title} lead={dict.bidmax.lead} leadScroll>
        <div className="flex flex-wrap gap-3">
          <Button href="#contacto">{dict.common.requestDemo}</Button>
          <Button href="#contacto" variant="outline">
            {dict.common.requestConsult}
          </Button>
        </div>
      </PageHero>
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Image src="/images/pages/bidmax-handshake.png" alt="" width={800} height={520} className="w-full rounded-[25px] object-cover" />
          <div>
            <h2 className="mb-6 font-display text-3xl text-fg">{dict.bidmax.featuresTitle}</h2>
            <FeatureGrid items={dict.bidmax.features} />
          </div>
        </Container>
      </Section>
      <Section className="bg-bg-soft">
        <Container>
          <h2 className="mb-10 font-display text-3xl text-fg">{dict.bidmax.canDoTitle}</h2>
          <FeatureGrid items={dict.bidmax.canDo} />
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="font-display text-3xl text-fg">{dict.bidmax.businessesTitle}</h2>
          <p className="mt-3 max-w-2xl text-muted">{dict.bidmax.businessesLead}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {dict.bidmax.businesses.map((b) => (
              <span key={b} className="rounded-full border border-border bg-surface px-4 py-2 text-sm">
                {b}
              </span>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-bg-soft">
        <Container>
          <h2 className="mb-10 font-display text-3xl text-fg">{dict.bidmax.flowTitle}</h2>
          <ScrollSteps items={dict.bidmax.flow} />
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="font-display text-3xl text-fg">{dict.bidmax.channelsTitle}</h2>
          <p className="mt-3 max-w-2xl text-muted">{dict.bidmax.channelsLead}</p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {dict.bidmax.channels.map((c, i) => (
              <article key={c.title} className="overflow-hidden rounded-[20px] border border-border bg-surface">
                <Image
                  src={i === 0 ? "/images/pages/bidmax-whatsapp.png" : "/images/pages/bidmax-email.png"}
                  alt=""
                  width={800}
                  height={480}
                  className="h-56 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-fg">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted">{c.body}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">{dict.bidmax.channelsNote}</p>
        </Container>
      </Section>
      <Section className="bg-bg-soft">
        <Container>
          <h2 className="mb-10 font-display text-3xl text-fg">{dict.home.productsTitle}</h2>
          <ProductGrid lang={lang} dict={dict} exclude="bidmax" />
        </Container>
      </Section>
      <ContactBlock dict={dict} />
    </>
  );
}
