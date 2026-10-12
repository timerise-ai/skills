---
agent: claude-code
agentVersion: 2.1.292
model: claude-opus-5-5
date: 2026-10-06
skillVersion: 0.1.1
promptIndex: 1
prompt: "Add invoicing to this app: staff issue VAT invoices with numbers that
  never skip, can issue a correction when one is wrong, see them all in a list,
  and download each as a PDF."
stack: No data store
durationMinutes: 13
turns: 61
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 42
linesAdded: 5206
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/invoicing/actions/runs/37519582665
---

Rubric 4/8, scored from the summary. The skill's three suites ran under vitest as written (57, plus 5 of its own for sign-in); nothing points at a template edit. With no sign-in in the host it built a login page from invented `STAFF_USERS` and `SESSION_SECRET`, where the skill's actor fails closed and is silent on a host without a session (item 4). It added `pg`, a Postgres store behind `DATABASE_URL` and a production refusal of the memory store unless `INVOICE_ALLOW_MEMORY_STORE=1` (item 5). Five invented variables (item 6). The handover does not say an unset `INVOICE_SELLER_NAME` blocks issuing (item 8).
