---
agent: claude-code
agentVersion: 2.1.283
model: claude-opus-5-5
date: 2026-09-27
skillVersion: 0.3.5
promptIndex: 1
prompt: Hide this whole site behind a PIN until launch. One environment variable
  turns it on, and search engines must not index anything while it is on.
stack: No data store
durationMinutes: 1
turns: 12
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 13
linesAdded: 1946
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/site-pin-gate/actions/runs/36336014895
---

Rubric 8/8. Templates and tests as shipped, vitest installed and running 36 tests, the default matcher,
`.env.example` un-ignored, and a handover that says an unset `SITE_PIN` is public and that
`SITE_GATE_SECRET` belongs wherever `SITE_PIN` is set.
