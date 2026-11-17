import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface NumberedListProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  items: { title: string; body: string }[];
  tone?: "light" | "offwhite";
  columns?: 2 | 4;
}

/** Editorial numbered list used for philosophy, principles and process steps. */
export function NumberedList({ id, eyebrow, title, intro, items, tone = "light", columns = 2 }: NumberedListProps) {
  return (
    <section aria-labelledby={id} className={cn("section-y", tone === "offwhite" && "bg-offwhite")}>
      <Reveal className="container-x">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} intro={intro} className="mb-12 lg:mb-16" />
        <ol
          className={cn(
            "grid border-t border-ink",
            columns === 4 ? "sm:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2",
          )}
        >
          {items.map((item, i) => (
            <li
              key={item.title}
              data-reveal
              className={cn(
                "flex flex-col gap-4 border-b border-line py-8",
                columns === 4 ? "sm:pr-8 xl:[&:not(:first-child)]:border-l xl:[&:not(:first-child)]:pl-8" : "md:odd:pr-10 md:even:border-l md:even:pl-10",
              )}
            >
              <span className="eyebrow text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display text-[clamp(1.375rem,2vw,1.75rem)] leading-tight">{item.title}</h3>
              <p className="max-w-[46ch] leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
