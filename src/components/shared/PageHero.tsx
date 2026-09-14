import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function PageHero({
  kicker,
  title,
  lead,
  children,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16">
      <div className="pointer-events-none absolute inset-0 hero-glow" />
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <Container className="relative">
        <Reveal>
          {kicker && <Eyebrow>{kicker}</Eyebrow>}
          <h1 className="max-w-4xl font-display text-4xl leading-[1.1] text-fg sm:text-5xl lg:text-6xl">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
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
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <article
          key={item.title}
          className="card-lift rounded-[20px] border border-border bg-surface p-6 sm:p-7"
        >
          {numbered && (
            <p className="mb-4 font-display text-3xl text-muted-2">{item.n ?? String(i + 1).padStart(2, "0")}</p>
          )}
          <h3 className="text-lg font-semibold text-fg">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <li key={item.title} className="relative rounded-[20px] border border-border bg-surface p-6">
          <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
            {i + 1}
          </span>
          <h3 className="text-base font-semibold text-fg">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
