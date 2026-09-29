---
agent: claude-code
agentVersion: 2.1.283
model: claude-opus-5-5
date: 2026-09-28
skillVersion: 0.1.2
promptIndex: 1
prompt: "Add events to this Next.js app on Postgres: limited capacity, paid
  tickets through Stripe Checkout, staff check-in at the door, and refunds when
  we cancel an event."
stack: Postgres
durationMinutes: 4
turns: 29
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 54
linesAdded: 5307
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/bookable-events/actions/runs/36445935473
---

Rubric 8/8 (claude-opus-5-5, scored from the JSON summary). The templates are copied unchanged except
`host.ts`, the 50 tests run under vitest as shipped, and `getCustomer` and `getStaff` return `null` because
the app has no login. `.env.example` lists the five variables and the host's `DATABASE_URL`. The handover
names the five variables, the webhook and its eight event types, the 5-minute tick, the logged emails and the
closed staff routes. Leaving out the Supabase read policy on plain Postgres is the documented variant. To
reach the status page after Checkout it stores the manage link in the browser, because the success URL carried
no token; 0.1.3 adds the token.
