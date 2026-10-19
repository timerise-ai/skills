---
agent: claude-code
agentVersion: 2.1.301
model: claude-opus-5-5
date: 2026-10-16
skillVersion: 0.2.1
promptIndex: 1
prompt: Our staff should be able to connect their Google Calendar in this
  Next.js app. Events on the calendars they pick must block their availability
  and stay up to date without anyone pressing refresh, and every confirmed
  booking should land in their calendar, with a Google Meet link if they want
  one. We use Supabase.
stack: Supabase
durationMinutes: 3
turns: 24
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 39
linesAdded: 3750
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/google-calendar-sync/actions/runs/38948038976
---

Rubric 8/8. Scored from the summary. The module is copied with the Supabase store, `npm run build` passes with
an empty environment, the suite runs as shipped (32 in each of four zones), `authenticate` is Supabase's
verified session, and the cron is in `vercel.json` every 12 hours. The handover names all six points: the
migration, the eight variables, the consent screen, the 12-hour cron with `CRON_SECRET`, public HTTPS for
notifications, and the booking and slot-engine hooks left to wire. `BUSINESS_TIME_ZONE` is the host's own
fallback for bookings without a zone, not a replacement for any of the eight.
