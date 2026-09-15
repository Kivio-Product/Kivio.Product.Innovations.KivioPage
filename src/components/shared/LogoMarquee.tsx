import Image from "next/image";
import Link from "next/link";
import { clients, href, routes } from "@/lib/utils";

const clientRoutes: Record<string, string> = {
  flyr: routes.flyr,
  bidmax: routes.bidmax,
  merkko: routes.merkko,
  nutrir: routes.nutrir,
};

/* per-logo optical sizing (Nutrir's mark is stacked/vertical, FLYR's is wide) */
const logoSizes: Record<string, string> = {
  flyr: "h-8 w-[150px]",
  bidmax: "h-10 w-[150px]",
  merkko: "h-9 w-[150px]",
  nutrir: "h-16 w-[96px]",
};

/*
 * Marquee seam: the track animates -50%, so ONE unit must be wider than the
 * widest viewport (≈3840px). 5× the 4 clients ≈ 4.2k px per unit → no gaps.
 */
const REPEATS = 5;
const unit = Array.from({ length: REPEATS }).flatMap(() => clients);
const row = [...unit, ...unit];

export function LogoMarquee({ lang, title }: { lang: string; title: string }) {
  return (
    <div className="py-10">
      <p className="mb-8 text-center text-sm font-medium text-muted">{title}</p>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track gap-3 px-2">
          {row.map((c, i) => (
            <Link
              key={`${c.name}-${i}`}
              href={href(lang, clientRoutes[c.href])}
              aria-hidden={i >= clients.length}
              tabIndex={i >= clients.length ? -1 : undefined}
              className="logo-cell group flex h-[88px] w-[200px] shrink-0 items-center justify-center rounded-2xl border border-border bg-surface-2 px-6 transition duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-surface dark:bg-surface dark:hover:bg-surface-2"
            >
              <span className={`relative block ${logoSizes[c.href] ?? "h-10 w-[150px]"}`}>
                {/* grayscale art in light, color in dark — FLYR's color mark is white, so it uses the mono file */}
                <Image
                  src={c.href === "flyr" ? c.dark : c.color}
                  alt={c.name}
                  fill
                  sizes="150px"
                  className="object-contain transition duration-300 group-hover:scale-[1.04]"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
