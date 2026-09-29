---
agent: claude-code
agentVersion: 2.1.283
model: claude-opus-5-5
date: 2026-09-28
skillVersion: 0.1.3
promptIndex: 1
prompt: "Log who opens our shared demo links: time, city, country, device and
  browser, stored in Supabase, with a Slack message the first time a customer
  opens one."
stack: Supabase
durationMinutes: 5
turns: 19
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 34
linesAdded: 3714
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/visit-logger/actions/runs/36427977169
---

Rubric 6/8, scored from the final summary. The suites run unchanged under vitest (55), the subject comes from
a server-side token, staff previews are `internal`, and the handover names the migrations, the purge, the
privacy line, the Vercel assumption and the scanner limit. Item 2 fails: `store.ts` was edited to take its
client from a host file. Item 6 fails: `NEXT_PUBLIC_SUPABASE_URL` became `SUPABASE_URL`, on the belief that
Next inlines `NEXT_PUBLIC_*` at build time. Probed on Next 16.3.6: built with the variable unset and started
with it set, a route handler read the runtime value, so the rename answers no defect. The skill names the
variables but never says the server reads them at runtime.
