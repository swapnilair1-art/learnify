# Learnify — Phase 1 Scaffold

This repository contains the Phase 1 scaffold for Learnify: a cognitive learning OS.


Quick start (local development)

1. Copy `.env.local.example` to `.env.local` and adjust values if needed.

2. (Optional) Start a local Postgres via Docker Compose (recommended for full feature set):

```bash
docker-compose up -d
```

3. Install dependencies:

```bash
npm install --legacy-peer-deps
```

4. Generate Prisma client:

```bash
npx prisma generate
```

5. If you started the local Postgres, run migrations and seed data:

```bash
npx prisma migrate dev --name init
npm run seed
```

6. Run the dev server:

```bash
npm run dev
```

Notes & local fallbacks

- If you do not configure a database locally, the app will fall back to bundled sample course data so core pages remain viewable.
- The AI integration will return a canned dev response when `OPENAI_API_KEY` is not set.
- Clerk auth is optional for local dev — if `NEXT_PUBLIC_CLERK_FRONTEND_API` is not set, the app will run without Clerk and use a demo user id (set `NEXT_PUBLIC_DEMO_USER_ID` in `.env.local`).

Files of interest

- [docker-compose.yml](docker-compose.yml) — local Postgres service
- [.env.local.example](.env.local.example) — local env template
- [data/sample-courses.json](data/sample-courses.json) — sample course data used as DB fallback
- [prisma/seed.ts](prisma/seed.ts) — seed script (skips when DATABASE_URL is not set)


Files of interest

- [app/layout.tsx](app/layout.tsx) — App shell
- [app/dashboard/page.tsx](app/dashboard/page.tsx) — Dashboard scaffold
- [components/ui/ButtonPrimary.tsx](components/ui/ButtonPrimary.tsx) — UI primitive
- [prisma/schema.prisma](prisma/schema.prisma) — DB schema
