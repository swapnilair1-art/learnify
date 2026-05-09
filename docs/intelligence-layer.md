# Intelligence Layer — Phase 2 Notes

This document describes the high-level design and initial scaffold for Learnify's Intelligence Layer.

Goals

- Adaptive Daily Mission System
- Learning Momentum System
- Smart Weakness Detection
- AI Context Memory

Phase 2 will introduce server-side services and scheduled background jobs to compute momentum, schedule revisions, and maintain context memory. API routes are provided for core interactions; UI integration will follow.

Files added:

- `prisma/schema.prisma` — models: `AIContext`, `DailyMission`, `StudySession`, `Weakness`, `RevisionSchedule`
- `lib/openai.ts` — lightweight OpenAI helper
- `services/intelligence.ts` — core service functions
- `app/api/intelligence/*` — API routes for daily missions and context

Next steps

1. Wire Clerk-authenticated endpoints and ensure `userId` mapping.
2. Add scheduled jobs (cron) to compute Momentum and push Daily Missions each morning.
3. Integrate with Dashboard UI and create editor/override controls for Admins.
4. Expand AI prompts and safety/guardrails.
