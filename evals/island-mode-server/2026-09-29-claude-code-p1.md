---
agent: claude-code
agentVersion: 2.1.284
model: claude-opus-5-5
date: 2026-09-29
skillVersion: 0.1.6
promptIndex: 1
prompt: Our climbing gym's front desk must keep taking bookings when the
  internet drops. Build a local server that replicates our Firestore data, takes
  over the LAN, and syncs back when the connection returns.
stack: Firestore + RxDB
durationMinutes: 15
turns: 55
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 53
linesAdded: 11601
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/island-mode-server/actions/runs/36559078865
---

Rubric 5/8, scored from the summary. Checks pass, the tenant scope uses the per-site uid the rules section
names as the upgrade path, the fetch wrapper and offline boot hold, and every hard rule holds. Item 2 fails:
it patched four templates. Three patches point at real defects in 0.1.6. The stock ingestion route keyed
idempotency on the `inventory_transactions` document, which push replication writes first, so the increment
was skipped (reproduced). The push-only rules granted write without read, while the RxDB push handler reads
before it writes (confirmed in the rxdb 16.11 source). The availability template invented 10:00 to 20:00 when
config was missing, against hard rule 4. The fourth patch made the cron fail closed. Item 3 fails: it added a
non-null assertion to the suite, because line 98 does not type-check under `--noUncheckedIndexedAccess`
(reproduced). Item 8 fails: the handover names the storage choice and the `replicationStamp()` audit, but not
that `SYNC_SECRET` and the other mirrored secrets must hold the same value on both sides. The skill has no
handover clause. It also invented `CORS_ORIGINS`, for a CORS requirement the skill never states.
