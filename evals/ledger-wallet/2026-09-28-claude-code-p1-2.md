---
agent: claude-code
agentVersion: 2.1.284
model: claude-opus-5-5
date: 2026-09-28
skillVersion: 0.1.3
promptIndex: 1
prompt: "Give customers a wallet on Postgres: top up with Stripe Checkout, pay
  orders from the balance, by card or split between both, and send refunds back
  where the money came from."
stack: Postgres
durationMinutes: 10
turns: 42
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 72
linesAdded: 6634
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/ledger-wallet/actions/runs/36466678743
---

Rubric 8/8, scored from the JSON summary. Templates copied as written, the skill's suite at its documented
Postgres-only count (88 with a database) beside 14 tests of its own, identity a signed cookie with no header
fallback, card-only orders on a webhook route of their own, and a handover naming the currency default, both
endpoints with their four events, the cron and `CRON_SECRET`, and the missing sign-in route. It wrote its own
split callbacks instead of the example, reporting that the example's `release(orderId)` cannot tell a
redelivered event from a new one; with 0.1.3's "add 1 in `onSplitFailed`", a redelivered `expired` event
skips an attempt. That is a real gap in the example, fixed in the next release.
