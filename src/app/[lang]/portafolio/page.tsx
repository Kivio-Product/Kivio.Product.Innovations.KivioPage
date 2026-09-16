import Link from "next/link";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/page-seo";
import { PageHero } from "@/components/shared/PageHero";
import { SpotlightCard, Stagger } from "@/components/motion/motion";
import { Container, Section } from "@/components/ui/Container";
import { href, routes } from "@/lib/utils";

const slugs: Record<string, string> = {
  flyr: routes.flyr,
  merkko: routes.merkko,
  nutrir: routes.nutrir,
  bidmax: routes.bidmax,
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata(params, (d) => ({
    title: d.portfolio.title,
    description: d.portfolio.lead,
    path: "portafolio",
  }));
}

export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero lang={lang} path="portafolio" title={dict.portfolio.title} lead={dict.portfolio.lead} leadScroll />
      <Section>
        <Container>
          <Stagger className="grid gap-5 sm:grid-cols-2">
            {dict.portfolio.items.map((item) => (
              <SpotlightCard key={item.slug} className="card-lift h-full rounded-[25px] border border-border bg-surface">
                <Link href={href(lang, slugs[item.slug])} className="group block h-full p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">{item.tag}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-fg">{item.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                  <span className="mt-6 inline-block text-sm font-semibold text-accent">
                    {dict.common.seeMore}{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </SpotlightCard>
            ))}
          </Stagger>
        </Container>
      </Section>
    </>
  );
}
