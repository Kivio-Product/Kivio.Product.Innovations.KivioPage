import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeUp, ScrollText, SpotlightCard, Stagger } from "@/components/motion/motion";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { getDictionary } from "@/i18n";

export function PageHero({
  lang,
  path,
  iconSrc,
  kicker,
  title,
  lead,
  leadScroll,
  children,
}: {
  lang?: string;
  path?: string;
  iconSrc?: string;
  kicker?: string;
  title: string;
  lead?: string;
  leadScroll?: boolean;
  children?: React.ReactNode;
}) {
  const dict = lang ? getDictionary(lang) : null;
  return (
    <section className="relative overflow-hidden pt-16 pb-14 sm:pt-24 sm:pb-18">
      <div className="aurora" aria-hidden />
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" aria-hidden />
      {lang && path !== undefined && (
        <JsonLd
          data={breadcrumbSchema(lang, [
            { name: dict?.nav.home ?? "Inicio", path: "" },
            { name: title, path },
          ])}
        />
      )}
      <Container className="relative">
        <FadeUp>
          {iconSrc && (
            <Image
              src={iconSrc}
              alt=""
              width={72}
              height={72}
              className="mb-5 h-16 w-16 drop-shadow-[0_10px_28px_rgba(246,110,76,0.35)] sm:h-[72px] sm:w-[72px]"
            />
          )}
          {kicker && (
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              <span className="inline-block h-px w-6 bg-accent" aria-hidden />
              {kicker}
            </p>
          )}
          <h1 className="max-w-4xl font-display text-4xl leading-[1.08] text-fg sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {lead &&
            (leadScroll ? (
              <ScrollText
                text={lead}
                className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
              />
            ) : (
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p>
            ))}
          {children && <div className="mt-8">{children}</div>}
        </FadeUp>
      </Container>
    </section>
  );
}

export function FeatureGrid({
  items,
  numbered,
}: {
  items: { title: string; body: string; n?: string }[];
  numbered?: boolean;
}) {
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <SpotlightCard
          key={item.title}
          className="card-lift h-full rounded-[20px] border border-border bg-surface p-6 sm:p-7"
        >
          {numbered && (
            <p className="mb-4 font-display text-3xl text-muted-2">{item.n ?? String(i + 1).padStart(2, "0")}</p>
          )}
          <h3 className="text-lg font-semibold text-fg">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
        </SpotlightCard>
      ))}
    </Stagger>
  );
}
