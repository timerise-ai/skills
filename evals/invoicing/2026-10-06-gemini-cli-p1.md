---
agent: gemini-cli
agentVersion: 0.62.0
model: gemini-3.8-flash
date: 2026-10-06
skillVersion: 0.1.1
promptIndex: 1
prompt: "Add invoicing to this app: staff issue VAT invoices with numbers that
  never skip, can issue a correction when one is wrong, see them all in a list,
  and download each as a PDF."
stack: No data store
durationMinutes: 12
turns: null
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 28
linesAdded: 5508
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/invoicing/actions/runs/37519582665
---

Rubric 5/8, scored from the summary. The skill's 57 tests ran under vitest, the memory store is wired as shipped, and no template edit is mentioned. `getInvoiceActor` defaults to a read-write staff actor, switchable off with an invented `INVOICE_AUTH_DISABLED` (item 4). The seller fields fall back to an invented "Acme sp. z o.o.", so documents can be issued under a seller that does not exist, and three variables are invented (item 6). The handover does not say an unset seller name blocks issuing, because its defaults removed that state (item 8).
