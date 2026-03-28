# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Turbopack) — usually lands on :3002 if :3000 is taken
npm run build    # Production build + type-check
npm run start    # Serve production build
npm run lint     # ESLint via next lint
```

No test suite is configured yet.

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
- The API route `src/app/api/contact/route.ts` uses **Resend** to send emails. It reads `RESEND_API_KEY`, `CONTACT_EMAIL`, and `FROM_EMAIL` from the environment (`.env.local`).

**Layout**
- `Navbar` is transparent at the top of the page and transitions to white/opaque on scroll (`scrollY > 20`). It is a client component.
- `Footer` and `WhatsAppButton` are server/shared components in `src/components/layout/` and `src/components/ui/`.
- WhatsApp number: `+905600449` — hardcoded in `WhatsAppButton.tsx` and `contact/page.tsx`.

### Adding a new page

1. Create `src/app/<route>/page.tsx` with `export const metadata`.
2. Add the route to `NAV_LINKS` in both `Navbar.tsx` and `Footer.tsx`.

### Adding products

Edit `src/data/products.ts`. Categories are typed as `"enlatados" | "conservas" | "congelados"` — adding a new one requires updating `ProductCategory` in `src/types/index.ts`, the `CATEGORIES` array, and the badge CSS classes in `globals.css`.
