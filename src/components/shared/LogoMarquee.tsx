import Image from "next/image";
import Link from "next/link";
import { clients, href, routes } from "@/lib/utils";

const clientRoutes: Record<string, string> = {
  flyr: routes.flyr,
  bidmax: routes.bidmax,
  merkko: routes.merkko,
  nutrir: routes.nutrir,
};

export function LogoMarquee({ lang, title }: { lang: string; title: string }) {
  const row = [...clients, ...clients];
  return (
    <div className="py-10">
      <p className="mb-8 text-center text-sm font-medium text-muted">{title}</p>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track gap-3 px-2">
          {row.map((c, i) => (
            <Link
              key={`${c.name}-${i}`}
              href={href(lang, clientRoutes[c.href])}
              className="logo-cell flex h-[88px] w-[200px] shrink-0 items-center justify-center rounded-2xl border border-border bg-surface px-6"
            >
              <Image src={c.color} alt={c.name} width={140} height={48} className="h-10 w-auto object-contain" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
