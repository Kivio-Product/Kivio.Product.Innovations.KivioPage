import Image from "next/image";
import { BadgeCheck, Check, Clock, Headset, Radar, Server, ShieldCheck, Zap } from "lucide-react";

type CardLabels = {
  uptime: { title: string; sub: string };
  sla: { title: string; sub: string };
  monitor: { title: string; sub: string };
  oncall: { title: string; sub: string };
};

type FlowLabels = {
  live: string;
  user: { title: string; sub: string; msg: string };
  agent: { title: string; sub: string; steps: string[]; chips: string[] };
  backend: { title: string; sub: string; ok: string; okSub: string; noHuman: string };
};

/* ── traveling light beam connectors (transform/opacity only) ── */
function Connector() {
  return (
    <>
      {/* vertical (mobile) */}
      <div className="relative mx-auto h-10 w-px shrink-0 overflow-hidden lg:hidden" aria-hidden>
        <span className="absolute inset-y-0 left-0 w-px bg-linear-to-b from-white/5 via-white/25 to-white/5" />
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
          <span className="absolute inset-0 bg-linear-to-r from-white/5 via-white/25 to-white/5" />
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

/**
 * Operations diagram — intentionally dark in both themes: a "control room" surface
 * that contrasts against the light page, the same way product visuals do in
 * premium B2B sites.
 */
export function HeroDiagram({ labels, flow }: { labels: CardLabels; flow: FlowLabels }) {
  return (
    <div className="relative mx-auto w-full max-w-[980px]">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[40px] bg-accent/14 blur-3xl"
        aria-hidden
      />

      {/* ── architecture canvas (always dark) ── */}
      <div className="relative overflow-hidden rounded-[25px] border border-white/10 bg-[#050a14] shadow-(--card-shadow)">
        <div className="absolute inset-0 dots-pattern opacity-25" aria-hidden />
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" aria-hidden />

        <div className="relative px-5 pb-10 pt-8 sm:px-8 sm:pb-12 sm:pt-10">
          {/* live badge */}
          <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-white/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {flow.live}
          </p>

          {/* flow: critical surface → operations → outcome */}
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            {/* 1 · critical surface */}
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-400/15 text-sky-300">
                  <Server size={18} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{flow.user.title}</p>
                  <p className="truncate text-xs text-white/60">{flow.user.sub}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="truncate text-xs leading-relaxed text-white/80">{flow.user.msg}</span>
              </div>
            </div>

            <Connector />

            {/* 2 · KIVIO operations */}
            <div className="node-glow relative flex-[1.2] overflow-hidden rounded-2xl border border-accent/35 bg-linear-to-b from-accent/[0.14] to-white/[0.03] p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white shadow-[0_0_30px_-6px_rgba(246,110,76,0.9)] ring-1 ring-white/20">
                  <Image src="/brand/logo-mark.png" alt="" width={26} height={28} className="h-[26px] w-auto" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{flow.agent.title}</p>
                  <p className="truncate text-xs text-white/60">{flow.agent.sub}</p>
                </div>
              </div>

              {/* operations micro-log */}
              <ol className="mt-4 space-y-1.5">
                {flow.agent.steps.map((s, i) => (
                  <li
                    key={s}
                    className="step-log-item flex items-start gap-2 text-[11px] leading-snug text-white/75"
                    style={{ animationDelay: `${0.35 + i * 0.5}s` }}
                  >
                    <span className="mt-[1px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
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
                    className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-medium text-white/60"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <Connector />

            {/* 3 · outcome */}
            <div className="flex-1 rounded-2xl border border-emerald-400/20 bg-white/[0.04] p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300">
                  <BadgeCheck size={18} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{flow.backend.title}</p>
                  <p className="truncate text-xs text-white/60">{flow.backend.sub}</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.08] p-3">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-emerald-400/20 text-emerald-300">
                    <Check size={13} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white">{flow.backend.ok}</p>
                    <p className="truncate text-[10px] text-white/60">{flow.backend.okSub}</p>
                  </div>
                </div>
                <p className="mt-2.5 flex items-center gap-1.5 border-t border-white/10 pt-2 text-[10px] text-white/55">
                  <Zap size={11} className="shrink-0 text-emerald-300" aria-hidden />
                  {flow.backend.noHuman}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* accent ribbon */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-linear-to-r from-accent via-accent-2 to-accent-3" aria-hidden />
      </div>

      {/* ── floating cards (dark on both themes) ── */}
      <div
        className="float-card absolute -top-4 right-2 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#0b1220]/90 px-3.5 py-2.5 text-xs shadow-(--card-shadow) backdrop-blur-xl sm:-top-6 sm:right-6 sm:px-4 sm:py-3"
        style={{ animationDelay: "0.4s" }}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300">
          <ShieldCheck size={15} aria-hidden />
        </span>
        <span>
          <span className="flex items-center gap-1.5 font-semibold text-white">
            <BadgeCheck size={13} className="text-emerald-400" aria-hidden />
            {labels.uptime.title}
          </span>
          <span className="block text-white/60">{labels.uptime.sub}</span>
        </span>
      </div>

      <div
        className="float-card absolute -left-3 -top-7 hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-[#0b1220]/90 px-4 py-3 text-xs shadow-(--card-shadow) backdrop-blur-xl lg:flex"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
          <Clock size={15} aria-hidden />
        </span>
        <span>
          <span className="block font-semibold text-white">{labels.sla.title}</span>
          <span className="flex items-center gap-1.5 text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
            {labels.sla.sub}
          </span>
        </span>
      </div>

      <div
        className="float-card absolute -bottom-5 left-2 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#0b1220]/90 px-4 py-3 text-xs shadow-(--card-shadow) backdrop-blur-xl sm:-bottom-7 sm:left-10"
        style={{ animationDelay: "2s" }}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-sky-400/15 text-sky-300">
          <Radar size={15} aria-hidden />
        </span>
        <span>
          <span className="block font-semibold text-white">{labels.monitor.title}</span>
          <span className="flex items-center gap-1.5 text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
            {labels.monitor.sub}
          </span>
        </span>
      </div>

      <div
        className="float-card absolute -bottom-4 right-3 hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-[#0b1220]/90 px-4 py-3 text-xs shadow-(--card-shadow) backdrop-blur-xl sm:flex lg:right-14"
        style={{ animationDelay: "0.9s" }}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet-400/15 text-violet-300">
          <Headset size={15} aria-hidden />
        </span>
        <span>
          <span className="block font-semibold text-white">{labels.oncall.title}</span>
          <span className="block text-white/60">{labels.oncall.sub}</span>
        </span>
      </div>
    </div>
  );
}
