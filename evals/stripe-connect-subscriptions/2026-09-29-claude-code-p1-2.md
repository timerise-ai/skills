---
agent: claude-code
agentVersion: 2.1.284
model: claude-opus-5-5
date: 2026-09-29
skillVersion: 0.1.10
promptIndex: 1
prompt: "Add marketplace payments with Stripe Connect: a buyer pays once for
  items from several sellers, each seller gets their share minus our 10% fee,
  paid out after a 7-day hold."
stack: Stripe
durationMinutes: 11
turns: 36
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 40
linesAdded: 4673
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/stripe-connect-subscriptions/actions/runs/36576825546
---

Rubric 8/8, scored from the JSON summary. `money.test.ts` was copied unchanged and runs its ten tests under
vitest. Transfers run at settlement, the 7-day hold is the escrow window, and accounts are created on manual
payouts. `.env.example` lists the five variables plus `DATABASE_URL`, empty. The final message names the
country check, both webhook endpoints with their event sets and secrets, and the crons behind `CRON_SECRET`.
It left the templates unpatched and named two flaws in the handover. Both reproduce against the template: the
escrow holds were written only beside a newly created seller leg, so a crash before them skipped them on
resume, and a seller not yet onboarded never got them. Fixed in 0.1.11.
