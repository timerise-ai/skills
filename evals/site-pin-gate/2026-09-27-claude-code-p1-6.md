---
agent: claude-code
agentVersion: 2.1.283
model: claude-opus-5-5
date: 2026-09-27
skillVersion: 0.3.6
promptIndex: 1
prompt: Hide this whole site behind a PIN until launch. One environment variable
  turns it on, and search engines must not index anything while it is on.
stack: No data store
durationMinutes: 2
turns: 14
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 13
linesAdded: 1953
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/site-pin-gate/actions/runs/36337078718
---

Rubric 8/8. Templates and tests as shipped (38 tests under vitest), the default matcher, `.env.example`
with the three variables and un-ignored, and a handover naming both variables. It smoke-tested with a
throwaway PIN it wrote to no file.
