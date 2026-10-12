---
agent: claude-code
agentVersion: 2.1.292
model: claude-opus-5-5
date: 2026-10-07
skillVersion: 0.1.2
promptIndex: 1
prompt: "Add invoicing to this app: staff issue VAT invoices with numbers that
  never skip, can issue a correction when one is wrong, see them all in a list,
  and download each as a PDF."
stack: No data store
durationMinutes: 4
turns: 22
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 31
linesAdded: 4192
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/invoicing/actions/runs/37651286597
---

Rubric 8/8, scored from the summary. The templates were copied as written and the three suites ran under vitest (57), installed from the registry with `server-only`. `getInvoiceActor` still returns null and the agent says it deliberately added no login or default user; the in-memory store is wired as shipped with no database client added. `.env.example` lists the eight `INVOICE_*` variables, empty and tracked, and the handover names all three facts: 401 until the session is wired, the store forgets on restart, nobody issues until `INVOICE_SELLER_NAME` is set.
