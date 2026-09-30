---
agent: claude-code
agentVersion: 2.1.284
model: claude-opus-5-5
date: 2026-09-29
skillVersion: 0.1.9
promptIndex: 1
prompt: Our climbing gym's front desk must keep taking bookings when the
  internet drops. Build a local server that replicates our Firestore data, takes
  over the LAN, and syncs back when the connection returns.
stack: Firestore + RxDB
durationMinutes: 9
turns: 32
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 55
linesAdded: 10790
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/island-mode-server/actions/runs/36580497295
---

Rubric 7/8, scored from the summary. This is the re-run of the job that failed with an API 503. Checks pass,
and the suite ran unmodified, 17 of 17. Tenant scope, wiring, the env files, the four hard rules and the
four handover items hold. The JSONL journal is the documented storage option, and `rentals` is the rename
table's add-ons row. Item 2 fails on one template change, which points at a real defect: it pinned
`firebase` to 11.6.0, because rxdb 16.11 depends on exactly that version and the skill's `11.10.0` installs
a second copy. A probe confirmed that the plugin's copy then throws on the host's Firestore instance in
`writeBatch`, `doc` and `waitForPendingWrites` ("Did you pass a reference from a different Firestore
SDK?"), so every push fails.
