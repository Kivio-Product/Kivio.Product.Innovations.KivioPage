import { Counter, FadeUp, Stagger } from "@/components/motion/motion";
import { Container } from "@/components/ui/Container";
import { Star } from "lucide-react";

export function StatsRow({
  items,
}: {
  items: { value: number; prefix?: string; suffix?: string; label: string }[];
}) {
  return (
    <Container>
      <Stagger className="grid gap-6 rounded-[25px] border border-border bg-surface p-8 sm:grid-cols-2 lg:grid-cols-4 lg:p-10">
        {items.map((s) => (
          <div key={s.label} className="text-center lg:text-left">
            <p className="font-display text-4xl text-fg sm:text-5xl">
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </Stagger>
    </Container>
  );
}

export function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <FadeUp>
      <figure className="glass mx-auto max-w-3xl rounded-[25px] p-8 text-center sm:p-10">
        <div className="mb-5 flex justify-center gap-1 text-accent" aria-label="5/5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} fill="currentColor" strokeWidth={0} aria-hidden />
          ))}
        </div>
        <blockquote className="font-display text-xl leading-snug text-fg sm:text-2xl">“{quote}”</blockquote>
        <figcaption className="mt-6 text-sm text-muted">
          <span className="font-semibold text-fg">{author}</span> · {role}
        </figcaption>
      </figure>
    </FadeUp>
  );
}
