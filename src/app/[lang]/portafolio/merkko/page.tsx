import Image from "next/image";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/page-seo";
import { Parallax } from "@/components/motion/motion";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { ContactBlock } from "@/components/shared/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata(params, (d) => ({
    title: `${d.merkko.title} — ${d.portfolio.items[1].tag}`,
    description: d.merkko.lead,
    path: "portafolio/merkko",
  }));
}

export default async function MerkkoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero lang={lang} path="portafolio/merkko" title={dict.merkko.title} lead={dict.merkko.lead} leadScroll>
        <Image src="/images/pages/merkko-logo-big.png" alt="Merkko" width={320} height={100} className="mb-6 h-16 w-auto object-contain" />
        <Button href="https://merkko.com.co/" external>
          {dict.common.viewResult}
        </Button>
      </PageHero>
      <Section>
        <Container>
          <h2 className="mb-8 font-display text-3xl text-fg">{dict.merkko.featuresTitle}</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {dict.merkko.features.map((f) => (
              <article key={f.title} className="rounded-[20px] border border-border bg-surface p-6">
                <h3 className="font-semibold text-fg">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-bg-soft">
        <Container>
          <h2 className="font-display text-3xl text-fg">{dict.merkko.sectionsTitle}</h2>
          <p className="mt-3 max-w-2xl text-muted">{dict.merkko.sections}</p>
          <Parallax speed={0.035}>
            <div className="shot-frame mt-8">
              <Image
                src="/images/pages/merkko-mockup-big.png"
                alt="Merkko"
                width={1200}
                height={700}
                className="w-full object-cover"
              />
            </div>
          </Parallax>
        </Container>
      </Section>
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-fg">{dict.merkko.appTitle}</h2>
            <p className="mt-4 text-muted">{dict.merkko.app}</p>
            <blockquote className="mt-8 border-l-2 border-accent pl-5 text-fg">
              “{dict.merkko.quote}”
              <footer className="mt-3 text-sm text-muted">{dict.merkko.quoteBy}</footer>
            </blockquote>
            <Button href="https://merkko.com.co/" external className="mt-8">
              {dict.common.viewResult}
            </Button>
          </div>
          <Image src="/images/pages/merkko-app.png" alt="" width={420} height={420} className="mx-auto w-56 object-contain" />
        </Container>
      </Section>
      <ContactBlock dict={dict} />
    </>
  );
}
