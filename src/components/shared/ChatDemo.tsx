"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Plane, Sparkles, Ticket } from "lucide-react";

type Msg = {
  from: "user" | "ai";
  text: string;
  card?: { kind: "flight" | "ticket"; title: string; lines: string[] };
};

const script: Msg[] = [
  { from: "user", text: "¿Tienen vuelos a Medellín mañana para 2 pasajeros?" },
  {
    from: "ai",
    text: "Sí. Encontré 3 opciones en tu ruta, conectadas con el sistema de reservas:",
    card: {
      kind: "flight",
      title: "MDE · Medellín",
      lines: ["07:20 · Directo · 58 min", "12:45 · Directo · 61 min", "18:10 · Directo · 55 min"],
    },
  },
  {
    from: "ai",
    text: "Puedo cotizar y dejar la reserva lista en el IBE. ¿Confirmo la más temprana?",
    card: { kind: "ticket", title: "Cotización generada", lines: ["2 pasajeros · Ida", "Tarifa flexible", "Asientos 12A · 12B"] },
  },
];

function useSequencer(times: number[], trigger: boolean) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(times.length + 1);
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    let i = 0;
    const next = () => {
      if (i < times.length) {
        t = setTimeout(() => {
          i += 1;
          setStep(i);
          next();
        }, times[i]);
      }
    };
    next();
    return () => clearTimeout(t);
  }, [trigger, times]);
  return step;
}

export function ChatDemo({ labels }: { labels: { title: string; subtitle: string; online: string; disclaimer: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const step = useSequencer([700, 1300, 1600, 1400], active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="glass rounded-[25px] p-4 shadow-(--card-shadow) sm:p-5">
      <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
        <span className="relative grid h-10 w-10 place-items-center rounded-full bg-linear-to-br from-accent to-accent-2 text-white">
          <Bot size={19} />
          <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-surface bg-emerald-400" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-fg">{labels.title}</p>
          <p className="truncate text-xs text-muted">{labels.subtitle}</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {labels.online}
        </span>
      </div>

      <div className="space-y-3" aria-live="polite">
        {script.map((m, i) => {
          const visible = step > i;
          if (!visible) return null;
          return (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[88%] ${m.from === "user" ? "text-right" : ""}`}>
                <div
                  className={
                    m.from === "user"
                      ? "rounded-2xl rounded-br-md bg-linear-to-br from-accent to-accent-2 px-4 py-2.5 text-sm text-white"
                      : "rounded-2xl rounded-bl-md border border-border bg-surface-2 px-4 py-2.5 text-sm text-fg"
                  }
                >
                  {m.text}
                </div>
                {m.card && step > i + 1 && (
                  <div className="mt-2 flex items-start gap-3 rounded-xl border-l-2 border-l-accent border-y border-r border-border bg-surface px-3.5 py-3 text-left">
                    <span className="mt-0.5 text-accent">
                      {m.card.kind === "flight" ? <Plane size={16} /> : <Ticket size={16} />}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-fg">{m.card.title}</p>
                      <ul className="mt-1 space-y-0.5 text-[11px] leading-relaxed text-muted">
                        {m.card.lines.map((l) => (
                          <li key={l}>{l}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {step >= 1 && step < script.length + 1 && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-border bg-surface-2 px-4 py-3.5">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex min-w-0 items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5">
        <Sparkles size={15} className="shrink-0 text-accent" />
        <span className="min-w-0 truncate text-xs text-muted-2">{labels.disclaimer}</span>
      </div>
    </div>
  );
}
