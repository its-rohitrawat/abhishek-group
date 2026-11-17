# Abhishek Group: website draft v0.1

Astro + GSAP (core only). A static site with a minimal black-and-white base and one accent colour per business. Motion runs on page load and on interactions only; nothing is tied to scrolling.

## Run

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serves the built dist/
```

## Structure

| Path | What it is |
|---|---|
| `src/data/site.ts` | All page content: businesses, partners, stats, milestones, locations |
| `src/components/` | One component per homepage section, plus `Logo`, `Symbol` and `Placeholder` |
| `src/scripts/motion.ts` | Page-load timeline (strip, headline, lifecycle dial) |
| `src/scripts/tabs.ts` | Accessible tabs with crossfade (partners, locations) |
| `src/styles/global.css` | Design tokens, type, buttons, utilities |
| `src/assets/brand/abhishek-symbol.svg` | Traced logo symbol (draft) |

## Brand tokens

| Token | Hex | Business |
|---|---|---|
| `--safety` | #E5432D | Safety Systems |
| `--identity` | #1D4ED8 | Registration Plates |
| `--comfort` | #22B8CF | Seat Comfort |
| `--recycling` | #2E9E5B | Vehicle Recycling |

Fonts: Archivo (variable width, used for both display and body), IBM Plex Mono (labels), Montserrat (logo wordmark only).

## Before this goes to the client

- **Logo:** the symbol was traced from the ChatGPT PNG. Replace it with a clean master SVG.
- **Photography:** every hatched block is a labelled placeholder.
- **Content to confirm:**
  - Abhishek's current stake in Joyson Anand Abhishek Safety Systems
  - What Luster Automotive and AWL do
  - The "first seatbelts for Indian carmakers" claim
  - Newer milestones (the latest public news is from 2022)
- **Links:** CTA, news and legal links point to `#` anchors. A real contact or quote form needs a server endpoint, an adapter and server-only environment variables.
