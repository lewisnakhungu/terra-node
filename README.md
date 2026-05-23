# TerraNode MVP

Hackathon prototype: tokenizing land restoration to offset AI compute footprint. Simulated payments only.

## Quick Start

No Docker or external database server required — persistence uses a local SQLite file via Prisma.

```bash
npm install
cp .env.example .env
npx prisma db push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The SQLite database file is created at `prisma/dev.db` (gitignored). Re-run `npm run db:seed` to reset demo data.

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing page with stats & featured projects |
| `/calculator` | AI compute debt calculator |
| `/corporate` | Corporate credit purchase flow |
| `/projects` | Public project dashboard |
| `/projects/[id]` | Project detail + M-Pesa micro-funding |

## API

- `GET /api/projects` — list projects
- `GET /api/projects/[id]` — project detail
- `POST /api/transactions` — create transaction (updates funding)
- `GET /api/transactions` — list transactions
- `GET /api/stats` — aggregate stats for landing ticker

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run db:push      # Apply Prisma schema to SQLite
npm run db:seed      # Seed 8 Kenya restoration projects
```

## Stack

Next.js 15 · TypeScript · Tailwind CSS v4 · shadcn/ui · Prisma · SQLite · Framer Motion · Recharts

## Disclaimer

Hackathon demo — no real payments or fund movement.
