---
agent: claude-code
agentVersion: 2.1.301
model: claude-opus-5-5
date: 2026-10-16
skillVersion: 0.1.1
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
filesChanged: 40
linesAdded: 4722
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/microsoft-calendar-sync/actions/runs/38948031103
---

Rubric 8/8, scored from the final summary. The templates are copied unchanged with only `setup.ts` adapted
(the Supabase store, a verified Supabase login, Next.js `after`, settings read on first request); `npm test`
runs the 43 shipped tests in four zones through `scripts/test-calendar.sh`; `authenticate` never takes a user
id from the request; `.env.example` holds the eleven variables plus the three Supabase ones; and the summary
ends with the four operator steps, the 12-hour cron and the once-only GUID and key included. Not rerun.
