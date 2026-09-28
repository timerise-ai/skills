---
agent: claude-code
agentVersion: 2.1.283
model: claude-opus-5-5
date: 2026-09-27
skillVersion: 0.3.7
promptIndex: 1
prompt: Hide this whole site behind a PIN until launch. One environment variable
  turns it on, and search engines must not index anything while it is on.
stack: No data store
durationMinutes: 2
turns: 11
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 14
linesAdded: 1965
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/site-pin-gate/actions/runs/36337832836
---

Rubric 8/8. Templates and both suites as shipped (38 tests under vitest), the default matcher, all three
variables in an un-ignored `.env.example`, no PIN written anywhere, and a handover naming both variables
and the open-site risk of a missing `SITE_PIN`. It smoke-tested with a PIN set only in the command.
