---
agent: claude-code
agentVersion: 2.1.300
model: claude-opus-5-5
date: 2026-10-15
skillVersion: 0.1.2
promptIndex: 1
prompt: "Add Calendly-style booking links to this Next.js app on Supabase: hosts
  set their weekly availability and event types, visitors book a free time on a
  public page, both get an e-mail with a calendar invite, and the visitor can
  reschedule or cancel from a link in that e-mail."
stack: Supabase
durationMinutes: 5
turns: 29
interventions: 0
checks:
  typecheck: pass
  build: pass
  tests: pass
result: pass
filesChanged: 81
linesAdded: 7258
isolated: true
timedOut: false
runUrl: https://github.com/timerise-ai/calendar-scheduling-links/actions/runs/38789193140
---

Rubric 8/8, scored from the JSON summary. The suite runs as shipped (58 passed, 5 skipped), the templates
are copied unchanged by the summary's own account, with the dashboard, sign-in, `proxy.ts` and a `/<handle>`
page written beside them, and the final message names every variable, then the migration, the cron with
`pg_cron` on Hobby, the SendGrid sender and both OAuth apps with their redirect URIs.
