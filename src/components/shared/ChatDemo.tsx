"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Plane, Sparkles, Ticket } from "lucide-react";

type ChatCard = { kind: string; title: string; lines: string[] };
type ChatScriptItem = {
  from: string;
  text: string;
  delay: number;
  cardDelay?: number;
  card?: ChatCard;
};
type ChatLabels = { title: string; subtitle: string; online: string; disclaimer: string };

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

export function ChatDemo({ labels, script }: { labels: ChatLabels; script: ChatScriptItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  /* one step per message, plus one per card: the timeline must stay referentially
     stable or the sequencer effect restarts on every render and never advances. */
  const times = useMemo(() => {
    const t: number[] = [];
    script.forEach((m) => {
      t.push(m.delay);
      if (m.card) t.push(m.cardDelay ?? 900);
    });
    return t;
  }, [script]);

  const step = useSequencer(times, active);

  const { msgs, cards, typing } = useMemo(() => {
    const msgVisible: boolean[] = [];
    const cardVisible: boolean[] = [];
    let consumed = 0;
    let pending: string | null = null;
    for (const item of script) {
      const msgAt = consumed;
      msgVisible.push(step > msgAt);
      if (pending === null && step <= msgAt) pending = item.from;
      consumed += 1;
      if (item.card) {
        const cardAt = consumed;
        cardVisible.push(step > cardAt);
        if (pending === null && step <= cardAt) pending = "ai";
        consumed += 1;
      } else {
        cardVisible.push(false);
      }
    }
    return { msgs: msgVisible, cards: cardVisible, typing: pending === "ai" };
  }, [script, step]);

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

  /* keep the newest bubble in view inside the capped chat area */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || step === 0) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [step]);

  return (
    <div ref={ref} className="glass rounded-[25px] p-4 shadow-(--card-shadow) sm:p-5">
      <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
        <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white ring-1 ring-black/5 dark:ring-white/15">
          <Image src="/brand/kivi-ai-logo.png" alt="" width={32} height={32} className="h-8 w-8" />
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

      <div
        ref={scrollRef}
        className="chat-scroll space-y-3 lg:max-h-[430px] lg:overflow-y-auto lg:pr-1"
        aria-live="polite"
      >
        {script.map((message, i) => {
          if (!msgs[i]) return null;
          const isUser = message.from === "user";
          return (
            <div key={`${message.from}-${i}`} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[88%] ${isUser ? "text-right" : ""}`}>
                <div
                  className={
                    isUser
                      ? "rounded-2xl rounded-br-md bg-linear-to-br from-accent to-accent-2 px-4 py-2.5 text-sm text-white"
                      : "rounded-2xl rounded-bl-md border border-border bg-surface-2 px-4 py-2.5 text-sm text-fg"
                  }
                >
                  {message.text}
                </div>
                {message.card && cards[i] && (
                  <div className="mt-2 flex items-start gap-3 rounded-xl border-l-2 border-l-accent border-y border-r border-border bg-surface px-3.5 py-3 text-left">
                    <span className="mt-0.5 text-accent">
                      {message.card.kind === "flight" ? <Plane size={16} /> : <Ticket size={16} />}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-fg">{message.card.title}</p>
                      <ul className="mt-1 space-y-0.5 text-[11px] leading-relaxed text-muted">
                        {message.card.lines.map((l) => (
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
        {typing && (
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
