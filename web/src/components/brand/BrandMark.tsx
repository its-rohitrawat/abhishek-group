import { cn } from "@/lib/utils";

/** 2×2 grid of the four lifecycle colours. Used as the eyebrow marker across the site. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-grid size-3 shrink-0 grid-cols-2 gap-px", className)}>
      <span className="bg-safety" />
      <span className="bg-identity" />
      <span className="bg-recycling" />
      <span className="bg-comfort" />
    </span>
  );
}
