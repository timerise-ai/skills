---
agent: claude-code
agentVersion: 2.1.284
model: claude-opus-5-5
date: 2026-09-29
skillVersion: 0.1.7
promptIndex: 1
prompt: Our climbing gym's front desk must keep taking bookings when the
  internet drops. Build a local server that replicates our Firestore data, takes
  over the LAN, and syncs back when the connection returns.
stack: Firestore + RxDB
durationMinutes: 11
turns: 31
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 53
linesAdded: 10255
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/island-mode-server/actions/runs/36570521722
---

Rubric 7/8, scored from the summary. Checks pass. The suite ran unmodified apart from its two imports, 15 of
15. `LOCATION_ID` is required, the wiring and the four hard rules hold, and the handover names all four items
in the *Handover* section. Item 2 fails: `StockService` gained `rebuildDeltas()` and `adjust()`, and
`ammunition` became `rentals`. The skill asks for a boot-time delta rebuild and lists an adjust endpoint, but
the template has neither method, and `ammunition` is not in the rename table. It also flagged a real defect:
the bookings ingestion stores the booking with `_offlineCreated: true`, pull replication brings that flag
back down, and the retry timer resends the booking every minute. The skill's prose for that route never says
to clear the flag.
