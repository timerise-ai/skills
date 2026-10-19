---
agent: claude-code
agentVersion: 2.1.300
model: claude-opus-5-5
date: 2026-10-15
skillVersion: 0.1.0
promptIndex: 1
prompt: "Add Calendly-style booking links to this Next.js app on Supabase: hosts
  set their weekly availability and event types, visitors book a free time on a
  public page, both get an e-mail with a calendar invite, and the visitor can
  reschedule or cancel from a link in that e-mail."
stack: Supabase
durationMinutes: 5
turns: 34
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 72
linesAdded: 6974
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/calendar-scheduling-links/actions/runs/38775853464
---

Rubric 7/8, scored from the JSON summary. The handover lists every variable, the migration, the auth redirect,
the cron with `pg_cron` on Hobby and both OAuth setups, and the summary says the templates were copied as
written. Item 3 failed: the run reports 56 passed and 5 skipped, so the Firestore backend was cut from
`test/store-contract.test.ts` ("I removed the skill's Firestore option"). The shipped contract imports
`firebase-admin` and `@/lib/scheduling/firestore-store`, so it cannot type-check in a Supabase app unedited;
the skill forced the edit.
