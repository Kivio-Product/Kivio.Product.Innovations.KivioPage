import Image from "next/image";
import { getDictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { ContactBlock } from "@/components/shared/ContactForm";

export default async function NutrirPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero title={dict.nutrir.title} lead={dict.nutrir.lead}>
        <Image src="/images/pages/nutrir-logo-big.png" alt="Nutrir" width={220} height={160} className="mb-6 h-28 w-auto object-contain" />
        <Button href="https://www.nutrirong.com/" external>
          {dict.common.viewResult}
        </Button>
      </PageHero>
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Image
            src="/images/pages/nutrir-foto.png"
            alt=""
            width={800}
            height={600}
            className="w-full rounded-[25px] object-cover"
          />
          <div className="grid gap-4">
            {dict.nutrir.features.map((f) => (
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
          <h2 className="font-display text-3xl text-fg">{dict.nutrir.sectionsTitle}</h2>
          <p className="mt-3 max-w-2xl text-muted">{dict.nutrir.sections}</p>
          <Image
            src="/images/pages/nutrir-mockup-big.png"
            alt="Nutrir"
            width={1200}
            height={700}
            className="mt-8 w-full rounded-[25px] object-cover"
          />
          <Button href="https://www.nutrirong.com/" external className="mt-8">
            {dict.common.viewResult}
          </Button>
        </Container>
      </Section>
      <ContactBlock dict={dict} />
    </>
  );
}
