---
agent: claude-code
agentVersion: 2.1.284
model: claude-opus-5-5
date: 2026-09-29
skillVersion: 0.1.9
promptIndex: 1
prompt: "Add marketplace payments with Stripe Connect: a buyer pays once for
  items from several sellers, each seller gets their share minus our 10% fee,
  paid out after a 7-day hold."
stack: Stripe
durationMinutes: 13
turns: 44
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 49
linesAdded: 5449
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/stripe-connect-subscriptions/actions/runs/36569138692
---

Rubric 6/8, scored from the JSON summary. The settlement model, the webhook wiring and the handover hold:
transfers run at settlement from the charge, a leased claim makes settlement single-flight, a lost transfer
response is looked up before a re-send, and the summary names the country check, both webhook endpoints and
the cron secret. Item 2 fails: onboarding was rewritten on v1 Express accounts, so it could set a manual payout
schedule, and the region list became a rule derived from a new `STRIPE_PLATFORM_COUNTRY`. The first half is a
real defect. The template never set manual payouts, so Stripe would pay sellers out before the hold released.
The second follows from the template's `// ... the corridor, or your single country` placeholder, which leaves
the list to the agent. Item 6 fails on that invented variable. Item 3 holds on the summary (vitest installed,
24 tests including the skill's); whether `money.test.ts` was copied unmodified is not visible there.
