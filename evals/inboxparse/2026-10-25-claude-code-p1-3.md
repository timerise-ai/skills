---
agent: claude-code
agentVersion: 2.1.310
model: claude-opus-5-5
date: 2026-10-25
skillVersion: 0.1.3
promptIndex: 1
prompt: Our support inbox is connected to InboxParse. Store every email it
  receives in this app, as soon as InboxParse tells us about it, without missing
  any if a notification never arrives, and show each one on its own page.
stack: In-memory store
durationMinutes: 1
turns: 11
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 21
linesAdded: 1951
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/inboxparse/actions/runs/40194385672
---

Rubric 8/8, scored from the JSON summary. Receive-only, the templates and the store-only page copied, 16 shipped
tests under Vitest, the memory store kept, no list page. The final message names `setup-webhook.sh`, the
one-time secret as `INBOXPARSE_WEBHOOK_SECRET`, `INBOXPARSE_API_KEY`, `CRON_SECRET`, the first sync call, the
memory store's loss on restart and the open `/inbox/<id>`.
