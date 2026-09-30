---
agent: claude-code
agentVersion: 2.1.284
model: claude-opus-5-5
date: 2026-09-29
skillVersion: 0.1.5
promptIndex: 1
prompt: Build a browser extension our back-office staff install with consent. It
  records what they do in the shop admin and carrier portals as DOM events,
  never screenshots, and sends them to our Next.js app on Supabase.
stack: Supabase
durationMinutes: 12
turns: 43
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 71
linesAdded: 7291
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/ecommerce-process-mining/actions/runs/36562840118
---

Rubric 8/8, scored from the final summary. The shared modules are "as shipped", the nine suites report 76
cases, ingest answers 503 without credentials rather than using an in-memory stand-in, the allowlist is
`PM_ALLOWED_EXTENSION_IDS`, and the summary closes with the pinned id, the browser trial and the legal basis.
Its host SQL (an API-key table) sits in a file of its own. The stricter capture it lists is host wiring.
