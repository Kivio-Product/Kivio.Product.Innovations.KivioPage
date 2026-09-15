import Image from "next/image";
import { Plane, Rocket, Sparkles, TrendingUp } from "lucide-react";

type CardLabels = {
  ai: { title: string; sub: string };
  deploy: { title: string; sub: string };
  metric: { title: string; sub: string };
  flight: { title: string; sub: string };
};

export function HeroVisual({ labels }: { labels: CardLabels }) {
  return (
    <div className="relative mx-auto w-full max-w-[980px]">
      {/* Glow */}
      <div
        className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[40px] bg-accent/14 blur-3xl"
        aria-hidden
      />

      {/* Main device canvas */}
      <div className="gradient-border-soft grain relative overflow-hidden rounded-[25px] bg-linear-to-b from-surface to-bg-soft p-3 shadow-(--card-shadow) sm:p-6 lg:p-8">
        <div className="pointer-events-none absolute inset-0 dots-pattern opacity-40" aria-hidden />
        <Image
          src="/images/pages/ecommerce-pc.png"
          alt="Plataforma KIVIO eCommerce"
          width={1114}
          height={708}
          priority
          sizes="(max-width: 1024px) 100vw, 980px"
          className="relative w-full drop-shadow-2xl"
        />
      </div>

      {/* Floating cards */}
      <div
        className="float-card glass absolute -top-4 right-2 flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-xs shadow-(--card-shadow) sm:-top-6 sm:right-6 sm:px-4 sm:py-3"
        style={{ animationDelay: "0.4s" }}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
          <Sparkles size={15} aria-hidden />
        </span>
        <span>
          <span className="block font-semibold text-fg">{labels.ai.title}</span>
          <span className="block text-muted">{labels.ai.sub}</span>
        </span>
      </div>

      <div
        className="float-card glass absolute -left-3 top-1/3 hidden items-center gap-2.5 rounded-2xl px-4 py-3 text-xs shadow-(--card-shadow) lg:flex"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-500/12 text-emerald-500">
          <Rocket size={15} aria-hidden />
        </span>
        <span>
          <span className="block font-semibold text-fg">{labels.deploy.title}</span>
          <span className="block text-muted">{labels.deploy.sub}</span>
        </span>
      </div>

      <div
        className="float-card glass absolute -bottom-5 left-2 flex items-end gap-3 rounded-2xl px-4 py-3 text-xs shadow-(--card-shadow) sm:-bottom-7 sm:left-10"
        style={{ animationDelay: "2s" }}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
          <TrendingUp size={15} aria-hidden />
        </span>
        <span>
          <span className="block font-semibold text-fg">{labels.metric.title}</span>
          <span className="block text-muted">{labels.metric.sub}</span>
        </span>
        <span className="ml-1 flex items-end gap-1" aria-hidden>
          {[10, 16, 13, 22, 28].map((h, i) => (
            <span
              key={i}
              className="w-1.5 rounded-full bg-linear-to-t from-accent to-accent-3"
              style={{ height: `${h}px` }}
            />
          ))}
        </span>
      </div>

      <div
        className="float-card glass absolute -bottom-4 right-3 hidden items-center gap-2.5 rounded-2xl px-4 py-3 text-xs shadow-(--card-shadow) sm:flex lg:right-14"
        style={{ animationDelay: "0.9s" }}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-night text-white">
          <Plane size={15} aria-hidden />
        </span>
        <span>
          <span className="block font-semibold text-fg">{labels.flight.title}</span>
          <span className="block text-muted">{labels.flight.sub}</span>
        </span>
      </div>
    </div>
  );
}
