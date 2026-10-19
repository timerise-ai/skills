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
durationMinutes: 3
turns: 27
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 38
linesAdded: 3712
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/google-calendar-sync/actions/runs/38950644360
---

Rubric 8/8. Scored from the summary. The module is the skill's with the Supabase store, the build passes with no
variables set and a request without secrets fails naming the variable, the suite runs as shipped (32 in four
zones), `authenticate` is Supabase Auth's verified session, the cron is every 12 hours in `vercel.json`, and
the final message ends with the "Before it works" list, all six items in order.
