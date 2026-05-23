# TerraNode — Agent Notes

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 App Router (`src/app/`) |
| UI | Tailwind v4, shadcn-style components in `src/components/ui/` |
| State | `TerraNodeContext` — fetches projects/transactions/stats from API |
| Data | Prisma + SQLite (`prisma/schema.prisma`, `prisma/dev.db`), seed in `prisma/seed.ts`; static fallbacks in `src/data/` |

## Persistence

- **SQLite only** — `DATABASE_URL="file:./dev.db"` (path relative to `prisma/schema.prisma` → `prisma/dev.db`)
- **No Docker**, **no LocalStorage** for projects/transactions
- Calculator debt stays in React state; purchases POST to `/api/transactions`

## Dev commands

```bash
npm install && cp .env.example .env && npx prisma db push && npm run db:seed && npm run dev
```
