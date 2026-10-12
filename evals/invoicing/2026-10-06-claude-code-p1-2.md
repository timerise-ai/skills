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
durationMinutes: 5
turns: 42
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 34
linesAdded: 5523
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/invoicing/actions/runs/37519582842
---

Rubric 4/8, scored from the summary. The three suites ran under vitest as written (57), and nothing points at a template edit. The app had no sign-in, so it built HTTP Basic auth from an invented `INVOICE_STAFF_USERS`: the skill is silent on a host with no session and its template actor fails closed (item 4). It added `pg` and a Postgres store behind `DATABASE_URL`, and made `next start` refuse the memory store unless `INVOICE_ALLOW_MEMORY_STORE=1`, against "add no dependency the host does not have" (item 5). `INVOICE_STAFF_USERS`, `INVOICE_ALLOW_MEMORY_STORE` and `INVOICE_PDF_LANGUAGE` are invented variables (item 6). The handover never says that an unset `INVOICE_SELLER_NAME` blocks issuing, which the skill nowhere asks it to say (item 8).
