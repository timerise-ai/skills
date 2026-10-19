---
agent: claude-code
agentVersion: 2.1.301
model: claude-opus-5-5
date: 2026-10-16
skillVersion: 0.1.4
promptIndex: 1
prompt: "Let hosts in this Next.js app on Supabase connect their Microsoft 365
  or Outlook calendar: the times they are busy in Outlook must stop being
  bookable, and every confirmed booking should show up in their Outlook calendar
  and disappear again when it is cancelled."
stack: Supabase
durationMinutes: 4
turns: 26
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 43
linesAdded: 4845
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/microsoft-calendar-sync/actions/runs/38957291027
---

Rubric 8/8, scored from the final summary. Templates copied unchanged with `setup.ts` the only adapted file;
43 tests in four zones through `scripts/test-calendar.sh`; Supabase access tokens verified server-side;
`.env.example` empty and tracked; the skill's defaults kept and `common` handed over; and the four steps
with their detail, the variables named as those in `.env.example`. Not rerun.
