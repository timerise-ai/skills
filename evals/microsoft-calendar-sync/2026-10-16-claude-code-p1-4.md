---
agent: claude-code
agentVersion: 2.1.301
model: claude-opus-5-5
date: 2026-10-16
skillVersion: 0.1.3
promptIndex: 1
prompt: "Let hosts in this Next.js app on Supabase connect their Microsoft 365
  or Outlook calendar: the times they are busy in Outlook must stop being
  bookable, and every confirmed booking should show up in their Outlook calendar
  and disappear again when it is cancelled."
stack: Supabase
durationMinutes: 4
turns: 24
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 43
linesAdded: 4858
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/microsoft-calendar-sync/actions/runs/38954461329
---

Rubric 8/8, scored from the final summary. Templates unchanged with only `setup.ts` adapted; 43 tests in
four zones through `scripts/test-calendar.sh`; a verified Supabase bearer token in `auth.ts`; `.env.example`
with the eleven variables and the Supabase ones, un-ignored; and the four steps with their detail, personal
accounts as `MICROSOFT_CALENDAR_TENANT=common`. Not rerun.
