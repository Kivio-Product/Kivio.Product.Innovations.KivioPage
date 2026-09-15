import Image from "next/image";
import { BadgeCheck, Check, RefreshCw, ShieldCheck, Ticket, Zap } from "lucide-react";

type CardLabels = {
  ai: { title: string; sub: string };
  wa: { title: string; sub: string };
  sync: { title: string; sub: string };
  uptime: { title: string; sub: string };
};

type FlowLabels = {
  live: string;
  user: { title: string; sub: string; msg: string };
  agent: { title: string; sub: string; steps: string[]; chips: string[] };
  backend: { title: string; sub: string; ok: string; okSub: string; noHuman: string };
};

function WhatsAppGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ── traveling light beam connectors (transform/opacity only) ── */
function Connector() {
  return (
    <>
      {/* vertical (mobile) */}
      <div className="relative mx-auto h-10 w-px shrink-0 overflow-hidden lg:hidden" aria-hidden>
        <span className="absolute inset-y-0 left-0 w-px bg-linear-to-b from-fg/5 via-fg/25 to-fg/5" />
        {[0, 1.3].map((d) => (
          <span
            key={d}
            className="pulse-beam-y absolute left-[-0.5px] top-0 h-[22px] w-[2px] rounded-full"
            style={{ animationDelay: `${d}s` }}
          />
        ))}
      </div>
      {/* horizontal (desktop) — line is vertically centered in the row */}
      <div className="relative hidden w-16 shrink-0 items-center lg:flex" aria-hidden>
        <span className="relative block h-[2px] w-full overflow-hidden rounded-full">
          <span className="absolute inset-0 bg-linear-to-r from-fg/5 via-fg/25 to-fg/5" />
          {[0, 1.3].map((d) => (
            <span
              key={d}
              className="pulse-beam-x absolute left-0 top-0 h-full w-[22px] rounded-full"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </span>
      </div>
    </>
  );
}

export function HeroDiagram({ labels, flow }: { labels: CardLabels; flow: FlowLabels }) {
  return (
    <div className="relative mx-auto w-full max-w-[980px]">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[40px] bg-accent/14 blur-3xl"
        aria-hidden
      />

      {/* ── architecture canvas (theme-aware) ── */}
      <div className="relative overflow-hidden rounded-[25px] border border-border bg-surface-2 shadow-(--card-shadow) dark:border-white/10 dark:bg-[#050a14]">
        <div className="absolute inset-0 dots-pattern opacity-40 dark:opacity-25" aria-hidden />
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl dark:bg-accent/20" aria-hidden />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-emerald-500/[0.08] blur-3xl dark:bg-emerald-500/10" aria-hidden />

        <div className="relative px-5 pb-10 pt-8 sm:px-8 sm:pb-12 sm:pt-10">
          {/* live badge */}
          <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-medium text-muted shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70 dark:shadow-none">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {flow.live}
          </p>

          {/* flow: channels → engine → resolution */}
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            {/* 1 · real channels */}
            <div className="flex-1 rounded-2xl border border-border bg-surface p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#25D366]/12 text-[#1da851] dark:bg-[#25D366]/15 dark:text-[#25D366]">
                  <WhatsAppGlyph />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-fg">{flow.user.title}</p>
                  <p className="truncate text-xs text-muted">{flow.user.sub}</p>
                </div>
              </div>
              <p className="mt-4 rounded-xl rounded-bl-sm border border-border bg-surface-2 px-3 py-2 text-xs leading-relaxed text-fg dark:border-white/10 dark:bg-white/[0.06] dark:text-white/80">
                “{flow.user.msg}”
              </p>
            </div>

            <Connector />

            {/* 2 · KIVI AI engine */}
            <div className="node-glow relative flex-[1.2] overflow-hidden rounded-2xl border border-accent/40 bg-linear-to-b from-accent/[0.08] to-surface p-4 backdrop-blur-sm dark:border-accent/35 dark:from-accent/[0.14] dark:to-white/[0.03]">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white shadow-[0_0_30px_-6px_rgba(246,110,76,0.9)] ring-1 ring-black/5 dark:ring-white/20">
                  <Image src="/brand/kivi-ai-logo.png" alt="" width={30} height={30} className="h-[30px] w-[30px]" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-fg">{flow.agent.title}</p>
                  <p className="truncate text-xs text-muted">{flow.agent.sub}</p>
                </div>
              </div>

              {/* reasoning micro-log */}
              <ol className="mt-4 space-y-1.5">
                {flow.agent.steps.map((s, i) => (
                  <li
                    key={s}
                    className="step-log-item flex items-start gap-2 text-[11px] leading-snug text-fg/80 dark:text-white/75"
                    style={{ animationDelay: `${0.35 + i * 0.5}s` }}
                  >
                    <span className="mt-[1px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/12 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300">
                      <Check size={10} aria-hidden />
                    </span>
                    <span className="min-w-0">{s}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {flow.agent.chips.map((c) => (
                  <span
                    key={c}
                    className="inline-flex rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] font-medium text-muted dark:border-white/10 dark:bg-white/[0.05] dark:text-white/60"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <Connector />

            {/* 3 · resolution & sync */}
            <div className="flex-1 rounded-2xl border border-border bg-surface p-4 shadow-sm backdrop-blur-sm dark:border-emerald-400/20 dark:bg-white/[0.04] dark:shadow-none">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500/12 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300">
                  <Ticket size={18} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-fg">{flow.backend.title}</p>
                  <p className="truncate text-xs text-muted">{flow.backend.sub}</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.07] p-3 dark:border-emerald-400/25 dark:bg-emerald-400/[0.08]">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/20 dark:text-emerald-300">
                    <Check size={13} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-fg">{flow.backend.ok}</p>
                    <p className="truncate text-[10px] text-muted">{flow.backend.okSub}</p>
                  </div>
                </div>
                <p className="mt-2.5 flex items-center gap-1.5 border-t border-emerald-500/15 pt-2 text-[10px] text-muted dark:border-white/10 dark:text-white/55">
                  <Zap size={11} className="shrink-0 text-emerald-600 dark:text-emerald-300" aria-hidden />
                  {flow.backend.noHuman}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* accent ribbon */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-linear-to-r from-accent via-accent-2 to-accent-3" aria-hidden />
      </div>

      {/* ── floating cards ── */}
      <div
        className="float-card glass absolute -top-4 right-2 flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-xs shadow-(--card-shadow) sm:-top-6 sm:right-6 sm:px-4 sm:py-3"
        style={{ animationDelay: "0.4s" }}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white ring-1 ring-black/5 dark:ring-white/15">
          <Image src="/brand/kivi-ai-logo.png" alt="" width={24} height={24} className="h-6 w-6" />
        </span>
        <span>
          <span className="block font-semibold text-fg">{labels.ai.title}</span>
          <span className="block text-muted">{labels.ai.sub}</span>
        </span>
      </div>

      <div
        className="float-card glass absolute -left-3 -top-7 hidden items-center gap-2.5 rounded-2xl px-4 py-3 text-xs shadow-(--card-shadow) lg:flex"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#25D366]/12 text-[#1da851] dark:bg-[#25D366]/15 dark:text-[#25D366]">
          <WhatsAppGlyph size={15} />
        </span>
        <span>
          <span className="block font-semibold text-fg">{labels.wa.title}</span>
          <span className="flex items-center gap-1.5 text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
            {labels.wa.sub}
          </span>
        </span>
      </div>

      <div
        className="float-card glass absolute -bottom-5 left-2 flex items-center gap-2.5 rounded-2xl px-4 py-3 text-xs shadow-(--card-shadow) sm:-bottom-7 sm:left-10"
        style={{ animationDelay: "2s" }}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-500/12 text-emerald-600 dark:bg-emerald-500/12 dark:text-emerald-500">
          <RefreshCw size={15} aria-hidden />
        </span>
        <span>
          <span className="block font-semibold text-fg">{labels.sync.title}</span>
          <span className="flex items-center gap-1.5 text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
            {labels.sync.sub}
          </span>
        </span>
      </div>

      <div
        className="float-card glass absolute -bottom-4 right-3 hidden items-center gap-2.5 rounded-2xl px-4 py-3 text-xs shadow-(--card-shadow) sm:flex lg:right-14"
        style={{ animationDelay: "0.9s" }}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-500/12 text-emerald-600 dark:bg-emerald-500/12 dark:text-emerald-500">
          <ShieldCheck size={15} aria-hidden />
        </span>
        <span>
          <span className="flex items-center gap-1.5 font-semibold text-fg">
            <BadgeCheck size={13} className="text-emerald-600 dark:text-emerald-500" aria-hidden />
            {labels.uptime.title}
          </span>
          <span className="block text-muted">{labels.uptime.sub}</span>
        </span>
      </div>
    </div>
  );
}
