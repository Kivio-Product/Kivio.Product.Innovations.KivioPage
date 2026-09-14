import { getDictionary } from "@/i18n";
import { PageHero } from "@/components/shared/PageHero";
import { Container, Section } from "@/components/ui/Container";

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero title={dict.privacy.title} lead={dict.privacy.lead} />
      <Section>
        <Container className="max-w-3xl space-y-8">
          <p className="text-sm text-muted-2">{dict.privacy.updated}</p>
          {dict.privacy.sections.map((s) => (
            <article key={s.title}>
              <h2 className="text-xl font-semibold text-fg">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
            </article>
          ))}
        </Container>
      </Section>
    </>
  );
}
