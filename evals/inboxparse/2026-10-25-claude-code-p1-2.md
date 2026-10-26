---
agent: claude-code
agentVersion: 2.1.310
model: claude-opus-5-5
date: 2026-10-25
skillVersion: 0.1.2
promptIndex: 1
prompt: Our support inbox is connected to InboxParse. Store every email it
  receives in this app, as soon as InboxParse tells us about it, without missing
  any if a notification never arrives, and show each one on its own page.
stack: In-memory store
durationMinutes: 1
turns: 9
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 20
linesAdded: 1939
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/inboxparse/actions/runs/40193377978
---

Rubric 8/8, scored from the JSON summary. Receive-only, the templates copied, the store-only page, 16 shipped
tests under Vitest, the memory store kept. The handover leads with the memory store losing every email until a
database is chosen, then names the open `/inbox` pages, `INBOXPARSE_API_KEY`, `CRON_SECRET`, `setup-webhook.sh`
with the one-time secret as `INBOXPARSE_WEBHOOK_SECRET`, the first sync call, and the stored-walk archive import.
