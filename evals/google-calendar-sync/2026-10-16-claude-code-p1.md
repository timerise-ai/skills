---
agent: claude-code
agentVersion: 2.1.301
model: claude-opus-5-5
date: 2026-10-16
skillVersion: 0.2.0
promptIndex: 1
prompt: Our staff should be able to connect their Google Calendar in this
  Next.js app. Events on the calendars they pick must block their availability
  and stay up to date without anyone pressing refresh, and every confirmed
  booking should land in their calendar, with a Google Meet link if they want
  one. We use Supabase.
stack: Supabase
durationMinutes: 4
turns: 28
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 39
linesAdded: 3836
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/google-calendar-sync/actions/runs/38924035905
---

Rubric 6/8. Scored from the summary, with a local rerun of the same version and model to read the diff: every
module file, both test files and `schema.sql` are byte-identical to the templates, the suite runs as written
under four zones (32 each), and `authenticate` verifies the Supabase session with `getUser`. Wiring fails:
`setup.ts` became a lazy getter because the shipped one read every variable at import, which fails
`next build` without secrets, and the cron route answers GET because Vercel Cron calls with GET while the
skill mounted it on POST only. Both are defects in the skill, fixed in 0.2.1. Handover fails on one point:
the message names the cron, the migrations and the consent screen but not that the notification URL must be
public HTTPS, a list the skill never gave.
