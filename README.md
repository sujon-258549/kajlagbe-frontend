# Kaj Lagbe — Public Frontend

Next.js 16 (App Router) public site for the Kaj Lagbe job-portal platform. Pairs with [`kaj-lagebe-backend`](../kaj-lagebe-backend) for data and [`kajlagbe.admin`](../kajlagbe.admin) for administration.

## Tech Stack

- **Framework** — Next.js 16 (App Router) on React 19
- **Styling** — Tailwind CSS 4 + `tailwind-merge`, Framer Motion (`motion`)
- **UI primitives** — Radix UI, `class-variance-authority`, `lucide-react`, FontAwesome
- **Forms / Validation** — `react-hook-form` + `zod` + `@hookform/resolvers`
- **Tables** — `@tanstack/react-table`
- **Rich-text editor** — TipTap, Jodit
- **Carousels** — Swiper, `react-fast-marquee`
- **Charts** — Recharts
- **Real-time** — `socket.io-client`
- **Notifications** — `react-toastify`
- **Sharing** — `next-share`

## Quick Start

```bash
npm install
cp .env.example .env.local      # set NEXT_PUBLIC_API_BASE_URL etc.
npm run dev                     # http://localhost:4801
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Next dev server on port `4801` |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint via `eslint-config-next` |

### Environment variables

The site is fetched from the backend, so set the API base before running:

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base, e.g. `http://localhost:4500/api` |
| `NEXT_PUBLIC_SOCKET_URL` | Socket.IO server URL, typically the backend host |

(Copy any extra keys from your local `.env` — keep secrets out of `NEXT_PUBLIC_*`.)

## Routes

The App Router pages live in `src/app/`:

| Route | Page |
| --- | --- |
| `/` | Landing page |
| `/about` | About |
| `/why-choose-us` | Why-choose-us |
| `/features` | Features |
| `/services` | Services list |
| `/jobs` | Job listings |
| `/blog` | Blog index + posts |
| `/projects` | Projects showcase |
| `/faq` | FAQ |
| `/contact` | Contact |
| `/subscription` | Subscription plans |
| `/login`, `/register`, `/forgot-password` | Auth flows |
| `/dashboard` | User dashboard (worker / poster) |
| `error.tsx`, `not-found.tsx`, `loading.tsx` | Standard Next.js boundaries |

## Project Structure

```
src/
├── app/                       # App Router routes (see table above)
│   ├── layout.tsx             # Root layout — providers, fonts, toaster
│   ├── globals.css            # Tailwind + global styles
│   └── <route>/page.tsx       # Per-route pages
├── components/                # Feature components grouped by domain
│   ├── home/, about/, blog/, jobs/, services/, …
│   ├── dashboard/             # User-facing dashboard widgets
│   ├── common/                # Header, Footer, shared bits
│   ├── ui/, animate-ui/       # Reusable UI primitives
│   └── modal/, page/, …
├── context/
│   ├── AuthContext.tsx        # Client auth state
│   └── SocketContext.tsx      # Singleton socket.io connection
├── actions/                   # Server actions
├── services/                  # Fetch wrappers / API clients
├── schemas/                   # Zod schemas for forms / payloads
├── lib/                       # Utility helpers
├── data/                      # Static seed / config data
└── types/                     # Shared TS types
```

## Conventions

- **Pages** — colocate page-specific components under `src/components/<route>/`; keep `app/<route>/page.tsx` thin.
- **Forms** — `react-hook-form` + a Zod schema in `src/schemas/`; resolve via `@hookform/resolvers/zod`.
- **API access** — call helpers in `src/services/` rather than `fetch()` from components.
- **Auth** — read from `AuthContext`; protected pages should redirect on missing session.
- **Real-time** — subscribe inside the affected component and clean up in the effect's return.
- **Styling** — Tailwind utility classes; for animation reach for `motion` first, then Framer Motion exports.
- **Sharing** — use `next-share` components rather than building share URLs by hand.

## Page-view analytics

The backend exposes `POST /api/analytics/track` for page-view ingestion. The admin panel already wires this up; the public site can opt in by posting `{ sessionId, path, title, referrer, durationMs, source: "site" }` from a client-side route-change effect — useful once GA is replaced with the in-house analytics module.

## Deployment

Standard Next.js — the easiest target is Vercel. Make sure `NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_SOCKET_URL` point at the public backend before building.
