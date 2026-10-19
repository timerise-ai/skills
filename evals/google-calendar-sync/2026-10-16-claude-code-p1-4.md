---
agent: claude-code
agentVersion: 2.1.301
model: claude-opus-5-5
date: 2026-10-16
skillVersion: 0.2.2
promptIndex: 1
prompt: Our staff should be able to connect their Google Calendar in this
  Next.js app. Events on the calendars they pick must block their availability
  and stay up to date without anyone pressing refresh, and every confirmed
  booking should land in their calendar, with a Google Meet link if they want
  one. We use Supabase.
stack: Supabase
durationMinutes: 5
turns: 31
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 31
linesAdded: 3674
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/google-calendar-sync/actions/runs/38953298875
---

Rubric 8/8. Scored from the summary. `setup.ts` builds on first use and the build passes with no variables set;
the host seams sit in `calendar-sync/host.ts` beside it, with `listUpcomingBookingsForHost` and
`saveMeetingUrl` left as named placeholders rather than an invented bookings table. `authenticate` checks the
Supabase session or Bearer token with Supabase, the suite runs as shipped (32 in four zones), the cron is
12-hourly in `vercel.json`, and the final message ends with all six handover items, the placeholders among them.
