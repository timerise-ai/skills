---
agent: claude-code
agentVersion: 2.1.283
model: claude-opus-5-5
date: 2026-09-28
skillVersion: 0.1.2
promptIndex: 1
prompt: "Give customers a wallet on Postgres: top up with Stripe Checkout, pay
  orders from the balance, by card or split between both, and send refunds back
  where the money came from."
stack: Postgres
durationMinutes: 10
turns: 58
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 63
linesAdded: 6217
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/ledger-wallet/actions/runs/36439510876
---

Rubric 6/8, scored from the JSON summary. Checks pass, the auth stand-in is a signed session behind `host.ts`,
and the handover names the currency default, the webhook endpoint, the cron and the identity stand-in. Item 2
fails: it changed `lib/wallet/split.ts` to take a hold ref per attempt and renamed `vitest.config.ts` to
`.mts`. The split edit exposed a real defect: a split retried after its Checkout expired replays the released
hold, so the new Checkout runs with nothing reserved and a paid card can end in `wallet_short`. Item 3 fails:
it dropped the Firestore store, which means cutting the Firestore blocks out of the shipped store and order
tests (78 pass and 12 skipped against the documented 76 and 2). The skill says to pick one store but ships
test files that import both.
