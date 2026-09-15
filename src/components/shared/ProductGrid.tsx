import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { href, routes } from "@/lib/utils";
import { SpotlightCard, Stagger } from "@/components/motion/motion";

const map: Record<string, { to: string; img: string; bg: string }> = {
  cms: { to: routes.cms, img: "/images/products/cms-demo.png", bg: "/images/products/card-cms-bg.png" },
  ecommerce: {
    to: routes.ecommerce,
    img: "/images/products/ecommerce-demo.png",
    bg: "/images/products/card-ecommerce-bg.png",
  },
  bidmax: { to: routes.bidmax, img: "/images/products/bidmax-demo.png", bg: "/images/products/card-bidmax-bg.png" },
  kivi: { to: routes.kivi, img: "/brand/kivi-ai-logo.png", bg: "/images/pages/diagonal-coral.jpg" },
};

export function ProductGrid({
  lang,
  dict,
  exclude,
}: {
  lang: string;
  dict: Dictionary;
  exclude?: string;
}) {
  const items = dict.home.products.filter((p) => p.href !== exclude);
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((p) => {
        const meta = map[p.href];
        return (
          <SpotlightCard key={p.href} className="card-lift h-full rounded-[20px] border border-border bg-surface">
            <Link href={href(lang, meta.to)} className="group flex h-full flex-col">
              <div className="relative h-44 overflow-hidden rounded-t-[20px] bg-surface-2">
                <Image src={meta.bg} alt="" fill className="object-cover opacity-50 transition duration-700 group-hover:scale-105" />
                <Image
                  src={meta.img}
                  alt={p.title}
                  fill
                  className="object-contain p-6 transition duration-500 group-hover:scale-[1.06] group-hover:-rotate-1"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  {dict.common.seeMore}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </Link>
          </SpotlightCard>
        );
      })}
    </Stagger>
  );
}
