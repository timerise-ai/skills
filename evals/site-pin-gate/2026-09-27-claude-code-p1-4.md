---
agent: claude-code
agentVersion: 2.1.283
model: claude-opus-5-5
date: 2026-09-27
skillVersion: 0.3.4
promptIndex: 1
prompt: Hide this whole site behind a PIN until launch. One environment variable
  turns it on, and search engines must not index anything while it is on.
stack: No data store
durationMinutes: 1
turns: 11
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 14
linesAdded: 1963
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/site-pin-gate/actions/runs/36334483216
---

Rubric 8/8. The templates and both test files were copied unchanged, vitest was installed and runs 36 tests,
the matcher is the default, `.env.example` lists the three variables and is un-ignored, and the handover
says an unset `SITE_PIN` is an open site and that `SITE_GATE_SECRET` belongs beside it. It also sets
`noindex` on unlocked responses, which the skill allows.
