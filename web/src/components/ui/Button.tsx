import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "outline-light";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper border-ink hover:bg-[#262626] hover:border-[#262626]",
  secondary: "bg-transparent text-ink border-ink/25 hover:border-ink hover:bg-ink hover:text-paper",
  light: "bg-paper text-ink border-paper hover:bg-surface hover:border-surface",
  "outline-light": "bg-transparent text-paper border-white/30 hover:border-paper hover:bg-paper hover:text-ink",
};

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Small accent marker before the label (e.g. green for Scrap a Vehicle). */
  accent?: string;
  className?: string;
  arrow?: boolean;
}

export function Button({ href, children, variant = "primary", accent, className, arrow = true }: ButtonProps) {
  return (
    <Link
      href={href}
      style={accent ? ({ "--accent": accent } as CSSProperties) : undefined}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-3 rounded-[2px] border px-6 text-[0.9375rem] font-semibold tracking-[-0.005em]",
        "transition-[background-color,border-color,color,transform] duration-200 ease-out-quint active:scale-[0.97]",
        variants[variant],
        className,
      )}
    >
      {accent && <span aria-hidden="true" className="accent-bg size-2 shrink-0 rounded-full" />}
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform duration-200 ease-out-quint group-hover:translate-x-1"
          strokeWidth={1.75}
        />
      )}
    </Link>
  );
}
