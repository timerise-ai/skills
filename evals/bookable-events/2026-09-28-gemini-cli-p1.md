---
agent: gemini-cli
agentVersion: 0.61.0
model: gemini-3.8-flash
date: 2026-09-28
skillVersion: 0.1.1
promptIndex: 1
prompt: "Add events to this Next.js app on Postgres: limited capacity, paid
  tickets through Stripe Checkout, staff check-in at the door, and refunds when
  we cancel an event."
stack: Postgres
durationMinutes: 10
turns: null
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 43
linesAdded: 5532
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/bookable-events/actions/runs/36439509539
---

Rubric 2/8 (gemini-3.8-flash, scored from the JSON summary). Checks pass and the three suites report 22, 8 and
17 as shipped. Item 2 fails: the summary lists an `effectsOf.ts` beside `effects.ts`, which is not the shipped
layout. Items 4 and 7 fail: `getCustomer` trusts `x-customer-id` and `x-customer-email` request headers, and
`getStaff` trusts `x-staff-id`, `x-staff-role` and `x-staff-locations` or an `ADMIN_API_KEY` bearer token, so
identity comes from the request, which hard rule 2 forbids. The app had no login, and the skill never says
what to do then. Item 5 fails: the Stripe keys get "safe fallbacks when unconfigured" in place of the seam's
`required()`. Item 6 fails: `ADMIN_API_KEY` is invented. Item 8 fails: the handover leaves out
`EVENTS_MANAGE_TOKEN_SECRET`, the webhook event types and the unsent emails.
