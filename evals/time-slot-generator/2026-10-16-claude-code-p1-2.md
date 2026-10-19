---
agent: claude-code
agentVersion: 2.1.301
model: claude-opus-5-5
date: 2026-10-16
skillVersion: 0.1.1
promptIndex: 1
prompt: Our studio books classes and private sessions from weekly opening hours,
  like weekdays 9 to 5 every 30 minutes and the first Saturday of each month.
  Add an API to this Next.js app on Supabase that lists the free times for a
  service and books one, without overbooking when two people take the last spot.
stack: Supabase
durationMinutes: 2
turns: 22
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 21
linesAdded: 3389
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/time-slot-generator/actions/runs/38957335109
---

Rubric 8/8, scored from the final summary. It reports the 23 shipped tests apart from four of its own in
`lib/slots/studio.test.ts`, and hands over the migration, both server-only variables and the guard at
`app/api/bookings/route.ts:31`, the line the template marks. Nothing in the summary suggests a template edit;
the anon refusal it checked on a local Postgres is now the template's own.
