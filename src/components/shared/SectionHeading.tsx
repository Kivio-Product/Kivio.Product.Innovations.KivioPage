import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/motion/motion";

export function SectionHeading({
  kicker,
  title,
  lead,
  align = "left",
  className,
  titleClassName,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <FadeUp className={cn(align === "center" && "mx-auto max-w-2xl text-center", className)}>
      {kicker && (
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          <span className="inline-block h-px w-6 bg-accent" aria-hidden />
          {kicker}
        </p>
      )}
      <h2 className={cn("font-display text-3xl leading-[1.12] text-fg sm:text-4xl lg:text-[2.75rem]", titleClassName)}>
        {title}
      </h2>
      {lead && <p className={cn("mt-4 max-w-2xl text-muted", align === "center" && "mx-auto")}>{lead}</p>}
    </FadeUp>
  );
}
