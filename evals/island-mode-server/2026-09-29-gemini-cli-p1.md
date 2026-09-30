---
agent: gemini-cli
agentVersion: 0.61.0
model: gemini-3.8-flash
date: 2026-09-29
skillVersion: 0.1.6
promptIndex: 1
prompt: Our climbing gym's front desk must keep taking bookings when the
  internet drops. Build a local server that replicates our Firestore data, takes
  over the LAN, and syncs back when the connection returns.
stack: Firestore + RxDB
durationMinutes: 7
turns: null
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 41
linesAdded: 9386
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/island-mode-server/actions/runs/36559078865
---

Rubric 6/8, scored from the summary. Checks pass, the suite ran as shipped (12 tests), tiers and filters
match, the wiring and the four hard rules hold, and the summary claims the templates were copied, with
nothing to contradict it. Item 4 fails: `LOCATION_ID` falls back to `loc1` when unset, so a misconfigured box
replicates and serves another site's data. The skill never says the variable is required. Item 8 fails: the
summary presents `replicationStamp()` as done ("ensures cloud writes stamp") instead of telling the operator
that every existing cloud write path must merge it. The skill has no handover clause saying so.
