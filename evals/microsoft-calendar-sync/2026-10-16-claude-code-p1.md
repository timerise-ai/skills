---
agent: claude-code
agentVersion: 2.1.301
model: claude-opus-5-5
date: 2026-10-16
skillVersion: 0.1.0
promptIndex: 1
prompt: "Let hosts in this Next.js app on Supabase connect their Microsoft 365
  or Outlook calendar: the times they are busy in Outlook must stop being
  bookable, and every confirmed booking should show up in their Outlook calendar
  and disappear again when it is cancelled."
stack: Supabase
durationMinutes: 5
turns: 25
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 43
linesAdded: 4941
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/microsoft-calendar-sync/actions/runs/38923905026
---

Rubric 6/8, scored from the final summary. Every check passed and the summary reports the suite's 43 tests
under four zones and the operator steps (Entra registration, the variables, a public HTTPS notification URL,
the 12-hour cron). Two items failed. Wiring: it added `GET` to the cron route because Vercel Cron sends
`GET`, while the skill names Vercel Cron as a scheduler and ships a `POST`-only wiring; and it made the
settings lazy, because the shipped `setup.ts` reads them at import and `next build` has none. Config: it
invented `MICROSOFT_CALENDAR_INVITE_ATTENDEES` and a UTC fallback for `MICROSOFT_CALENDAR_DEFAULT_TIME_ZONE`,
and wrote no `.env.example`; the skill never says to write one. Templates intact and the suite unchanged are
taken from the summary ("the skill's code", 43 tests) and were not rerun.
