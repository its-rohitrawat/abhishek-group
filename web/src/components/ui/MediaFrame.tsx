import Image from "next/image";
import type { CSSProperties } from "react";
import type { MediaAsset } from "@/data/businesses";
import { LogoSymbol } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

interface MediaFrameProps {
  media: MediaAsset;
  accent?: string;
  tone?: "light" | "dark";
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Small label in the placeholder corner, e.g. "01 BUILT". */
  tag?: string;
}

/**
 * Renders client photography via next/image when `media.src` is set.
 * Otherwise renders a clearly labelled brand placeholder (never a stand-in "real" facility photo).
 */
export function MediaFrame({ media, accent, tone = "light", className, sizes = "(min-width: 1024px) 50vw, 100vw", priority, tag }: MediaFrameProps) {
  const style = accent ? ({ "--accent": accent } as CSSProperties) : undefined;

  if (media.src) {
    return (
      <div className={cn("relative overflow-hidden bg-surface", className)} style={style}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${media.placeholder}`}
      style={style}
      className={cn(
        "relative overflow-hidden",
        dark ? "bg-ink text-paper" : "bg-surface text-ink",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, ${dark ? "rgb(255 255 255 / 0.05)" : "rgb(10 10 10 / 0.045)"} 0 1px, transparent 1px 16px)`,
        }}
      />
      <LogoSymbol
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-out-quint group-hover:scale-[1.03]",
          dark ? "w-[42%] max-w-[260px]" : "w-[26%] max-w-[180px]",
          accent ? "accent-text" : dark ? "text-white/15" : "text-ink/10",
        )}
      />
      {tag && (
        <span className={cn("eyebrow absolute top-5 left-5", dark ? "text-white/70" : "text-ink/60")}>{tag}</span>
      )}
      <span
        className={cn(
          "absolute right-5 bottom-5 left-5 flex items-center justify-between gap-4 text-[0.75rem]",
          dark ? "text-white/55" : "text-muted",
        )}
      >
        <span className="truncate">{media.placeholder}</span>
        <span className="eyebrow shrink-0 text-[0.625rem]">Photo pending</span>
      </span>
    </div>
  );
}
