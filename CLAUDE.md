# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Marketing/catalog site for Agrosalas Peru (canned legumes for export), bilingual ES/EN, deployed at `agrosalasperu.com`. No backend or DB: products are static data; the only server logic is the contact-form email route.

## Commands

```bash
npm run dev      # Start dev server (Turbopack is the Next 16 default) — usually lands on :3002 if :3000 is taken
npm run build    # Production build + type-check
npm run start    # Serve production build
npx eslint src   # Lint — `npm run lint` is BROKEN: Next 16 removed `next lint` (it fails with "no such directory: …/lint")
npm test         # node:test over src/**/*.test.ts — needs Node ≥ 22.18 (native TS type stripping), no extra deps
node --test src/lib/eventUtils.test.ts   # single test file
```

Tests cover only pure modules (today: `src/lib/eventUtils.ts`). Test files import with an explicit `.ts` extension, so they are excluded in `tsconfig.json` — `next build`/`tsc` never type-check them. `npm run build` rewrites `next-env.d.ts`; revert it before committing.

Post-clone: create `.env.local` with `GMAIL_USER`, `GMAIL_APP_PASSWORD` (Gmail app password) and optionally `CONTACT_EMAIL`; without them the contact form returns 500.

## Architecture

Next.js 16 App Router. All routes live under `src/app/`. The project splits concerns into **server components** (pages, layout, metadata) and **client components** (interactive UI, prefixed with `"use client"`).

### Key patterns

**Server / Client split**
- Pages (`page.tsx`) are server components — they own `export const metadata` and render the page shell/header.
- Interactive parts are extracted into a co-located `*Client.tsx` file (e.g. `catalogo/CatalogoClient.tsx`). Any page that wraps a client component using `useSearchParams` must wrap it in `<Suspense>`.

**Styling**
- TailwindCSS 3 with a custom palette: `brand-*` (green) and `earth-*` (yellow/amber) defined in `tailwind.config.ts`.
- Reusable utility classes are defined in `src/app/globals.css` under `@layer components`: `.btn-primary`, `.btn-secondary`, `.btn-outline-white`, `.card`, `.badge`, `.badge-{category}`, `.container-section`, `.section-padding`. Use these instead of repeating Tailwind strings.

**Data**
- Product mock data lives in `src/data/products.ts` and exports `products: Product[]` plus `CATEGORIES`. Types are in `src/types/index.ts`.
- The API route `src/app/api/contact/route.ts` sends email with **Nodemailer over Gmail SMTP** (`GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_EMAIL`). `resend` is still in `package.json` but unused — `ARCHITECTURE.md` still lists it.

**i18n (client-side, no locale routes)**
- `LanguageProvider` (`src/i18n/`) wraps the app in `layout.tsx`; locale (`es` | `en`) lives in React state + `localStorage` key `agrosalas_locale`. URLs, metadata, sitemap and JSON-LD are always Spanish — SSR renders ES, EN appears only after hydration.
- UI strings: `t("key")` from `useLanguage()`, dictionaries in `translations.ts` (missing EN key → falls back to ES → to the key itself). Any component calling `t()` must be a client component, which is why `Navbar`, `Footer`, `WhatsAppButton`, `not-found.tsx` are all `"use client"`.
- Product text: Spanish lives in `products.ts`; English lives in `productsI18n.ts` keyed by **product id**, read via `getProductText(product, locale)`. A key mismatch fails silently (shows Spanish).

**SEO**
- Base URL `https://agrosalasperu.com` is hardcoded separately in `layout.tsx` (`metadataBase`), `sitemap.ts`, `robots.ts`, `catalogo/[id]/page.tsx` and `eventos/[slug]/page.tsx` (`BASE_URL`), plus the canonicals in `catalogo/page.tsx` and `eventos/page.tsx` — change all of them together.
- Root layout has `title.template: "%s | Agrosalas Peru"`, so page titles must NOT append the brand (`catalogo/[id]` still does and shows it twice; `eventos/[slug]` doesn't).
- `catalogo/[id]` is statically generated (`generateStaticParams`) with per-product `generateMetadata`, canonical, Product + Breadcrumb JSON-LD via `components/seo/JsonLd.tsx`. Root layout emits Organization JSON-LD. `opengraph-image.tsx` generates the default OG image.

**Layout**
- `Navbar` is transparent at the top of the page and transitions to white/opaque on scroll (`scrollY > 20`). It is a client component.
- WhatsApp/phone `+51 905 600 449` is hardcoded in many places: `WhatsAppButton.tsx`, `ContactPageClient.tsx`, `ProductDetailClient.tsx` (prefilled per-product message), `CtaSection.tsx`, `Footer.tsx`, and the Organization schema in `layout.tsx`. Always use the international form (`wa.me/51905600449`, `tel:+51905600449`) — without `51` WhatsApp routes to +90 (Turkey). `grep -rn 905600449 src` before changing it.
- Share: `components/ui/ShareButton.tsx` (Web Share API, falls back to copying the URL) is used by both product and event detail pages.

**Events (`/eventos`)**
- List page splits events into "Próximos" / "Participaciones"; detail `/eventos/[slug]` has a stacked layout (21:9 banner → date/place cards + share → text → gallery with `components/ui/Lightbox.tsx` → "Otros eventos").
- Data is in `src/data/events.ts`, but pages/components must read it **only** through `src/lib/events.ts` (`getEvents`, `getEventBySlug`, async). That module is the swap point for a future admin/remote source, and it throws on duplicate slugs (build fails).
- Pure logic lives in `src/lib/eventUtils.ts` (date-range formatting with a fixed month table, `isUpcoming`, `splitEvents`, `pickOtherEvents`, `todayInLima`). Keep it free of runtime imports (type-only) so `node --test` can load it without the `@/` alias.
- "Upcoming" = `(endDate ?? startDate) >= today` in **America/Lima**, computed on the server; both pages use `revalidate = 86400`, so an event moves to "past" within a day without a redeploy. Never compute it in client components (hydration mismatch).
- The list currently ships **empty** (`events = []` → "Pronto publicaremos nuestros eventos"; any slug → 404; sitemap only lists `/eventos`).

### Adding a new page

1. Create `src/app/<route>/page.tsx` with `export const metadata`.
2. Add the route to `NAV_LINKS` in both `Navbar.tsx` and `Footer.tsx` (entries use `labelKey`, so also add `nav.<x>` to both dictionaries in `translations.ts`).
3. Add the URL to `src/app/sitemap.ts`.

### Adding products

1. Add the entry to `src/data/products.ts`; image goes in `public/images/products/<id>.png`.
2. Add the English text to `EN` in `src/i18n/productsI18n.ts` under the **exact same id**.
3. The product page, sitemap entry and JSON-LD are generated from the array automatically.

Categories are typed as `"enlatados" | "conservas" | "congelados"`, but only `conservas` is active: the other two are commented out in `CATEGORIES` and every current product is `conservas`. Adding a new category requires updating `ProductCategory` in `src/types/index.ts`, the `CATEGORIES` array, `category.<x>` keys in `translations.ts`, and the badge CSS classes in `globals.css`.

### Adding events

1. Add the entry to `src/data/events.ts` (a commented example is in the file). Dates are `YYYY-MM-DD` strings; `endDate`/`venue` are optional.
2. Photos go in `public/images/event/<slug>/` — `cover.jpg` (landscape, ≥1600 px wide: it's cropped to 21:9 on desktop) and `01.jpg`, `02.jpg`, … for `gallery`. Empty `cover` falls back to the product placeholder SVG.
3. Add the English text to `EN` in `src/i18n/eventsI18n.ts` under the **same slug** (missing → Spanish is shown).
4. Detail page, sitemap entry and "Otros eventos" are generated automatically. The slug is the public URL — don't rename it once published.

**Gotcha:** the product id is also the public URL slug (`/catalogo/<id>`), so renaming an id breaks already-shared or indexed links unless you add a redirect in `next.config.ts`. Spelling is **"Frijol"** everywhere (ids, names, descriptions, image files) — don't reintroduce "Frejol".

## Conventions

- Base branch `master`; Conventional Commits with scopes (`feat(seo): …`, `fix(share): …`).
- Larger features get a design spec + implementation plan in `docs/superpowers/specs/` and `docs/superpowers/plans/` (dated `YYYY-MM-DD-<slug>.md`) before code.
- `ARCHITECTURE.md` (Spanish) is the long-form architecture/decisions doc; this file is the short operational guide.

<!-- project-memory: rev=0e62d41 date=2026-09-30 -->