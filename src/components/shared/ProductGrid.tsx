import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { href, routes } from "@/lib/utils";

const map: Record<string, { to: string; img: string; bg: string }> = {
  cms: { to: routes.cms, img: "/images/products/cms-demo.png", bg: "/images/products/card-cms-bg.png" },
  ecommerce: {
    to: routes.ecommerce,
    img: "/images/products/ecommerce-demo.png",
    bg: "/images/products/card-ecommerce-bg.png",
  },
  bidmax: { to: routes.bidmax, img: "/images/products/bidmax-demo.png", bg: "/images/products/card-bidmax-bg.png" },
  kivi: { to: routes.kivi, img: "/brand/zorro-dark.jpg", bg: "/images/pages/diagonal-coral.jpg" },
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
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((p) => {
        const meta = map[p.href];
        return (
          <Link
            key={p.href}
            href={href(lang, meta.to)}
            className="card-lift group relative overflow-hidden rounded-[20px] border border-border bg-surface"
          >
            <div className="relative h-44 overflow-hidden bg-surface-2">
              <Image src={meta.bg} alt="" fill className="object-cover opacity-50" />
              <Image
                src={meta.img}
                alt={p.title}
                fill
                className="object-contain p-6 transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-fg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                {dict.common.seeMore} <ArrowUpRight size={16} />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
