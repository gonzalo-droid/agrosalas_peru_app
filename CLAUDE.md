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
```

No test suite is configured yet.

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
- Base URL `https://agrosalasperu.com` is hardcoded separately in `layout.tsx` (`metadataBase`), `sitemap.ts`, `robots.ts` and `catalogo/[id]/page.tsx` (`BASE_URL`) — change all of them together.
- `catalogo/[id]` is statically generated (`generateStaticParams`) with per-product `generateMetadata`, canonical, Product + Breadcrumb JSON-LD via `components/seo/JsonLd.tsx`. Root layout emits Organization JSON-LD. `opengraph-image.tsx` generates the default OG image.

**Layout**
- `Navbar` is transparent at the top of the page and transitions to white/opaque on scroll (`scrollY > 20`). It is a client component.
- WhatsApp/phone `+51 905 600 449` is hardcoded in many places: `WhatsAppButton.tsx`, `ContactPageClient.tsx`, `ProductDetailClient.tsx` (prefilled per-product message + Web Share button), `CtaSection.tsx`, `Footer.tsx`, and the Organization schema in `layout.tsx`. Always use the international form (`wa.me/51905600449`, `tel:+51905600449`) — without `51` WhatsApp routes to +90 (Turkey). `grep -rn 905600449 src` before changing it.

### Adding a new page

1. Create `src/app/<route>/page.tsx` with `export const metadata`.
2. Add the route to `NAV_LINKS` in both `Navbar.tsx` and `Footer.tsx` (entries use `labelKey`, so also add `nav.<x>` to both dictionaries in `translations.ts`).
3. Add the URL to `src/app/sitemap.ts`.

### Adding products

1. Add the entry to `src/data/products.ts`; image goes in `public/images/products/<id>.png`.
2. Add the English text to `EN` in `src/i18n/productsI18n.ts` under the **exact same id**.
3. The product page, sitemap entry and JSON-LD are generated from the array automatically.

Categories are typed as `"enlatados" | "conservas" | "congelados"`, but only `conservas` is active: the other two are commented out in `CATEGORIES` and every current product is `conservas`. Adding a new category requires updating `ProductCategory` in `src/types/index.ts`, the `CATEGORIES` array, `category.<x>` keys in `translations.ts`, and the badge CSS classes in `globals.css`.

**Gotcha:** the product id is also the public URL slug (`/catalogo/<id>`), so renaming an id breaks already-shared or indexed links unless you add a redirect in `next.config.ts`. Spelling is **"Frijol"** everywhere (ids, names, descriptions, image files) — don't reintroduce "Frejol".

## Conventions

- Base branch `master`; Conventional Commits with scopes (`feat(seo): …`, `fix(share): …`).
- Larger features get a design spec + implementation plan in `docs/superpowers/specs/` and `docs/superpowers/plans/` (dated `YYYY-MM-DD-<slug>.md`) before code.
- `ARCHITECTURE.md` (Spanish) is the long-form architecture/decisions doc; this file is the short operational guide.

<!-- project-memory: rev=ddb7f78 date=2026-09-29 -->