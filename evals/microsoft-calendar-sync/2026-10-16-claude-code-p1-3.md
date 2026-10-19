---
agent: claude-code
agentVersion: 2.1.301
model: claude-opus-5-5
date: 2026-10-16
skillVersion: 0.1.2
promptIndex: 1
prompt: "Let hosts in this Next.js app on Supabase connect their Microsoft 365
  or Outlook calendar: the times they are busy in Outlook must stop being
  bookable, and every confirmed booking should show up in their Outlook calendar
  and disappear again when it is cancelled."
stack: Supabase
durationMinutes: 3
turns: 23
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 41
linesAdded: 4695
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/microsoft-calendar-sync/actions/runs/38951298831
---

Rubric 8/8, scored from the final summary. Templates copied unchanged with `setup.ts` the only adapted file;
43 tests in four zones through `scripts/test-calendar.sh`; Supabase sign-in checked from a bearer token;
`.env.example` un-ignored; personal accounts handed over as `MICROSOFT_CALENDAR_TENANT=common` rather than
changed in code; and the summary ends with the four steps, each with its detail. Not rerun.
