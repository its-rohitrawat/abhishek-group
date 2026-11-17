# Abhishek Group: corporate website (Phase 1)

A corporate brochure site for Abhishek Group, built on the story **"For every stage of the vehicle."**
The visual language follows the leocussen.edu.au reference: a cream canvas, a floating header, a rotating hero, rounded cards and a quote carousel. The footer pairs a gradient call-to-action panel with an offices layout, after epinternational.com. Branding, copy and code are original.

**Stack:** Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, GSAP with ScrollTrigger and `@gsap/react`, Hugeicons (free, MIT; wrapped in `src/components/ui/icons.tsx`), and Manrope + Inter via `next/font`.

## Setup

```bash
npm install
cp .env.example .env.local   # optional: only needed for contact-form email delivery
npm run dev                  # http://localhost:3000
```

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build (type-checks and prerenders every route) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Deployment (Vercel)

1. Import the repository in Vercel and set the **Root Directory** to `web`.
2. Leave the framework preset on Next.js. No build settings need to change.
3. Optional: add `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` as environment variables to enable the contact form. These are server-only and are never sent to the browser.
4. If the production domain changes, update `company.siteUrl` in `src/data/company.ts`. It drives canonical URLs, the sitemap and structured data.

## Where content lives

All copy and facts are in `src/data`, so pages update without touching components.

| File | Contents |
|---|---|
| `company.ts` | Name, tagline, founding year, headquarters, contact details, approved statistics, pending-content checklist |
| `businesses.ts` | The four divisions: stage, accent colour, copy, products, images, and each hero slide's colour wash and text tone |
| `media.ts` | Image registry: path, alt text and licence credit for every photo |
| `groupCompanies.ts` | The 8 group companies, with descriptions and logos as published on the client's current site |
| `customers.ts` | Customer names read from the client's published customer collage. Entries marked `confirm` were identified from logo marks |
| `news.ts` | Press coverage from the client's current homepage news section; links open the original articles |
| `quotes.ts` | Verbatim leadership statements (May 2022 launch announcement) used in the quote carousel |
| `partnerships.ts` | Joint-venture countries. Partner names, logos and focus are `null` until confirmed |
| `locations.ts` | 21 sites (city and state, as published on the current site). Street addresses are `null` until supplied |
| `navigation.ts` | Header and footer links, enquiry categories |

### Replacing placeholders

- **Photography:** the site currently uses 14 openly licensed photos (CC0, public domain, CC BY, and one CC BY-SA) from Wikimedia Commons and Flickr, found through Openverse. They are **representative images, not Abhishek facilities**, and are credited on `/image-credits`. To swap in client photography, drop files into `public/images/` and update the entry in `src/data/media.ts`. Set `credit: null` for the client's own photos, and the credits page drops them automatically. Any `MediaAsset` with `src: null` still renders a labelled placeholder.
- **Quotes:** `quotes.ts` holds leadership statements, not customer testimonials. Add genuine, approved client testimonials there if the client supplies them.
- **Logo:** `src/components/brand/symbol-path.ts` holds a vector trace of the approved symbol PNG. Replace `SYMBOL_PATH`/`SYMBOL_VIEWBOX` with the master SVG's path when supplied, and update `public/logo/abhishek-symbol.svg` and `src/app/icon.svg`. The wordmark is typeset in Manrope until wordmark artwork is supplied.
- **Contact details:** set `company.contact.email` / `phone`. They appear in the footer, the contact page and the form fallback automatically.
- **Partners:** fill `partnerName`, `logo` (path under `public/`) and `focus` in `partnerships.ts` once the client approves them.
- **Vacancies:** fill `openPositions` in `src/app/careers/page.tsx`.
- **Legal pages:** publish the pages, then set `company.legal.privacyPolicyHref` / `termsHref`. Footer links appear only when these are set.

## Design system

- Tokens are in `src/app/globals.css` (`:root` + `@theme`): black, white, off-white, surface, muted, line, plus one accent per division (Safety `#E5432D`, Identity `#1D4ED8`, Comfort `#22B8CF`, Recycling `#2E9E5B`).
- Accents are applied by setting `--accent` inline (`accentStyle(hex)`) and using `.accent-bg` / `.accent-text`, so black and white stay dominant.

## Animation

All GSAP code is in client components and scoped to refs via `useGSAP`. Everything respects `prefers-reduced-motion`.

| Component | Behaviour |
|---|---|
| `IntroReveal` | Page-hero intro (~1s). Elements are hidden before paint only while `html.js-motion` is set, with a 2.5s failsafe |
| `Reveal` | One-time scroll reveal of `[data-reveal]` children at 85% viewport |
| `LifecycleProgress` | Desktop lifecycle rail fill and active stage marker. No pinning or scroll-jacking |
| `CountUp` | One-time count-up for statistics below the fold |

## Contact form security

`POST /api/contact` validates every field on the server and checks that the request comes from the site's own origin. It also enforces a size limit, applies a per-instance rate limit and uses a honeypot field. It returns `503 not_configured` until the Resend variables are set, and the UI never reports success unless delivery is confirmed. For multi-instance production, replace the in-memory rate limiter with a shared store, and consider adding Cloudflare Turnstile.

## Pending client content

See `pendingContent` in `src/data/company.ts`. Nothing pending is shown on the site as if it were verified.
