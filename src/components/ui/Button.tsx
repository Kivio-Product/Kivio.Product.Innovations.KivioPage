import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";

const styles: Record<Variant, string> = {
  primary:
    "bg-linear-to-r from-accent to-accent-2 text-white shadow-[0_10px_28px_-8px_rgba(255,87,34,0.45)] hover:brightness-110 hover:-translate-y-0.5",
  secondary:
    "bg-fg text-bg hover:opacity-90",
  ghost:
    "bg-transparent text-fg hover:bg-surface-2",
  outline:
    "border border-border-strong text-fg hover:border-accent hover:text-accent-ink",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  external,
  onClick,
  disabled,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const cls = cn(
    "inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-[15px] font-semibold tracking-tight transition-all duration-300",
    styles[variant],
    disabled && "pointer-events-none opacity-60",
    className,
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
