import Link from "next/link";
import { getDictionary } from "@/i18n";
import { PageHero } from "@/components/shared/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { href, routes } from "@/lib/utils";

const slugs: Record<string, string> = {
  flyr: routes.flyr,
  merkko: routes.merkko,
  nutrir: routes.nutrir,
  bidmax: routes.bidmax,
};

export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero title={dict.portfolio.title} lead={dict.portfolio.lead} />
      <Section>
        <Container className="grid gap-5 sm:grid-cols-2">
          {dict.portfolio.items.map((item) => (
            <Link
              key={item.slug}
              href={href(lang, slugs[item.slug])}
              className="card-lift rounded-[25px] border border-border bg-surface p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">{item.tag}</p>
              <h2 className="mt-3 text-2xl font-semibold text-fg">{item.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              <span className="mt-6 inline-block text-sm font-semibold text-accent">{dict.common.seeMore} →</span>
            </Link>
          ))}
        </Container>
      </Section>
    </>
  );
}
