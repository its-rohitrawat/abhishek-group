import Image from "next/image";
import { partnerships } from "@/data/partnerships";

/** Rounded country cards. Partner names/logos render only once confirmed in data. */
export function CountryPanels() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {partnerships.map((p) => (
        <li
          key={p.code}
          data-reveal
          className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[28px] bg-paper p-8 transition-transform duration-500 ease-out-quint hover:-translate-y-1.5 md:p-10"
        >
          <div className="flex items-center justify-between">
            <span className="eyebrow text-[0.6875rem] text-muted">Joint venture · {p.region}</span>
            <span aria-hidden="true" className="h-px w-10 bg-ink transition-[width] duration-500 ease-out-quint group-hover:w-20" />
          </div>
          <span
            aria-hidden="true"
            className="font-display text-[clamp(5rem,9vw,8rem)] leading-none font-medium tracking-[-0.04em] text-transparent"
            style={{ WebkitTextStroke: "1.5px #0a0a0a" }}
          >
            {p.code}
          </span>
          <div>
            <h3 className="font-display text-[1.75rem] leading-tight font-medium tracking-[-0.02em]">{p.country}</h3>
            <p className="mt-1 text-muted">
              {p.partnerName ? `${p.partnerName}${p.focus ? ` · ${p.focus}` : ""}` : "International joint-venture relationship"}
            </p>
            {p.logo && <Image src={p.logo} alt={`${p.partnerName ?? p.country} logo`} width={120} height={40} className="mt-4 h-8 w-auto" />}
          </div>
        </li>
      ))}
    </ul>
  );
}
