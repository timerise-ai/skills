---
agent: claude-code
agentVersion: 2.1.284
model: claude-opus-5-5
date: 2026-09-29
skillVersion: 0.1.10
promptIndex: 1
prompt: Our climbing gym's front desk must keep taking bookings when the
  internet drops. Build a local server that replicates our Firestore data, takes
  over the LAN, and syncs back when the connection returns.
stack: Firestore + RxDB
durationMinutes: 9
turns: 30
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 56
linesAdded: 10326
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/island-mode-server/actions/runs/36590541917
---

Rubric 8/8, scored from the summary. Checks pass. The suite ran as shipped, 17 tests beside one of its own
(18). The templates were kept as written: the offline journal is a new file beside them, and the summary
says the status cron was left unchanged on purpose. Tenant scope, wiring, env, the four hard rules and all
four handover items hold. It noted one inconsistency, not scored: the status cron updates the `locations`
document without `replicationStamp()`, although `locations` is replicated and every cloud write to a
replicated collection should stamp.
