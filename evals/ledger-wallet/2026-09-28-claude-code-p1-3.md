---
agent: claude-code
agentVersion: 2.1.284
model: claude-opus-5-5
date: 2026-09-28
skillVersion: 0.1.4
promptIndex: 1
prompt: "Give customers a wallet on Postgres: top up with Stripe Checkout, pay
  orders from the balance, by card or split between both, and send refunds back
  where the money came from."
stack: Postgres
durationMinutes: 10
turns: 45
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 76
linesAdded: 6620
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/ledger-wallet/actions/runs/36472280138
---

Rubric 8/8, scored from the JSON summary. Templates used as written with nothing patched, the skill's suite
beside 12 tests of its own (100 with Postgres), card-only orders on a webhook of their own, identity a signed
`HttpOnly` cookie with every route 401 until a sign-in exists, and a handover naming USD as the default, both
endpoints with their four events, the cron with `CRON_SECRET` failing closed, and the identity seam. It kept
the example split callbacks unused because their refund flag drops the card payment's details.
