import { cn } from "@/lib/utils";
import { SYMBOL_PATH, SYMBOL_VIEWBOX } from "./symbol-path";

interface SymbolProps {
  className?: string;
  title?: string;
}

/** The approved strap-A symbol. Colour comes from `currentColor`. */
export function LogoSymbol({ className, title }: SymbolProps) {
  return (
    <svg
      viewBox={SYMBOL_VIEWBOX}
      className={className}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path fillRule="evenodd" d={SYMBOL_PATH} />
    </svg>
  );
}

/**
 * Horizontal lockup: symbol | ABHISHEK / GROUP.
 * The wordmark is typeset until master wordmark artwork is supplied.
 */
export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-3", tone === "light" ? "text-paper" : "text-ink", className)}>
      <LogoSymbol className="h-[30px] w-auto" />
      <span aria-hidden="true" className="h-7 w-[1.5px] bg-current" />
      <span className="flex flex-col items-center leading-none">
        <span className="font-display text-[1.28rem] font-extrabold tracking-[-0.01em]">ABHISHEK</span>
        <span className="mt-[5px] mr-[-0.42em] font-display text-[0.58rem] font-bold tracking-[0.42em]">GROUP</span>
      </span>
    </span>
  );
}
