---
agent: gemini-cli
agentVersion: 0.61.0
model: gemini-3.8-flash
date: 2026-09-28
skillVersion: 0.1.2
promptIndex: 1
prompt: "Give customers a wallet on Postgres: top up with Stripe Checkout, pay
  orders from the balance, by card or split between both, and send refunds back
  where the money came from."
stack: Postgres
durationMinutes: 12
turns: null
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 46
linesAdded: 4849
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/ledger-wallet/actions/runs/36439510876
---

Rubric 5/8, scored from the JSON summary. Checks pass and the suite reports the documented 76 and 2. Items 4
and 7 fail: `host.ts` reads tenant, customer and staff role from `x-tenant-id`, `x-customer-id` and
`x-staff-role` request headers with development fallbacks, which lets any caller name the wallet it moves
money in (hard rule 2). The skill says where identity comes from but not what to do in an app with no auth.
Item 8 fails: the handover lists the webhook route but never says to register it in Stripe or to schedule
the cron, and presents the header identity as a finished assumption.
